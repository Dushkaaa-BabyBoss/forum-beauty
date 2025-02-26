import axios from 'axios';
import crypto from 'crypto';
import { sendEmail } from './emailService';
import dotenv from 'dotenv';

dotenv.config();

const payments = {};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log('🔄 Payment status received:', req.body);

  const { sessionId, orderId, status, amount, currency, sign } = req.body;
  const MERCHANT_ID = process.env.P24_TEST_MERCHANT_ID;
  const CRC = process.env.P24_TEST_CRC_KEY;
  const API_KEY = process.env.P24_TEST_API_KEY;

  const checksumData = {
    sessionId: sessionId,
    merchantId: Number(MERCHANT_ID),
    amount: amount,
    currency: 'PLN',
    crc: CRC,
  };

  console.log(checksumData);

  console.log('sessionId', sessionId);
  console.log('orderId', orderId);
  console.log('status', status);
  console.log('amount', cost);
  console.log('currency', currency);
  console.log('sign', sign);

  const stringToHash = JSON.stringify(checksumData, null, 0); // Формуємо рядок без пробілів і escape-символів

  const generatedCRC = crypto
    .createHash('sha384')
    .update(stringToHash)
    .digest('hex');
  console.log(generatedCRC);

  if (sign !== generatedCRC) {
    console.error('❌ Invalid sign:', {
      received: sign,
      expected: generatedCRC,
    });
    return res.status(400).json({ error: 'Invalid sign' });
  }

  console.log('generatedCRC', generatedCRC);

  if (status === 'SUCCESS') {
    console.log('✅ Payment successful, verifying transaction...');

    // ✅ Верифікація транзакції через API Przelewy24
    const verificationSignString = JSON.stringify(
      { sessionId, orderId, amount, currency, crc: CRC },
      null,
      0,
    );
    console.log('verificationSignString', verificationSignString);

    const verificationSign = crypto
      .createHash('sha384')
      .update(verificationSignString)
      .digest('hex');

    console.log('verificationSign', verificationSign);

    const verificationData = {
      merchantId: MERCHANT_ID,
      posId: MERCHANT_ID,
      sessionId,
      amount,
      currency,
      orderId,
      sign: verificationSign,
    };

    console.log('verificationData', verificationData);

    const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;

    try {
      const verificationResponse = await axios.put(
        'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
        verificationData,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('🔍 Verification response:', verificationResponse.data);

      if (verificationResponse.status === 200) {
        console.log('✅ Transaction verified successfully');

        // Отримуємо email та інші дані із сховища
        const paymentInfo = payments[sessionId];

        if (!paymentInfo) {
          console.error('❌ Payment info not found for session:', sessionId);
          return res.status(400).json({ error: 'Payment info not found' });
        }

        const { email, name, surname, ticketType, phone } = paymentInfo;

        // Відправляємо email
        const emailResponse = await sendEmail(
          email,
          name,
          surname,
          ticketType,
          amount / 100,
          phone,
        );
        if (emailResponse.success) {
          console.log('📩 Email успішно відправлено:', email);
        } else {
          console.error('❌ Помилка при відправці email:', emailResponse.error);
        }

        return res.status(200).json({ success: true });
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
      console.error(
        '❌ Error during verification:',
        error.response?.data || error.message,
      );
      return res.status(500).json({ error: 'Verification request failed' });
    }
  } else {
    console.log('❌ Payment failed');
    return res.status(200).json({ success: false });
  }
}
