import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const MERCHANT_ID = process.env.P24_TEST_MERCHANT_ID;
const API_KEY = process.env.P24_TEST_API_KEY;
const CRC = process.env.P24_TEST_CRC_KEY;

// Базова авторизація для API
const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;

// Генерація контрольної суми
const generateCRC = (sessionId, orderId, amount, currency, crcKey) => {
  const data = {
    sessionId: sessionId,
    orderId: orderId,
    amount: amount,
    currency: currency,
    crc: crcKey,
  };
  const stringToHash = JSON.stringify(data, null, 0);
  return crypto.createHash('sha384').update(stringToHash).digest('hex');
};

// Ендпоінт для реєстрації транзакції
app.post('/api/create-payment', async (req, res) => {
  const { email, amount } = req.body;
  const sessionId = `session-${Date.now()}`;
  const cost = amount * 100; // Преобразовуємо в копійки

  const checksumData = {
    sessionId: sessionId,
    merchantId: Number(MERCHANT_ID),
    amount: cost,
    currency: 'PLN',
    crc: CRC,
  };

  const stringToHash = JSON.stringify(checksumData, null, 0);
  const generatedCRC = crypto.createHash('sha384').update(stringToHash).digest('hex');

  const transactionData = {
    merchantId: MERCHANT_ID,
    posId: MERCHANT_ID,
    sessionId: sessionId,
    amount: cost,
    currency: 'PLN',
    description: `Оплата квитка`,
    email,
    country: 'PL',
    language: 'pl',
    urlReturn: 'https://localhost:3000/return', // Замість реальної URL-адреси
    urlStatus: 'https://localhost:3000/api/payment-status',
    sign: generatedCRC,
  };

  try {
    const response = await axios.post(
      'https://sandbox.przelewy24.pl/api/v1/transaction/register',
      transactionData,
      {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.data && response.data.data.token) {
      res.json({
        paymentUrl: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}`,
      });
    } else {
      res.status(500).json({ error: 'Не вдалося створити платіж' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Не вдалося зареєструвати транзакцію' });
  }
});

// Ендпоінт для перевірки статусу платежу
app.post('/api/payment-status', async (req, res) => {
  const { sessionId, orderId, amount } = req.body;

  const verificationData = {
    merchantId: MERCHANT_ID,
    posId: MERCHANT_ID,
    sessionId: sessionId,
    amount: amount,
    currency: 'PLN',
    orderId: orderId,
    sign: generateCRC(sessionId, orderId, amount, 'PLN', CRC),
  };

  try {
    const response = await axios.put(
      'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
      verificationData,
      {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200 && response.data.success) {
      console.log('✅ Transakcja zweryfikowana pomyślnie');
      res.json({ status: 'Transaction verified' });
    } else {
      res.status(400).json({ error: 'Verification failed' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3000');
});