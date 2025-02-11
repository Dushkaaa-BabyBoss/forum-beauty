const express = require('express');
const cors = require('cors');
const { sendEmail } = require('./emailService');

const app = express();
app.use(express.json());
// app.use(cors()); // Дозволяє клієнту надсилати запити на сервер

app.use(cors({
  origin: 'https://forum-beauty.vercel.app',
  methods: 'GET, POST',
}));

app.post('/send-email', async (req, res) => {
  const { email, name, surname, ticketType, amount } = req.body;

  console.log('Отримано запит на відправку email:', email, name, ticketType, amount);


  try {
    await sendEmail(email, name, surname, ticketType, amount);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).send({ message: 'Failed to send email' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
