import cors from 'cors';
import axios from 'axios';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());

import crypto from 'crypto';

function generateSign(sessionId, amount, crc) {
  if (!sessionId || !amount || !crc) {
    throw new Error('generateSign: відсутні необхідні параметри!');
  }
  const stringToHash = `${MERCHANT_ID}|${sessionId}|${amount}|PLN|${crc}`;
  return crypto.createHash('sha384').update(stringToHash).digest('hex');
}

const MERCHANT_ID = 334750;
const API_KEY = '7812c1120629c2a8d6f93fa1564e278d';
const CRC = 'f78903438443d488';

app.post('/create-payment', async (req, res) => {
  console.log('Received request:', req.body);
  const { email, name, surname, phone, amount } = req.body;

  const sessionId = `session-${Date.now()}`;

  const transactionData = {
    merchantId: MERCHANT_ID,
    posId: MERCHANT_ID, // POS ID = MERCHANT_ID
    sessionId,
    amount: amount * 100, // Przelewy24 вимагає суми у грошових одиницях
    currency: 'PLN',
    description: `Оплата квитка`,
    email,
    country: 'PL',
    language: 'pl',
    urlReturn: 'http://localhost:3000/payment-success',
    urlStatus: 'http://localhost:5000/payment-status',
    // urlStatus: 'https://www.beauty-revolution.pl/payment-status',
    sign: generateSign(sessionId, amount, CRC), // Потрібно згенерувати правильний sign
  };
  console.log('Generated sign:', generateSign(sessionId, amount, CRC)); // Лог сгенерованого підпису
  console.log('Transaction Data:', transactionData); // Лог транзакційних даних

  try {
    const response = await axios.post(
      'https://secure.przelewy24.pl/api/v1/transaction/register',
      transactionData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`,
          // Authorization: `Basic ${Buffer.from(`${MERCHANT_ID}:${MERCHANT_ID}`).toString('base64')}`,

          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Przelew24 Response:', response); // Лог відповіді від сервера

    if (response.data.error) {
      console.error('Przelewy24 error:', response.data.error);
    }

    if (
      response.status === 200 &&
      response.data.data &&
      response.data.data.token
    ) {
      res.json({
        paymentUrl: `https://secure.przelewy24.pl/trnRequest/${response.data.data.token}`,
      });
    } else {
      res.status(500).json({ error: 'Не вдалося створити платіж' });
    }
  } catch (error) {
    console.error('Request failed with error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
