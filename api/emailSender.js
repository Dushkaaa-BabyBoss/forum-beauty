// /pages/api/emailService.js
import { sendEmail } from '../../services/emailService'; // Імпортуємо функцію для відправки email

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, name, surname, ticketType, phone, ticketPrice } = req.body;

  try {
    // Викликаємо сервіс для відправки email
    const result = await sendEmail(email, name, surname, ticketType, ticketPrice, phone);

    if (result.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: result.error });
    }
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
