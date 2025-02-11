import { sendEmail } from '../emailService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name, surname, ticketType, amount, phone } = req.body;

  console.log('Отримано запит на відправку email:', email, name, ticketType, amount);

  const result = await sendEmail(email, name, surname, ticketType, amount, phone);

  if (result.success) {
    res.status(200).json({ message: 'Email sent successfully' });
  } else {
    res.status(500).json({ message: 'Failed to send email', error: result.error });
  }
}