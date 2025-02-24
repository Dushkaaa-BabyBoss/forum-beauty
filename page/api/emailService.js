import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Завантажуємо .env змінні

export const sendEmail = async (email, name, surname, ticketType, amount, phone) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Витягуємо з .env
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Підтвердження купівлі квитка',
    html: `
      <h1>Привіт, ${name} ${surname}!</h1>
      <p>Ваш телефон: ${phone}</p>

      <p>🎟 Ви успішно придбали квиток.</p>

      <p>📌 Тип квитка: ${ticketType}</p>
      <p>💳 Сума: ${amount} PLN</p>
      <p>Посилання на телеграм канал <a href="${
        ticketType === 'Standart'
          ? 'https://t.me/+t4G8dYDzR6IyYjEy'
          : 'https://t.me/+zhdBMISyKA4yYTgy'
      }">Твій ${ticketType} телеграм канал</a></p>

      <p>📅 Дата заходу: 15 травня 2025</p>
      <p>📍 Місце проведення: Варшава, Польща</p>

      <p>🔗 Додаткова інформація буде надіслана пізніше.</p>

      <p>Дякуємо! До зустрічі! 😊</p>

      <p>З повагою,</p>
      <p>Організатори конференції</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email відправлено:', email);
    return { success: true };
  } catch (error) {
    console.error('Помилка при відправці email:', error);
    return { success: false, error };
  }
};