const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PRZELEWY24_MERCHANT_ID = 'your-merchant-id';
const PRZELEWY24_POS_ID = 'your-pos-id';
const PRZELEWY24_CRC_KEY = 'your-crc-key';
const PRZELEWY24_API_URL = 'https://secure.przelewy24.pl/api/v1';

app.post('/api/payment', async (req, res) => {
  try {
    const { email, name, surname, tel, typeTicket, amount } = req.body;

    // 1. Ініціалізація платежу
    const response = await axios.post(
      `${PRZELEWY24_API_URL}/transaction/register`,
      {
        merchantId: PRZELEWY24_MERCHANT_ID,
        posId: PRZELEWY24_POS_ID,
        sessionId: `order-${Date.now()}`,
        amount: amount * 100, // Przelewy24 працює в грошових одиницях (100 = 1 PLN)
        currency: 'PLN',
        description: `Квиток ${typeTicket}`,
        email: email,
        country: 'PL',
        language: 'pl',
        urlReturn: 'http://localhost:3000/success',
        urlStatus: 'http://localhost:5000/api/payment/status',
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${PRZELEWY24_POS_ID}:${PRZELEWY24_CRC_KEY}`).toString('base64')}`,
        },
      },
    );

    if (response.data.data.token) {
      res.json({
        redirectUrl: `https://secure.przelewy24.pl/trnRequest/${response.data.data.token}`,
      });
    } else {
      res.status(500).json({ error: 'Помилка ініціалізації платежу.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Помилка на сервері.' });
  }
});

app.listen(5000, () => console.log('Сервер працює на порту 5000'));
