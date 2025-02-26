import crypto from 'crypto';
import { sendEmail } from './emailService';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { sessionId, orderId, status, amount, currency, sign, email, name, surname, ticketType, phone } = req.body;

  console.log('Payment status received:', req.body);

  // Перевірка правильності підпису
  const generatedSign = generateSign(req.body);
  if (sign !== generatedSign) {
    return res.status(400).json({ error: 'Invalid sign' });
  }

  if (status === 'SUCCESS') {
    console.log('✅ Payment successful');

    // Відправка email користувачу
    const emailResponse = await sendEmail(email, name, surname, ticketType, amount, phone);
    if (emailResponse.success) {
      console.log('📩 Email успішно відправлено!');
    } else {
      console.error('❌ Помилка при відправці email:', emailResponse.error);
    }

    res.status(200).json({ success: true });
  } else {
    console.log('❌ Payment failed');
    res.status(200).json({ success: false });
  }
}

// Функція генерації підпису для перевірки автентичності відповіді від P24
function generateSign(data) {
  const { sessionId, merchantId, amount, currency } = data;
  const CRC = process.env.P24_TEST_CRC_KEY;
  const stringToHash = `${sessionId}|${merchantId}|${amount}|${currency}|${CRC}`;
  return crypto.createHash('sha384').update(stringToHash).digest('hex');
}
