// api/create-payment.js
import axios from 'axios';
import crypto from 'crypto';
import 'dotenv/config';

// const MERCHANT_ID = process.env.P24_MERCHANT_ID;
function generateSign(merchantId, sessionId, amount, crc) {
  if (!sessionId || !amount || !crc || !merchantId) {
    throw new Error('generateSign: відсутні необхідні параметри!');
  }
  const stringToHash = `${sessionId}|${merchantId}|${amount}|PLN|${crc}`;
  return crypto.createHash('sha384').update(stringToHash).digest('hex');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received request:', req.body);
    const { email, name, surname, phone, amount } = req.body;

    const sessionId = `session-${Date.now()}`;

    const API_KEY = process.env.P24_API_KEY;
    const CRC = process.env.P24_CRC_KEY;
    const SECRET_ID = process.env.P24_SECRET_ID;
    const MERCHANT_ID = process.env.P24_MERCHANT_ID || 334750;

    const cost = amount * 100;

    const transactionData = {
      merchantId: 334750,
      posId: 334750, // POS ID = MERCHANT_ID
      sessionId,
      amount: amount * 100, // Przelewy24 вимагає суми у грошових одиницях
      currency: 'PLN',
      description: `Оплата квитка`,
      email,
      country: 'PL',
      language: 'pl',
      urlReturn: 'https://www.beauty-revolution.pl/',
      // urlStatus: 'https://www.beauty-revolution.pl/payment-status',
      sign: generateSign(334750, sessionId, cost, 'f78903438443d488'), // Потрібно згенерувати правильний sign
      orderKey: SECRET_ID,
    };

    // console.log(
    //   'Generated sign:',
    //   generateSign(MERCHANT_ID, sessionId, amount, CRC),
    // );

    const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;
    console.log('Authorization header:', authHeader); // Перевірка заголовка

    try {
      const response = await axios.post(
        'https://secure.przelewy24.pl/api/v1/transaction/register',
        transactionData,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${334750}:${API_KEY}`).toString('base64')}`,
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
          paymentUrl: `https://secure.przelewy24.pl/trnRequest/${response.data.data.token}`,
        });
        console.log(response.data.data.token);
      } else {
        res.status(500).json({ error: 'Не вдалося створити платіж' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
