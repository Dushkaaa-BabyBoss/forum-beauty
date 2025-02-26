import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const MERCHANT_ID = process.env.P24_TEST_MERCHANT_ID;
const API_KEY = process.env.P24_TEST_API_KEY;
const CRC = process.env.P24_TEST_CRC_KEY;

// Базова авторизація для API
const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;

// Функція для генерації контрольної суми
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

// Функція для верифікації транзакції
export const verifyTransaction = async (sessionId, orderId, amount) => {
  const verificationData = {
    merchantId: MERCHANT_ID,
    posId: MERCHANT_ID,
    sessionId: sessionId,
    amount: amount,
    currency: 'PLN',  // Валюта, за замовчуванням PLN
    orderId: orderId,
    sign: generateCRC(sessionId, orderId, amount, 'PLN', CRC),  // Генерація контрольної суми
  };

  try {
    const response = await axios.post(
      'https://sandbox.przelewy24.pl/api/v1/transaction/verify', // Використовуємо URL для верифікації
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
      return response.data;
    } else {
      console.error('❌ Weryfikacja transakcji nie powiodła się:', response.data);
      throw new Error('Weryfikacja transakcji nie powiodła się');
    }
  } catch (error) {
    console.error('❌ Błąd weryfikacji:', error.message);
    throw new Error('Weryfikacja transakcji nie powiodła się');
  }
};
