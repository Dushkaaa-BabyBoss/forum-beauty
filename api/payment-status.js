import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { sessionId, orderId, amount, currency } = req.body;

  console.log('Received status update-1:', req.body);

  const API_KEY = process.env.P24_TEST_API_KEY;
  const CRC = process.env.P24_TEST_CRC_KEY;
  const MERCHANT_ID = process.env.P24_TEST_MERCHANT_ID;

  // const API_KEY = process.env.P24_API_KEY;
  // const CRC = process.env.P24_CRC_KEY;
  // const SECRET_ID = process.env.P24_SECRET_ID;
  // const MERCHANT_ID = process.env.P24_MERCHANT_ID;

  console.log('orderId', orderId);
  console.log('amount', amount);
  console.log('sessionId', sessionId);
  console.log('currency', currency);

  const checksumData = {
    sessionId: sessionId,
    orderId: Number(orderId),
    amount: amount,
    currency: currency,
    crc: CRC,
  };

  console.log('checksumData', checksumData);

  const stringToHash = JSON.stringify(checksumData, null, 0);

  const generatedCRC = crypto
    .createHash('sha384')
    .update(stringToHash)
    .digest('hex');

  console.log('generatedCRC', generatedCRC);

  const verificationData = {
    merchantId: Number(MERCHANT_ID),
    posId: Number(MERCHANT_ID),
    sessionId: sessionId,
    amount: Number(amount),
    currency: currency,
    orderId: Number(orderId),
    sign: generatedCRC,
  };

  console.log('verificationData', verificationData);

  const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;

  try {
    const response = await axios.put(
      'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
      verificationData,
      {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Verification response:', response.data);

    console.log('response.status', response.status);

    console.log('response.data.status', response.data.status);

    console.log('response.data.data.status', response.data.data.status);

    if (response.data.data.status === 'success') {
      res.status(200).json({ message: 'Транзакцію успішно підтверджено' });
    } else {
      res.status(500).json({ error: 'Верифікація не пройшла' });
    }
  } catch (error) {
    console.error('Verification error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
}
