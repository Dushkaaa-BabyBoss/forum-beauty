const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const sendEmail = (recipientEmail, name, ticketType, amount) => {
  const mailOptions = {
    from: 'beutyrevolution2025@gmail.com',
    to: recipientEmail,
    subject: 'Підтвердження покупки квитка',
    text: `
      Привіт ${name},
      Дякуємо за покупку квитка!

      Тип квитка: ${ticketType}
      Сума: ${amount} PLN

      Ми надішлемо додаткову інформацію на вашу пошту.

      З найкращими побажаннями,
      Команда конференції
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };