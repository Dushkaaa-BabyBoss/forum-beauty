// api/create-payment.js
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (req.method === 'POST') {
    console.log('Received request:', req.body);
    const { email, name, surname, phone, amount, ticketType } = req.body;

    const sessionId = `session-${Date.now()}`;

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
      merchantId: Number(MERCHANT_ID),
      amount: cost,
      currency: 'PLN',
      crc: CRC,
    };

    const stringToHash = JSON.stringify(checksumData, null, 0);

    const generatedCRC = crypto
      .createHash('sha384')
      .update(stringToHash)
      .digest('hex');

    const transactionData = {
      merchantId: MERCHANT_ID,
      posId: MERCHANT_ID,
      sessionId: sessionId,
      amount: cost,
      currency: 'PLN',
      description: `Opłata biletu - ${ticketType}`,
      email,
      client: `${name} ${surname}`,
      country: 'PL',
      language: 'pl',
      urlReturn: 'https://www.beauty-revolution.pl/',
      urlStatus: `https://www.beauty-revolution.pl/api/payment-status?email=${email}&name=${name}&surname=${surname}&phone=${phone}&ticketType=${ticketType}`,
      sign: generatedCRC,
    };

    const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;
    console.log('Authorization header:', authHeader);

    try {
      const response = await axios.post(
        'https://sandbox.przelewy24.pl/api/v1/transaction/register',
        transactionData,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.error) {
        console.error('Przelewy24 error:', response.data.error);
      }

      console.log('Przelew24 response status:', response.status);
      console.log('Przelew24 response data:', response.data);

      if (
        response.status === 200 &&
        response.data.data &&
        response.data.data.token
      ) {
        res.json({
          paymentUrl: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}`,
        });

        console.log(response.data.data.token);
      } else {
        res.status(500).json({ error: 'Не вдалося створити платіж' });
      }
    } catch (error) {
      console.log('Przelewy24 error:', error.response?.data || error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
