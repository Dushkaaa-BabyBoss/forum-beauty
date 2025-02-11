import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');
require('dotenv').config(); // Використовуємо .env для безпеки
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method Not Allowed'})
  }

  const { email, name, surname, ticketType, amount, phone } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Змінні з .env
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // const sendEmail = (
  //   recipientEmail,
  //   name,
  //   surname,
  //   ticketType,
  //   amount,
  //   phone,
  // ) => {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Ваш email
      to: recipientEmail, // Email покупця
      subject: 'Підтвердження купівлі квитка',
      html: `
        <h1>Привіт, ${name} ${surname}!</h1>
        <p>Ваш телефон: ${phone}</p>
  
        <p>🎟 Ви успішно придбали квиток.</p>
  
        <p>📌 Тип квитка: ${ticketType}</p>
        <p>💳 Сума: ${amount} PLN</p>
        <p>Посилання на телеграм канал <a href="${ticketType === 'Standart' ? 'https://t.me/+t4G8dYDzR6IyYjEy' : 'https://t.me/+zhdBMISyKA4yYTgy'}">Твій ${ticketType} телеграм канал</a></p>
  
        <p>📅 Дата заходу: 15 травня 2025</p>
        <p>📍 Місце проведення: Варшава, Польща</p>
  
        <p>🔗 Додаткова інформація буде надіслана пізніше.</p>
  
        <p>Дякуємо! До зустрічі! 😊</p>
  
        <p>З повагою,  </p>
        <p>Організатори конференції</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email sending error: ', error);
      res.status(500).json({ message: 'Failed to send email' });
    }

  // return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
