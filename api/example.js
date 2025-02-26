// api/create-payment.js
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { sendEmail } from './emailService';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('Received request:', req.body);
    const { email, amount, orderId, status, sessionId } = req.body;

    // const API_KEY = process.env.P24_API_KEY;
    // const CRC = process.env.P24_CRC_KEY;
    // const SECRET_ID = process.env.P24_SECRET_ID;
    // const MERCHANT_ID = process.env.P24_MERCHANT_ID;

    const API_KEY = process.env.P24_TEST_API_KEY;
    const CRC = process.env.P24_TEST_CRC_KEY;
    const SECRET_ID = process.env.P24_TEST_SECRET_ID;
    const MERCHANT_ID = process.env.P24_TEST_MERCHANT_ID;

    const cost = amount * 100;

    const checksumData = {
      sessionId: sessionId,
      orderId: orderId,
      amount: amount,
      currency: 'PLN',
      crc: CRC,
    };

    console.log('checksumData', checksumData);
    

    const stringToHash = JSON.stringify(checksumData, null, 0);

    const generatedCRC = crypto
      .createHash('sha384')
      .update(stringToHash)
      .digest('hex');

    const transactionData = {
      merchantId: MERCHANT_ID,
      posId: MERCHANT_ID,
      sessionId: sessionId,
      amount: amount,
      currency: 'PLN',
      orderId: orderId,
      sign: generatedCRC,
    };

    console.log('transactionData', transactionData);
    

    const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;
    console.log('Authorization header:', authHeader);

    try {
      const verificationResponse = await axios.put(
        'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
        transactionData,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('verificationResponse', verificationResponse);
      

      if (verificationResponse.status === 200) {
        console.log('✅ Transaction verified successfully');
      } else {
        console.error(
          '❌ Transaction verification failed:',
          verificationResponse.data,
        );
        return res
          .status(400)
          .json({ error: 'Transaction verification failed' });
      }
    } catch (error) {
      console.log('Przelewy24 error:', error.response?.data || error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
