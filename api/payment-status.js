// api/payment-status.js
import { sendEmail } from './emailService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { status, sessionId, amount, email, name, surname, phone, ticketType } = req.body;

  // Перевіряємо статус транзакції
  if (status === 'success') {
    // Якщо оплата пройшла успішно
    const emailResponse = await sendEmail(
      email,
      name,
      surname,
      ticketType,
      amount,
      phone,
    );

    if (emailResponse.success) {
      console.log('Email відправлено успішно');
      res.status(200).json({ success: true });
    } else {
      console.error('Не вдалося надіслати email:', emailResponse.error);
      res.status(500).json({ error: 'Не вдалося надіслати email' });
    }
  } else {
    // Якщо транзакція не була успішною
    console.error('Платіж не був успішним');
    res.status(400).json({ error: 'Платіж не був успішним' });
  }
}
