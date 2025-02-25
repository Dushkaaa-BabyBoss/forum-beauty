// api/create-payment.js
import axios from 'axios';
import crypto from 'crypto';

const MERCHANT_ID = 334750;
const API_KEY = '7812c1120629c2a8d6f93fa1564e278d';
const CRC = 'f78903438443d488';

function generateSign(sessionId, amount, crc) {
  if (!sessionId || !amount || !crc) {
    throw new Error('generateSign: відсутні необхідні параметри!');
  }
  const stringToHash = `${MERCHANT_ID}|${sessionId}|${amount}|PLN|${crc}`;
  return crypto.createHash('sha384').update(stringToHash).digest('hex');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Received request:', req.body);
    const { email, name, surname, phone, amount } = req.body;

    const sessionId = `session-${Date.now()}`;

    const transactionData = {
      merchantId: MERCHANT_ID,
      posId: MERCHANT_ID, // POS ID = MERCHANT_ID
      sessionId,
      amount: amount * 100, // Przelewy24 вимагає суми у грошових одиницях
      currency: 'PLN',
      description: `Оплата квитка`,
      email,
      country: 'PL',
      language: 'pl',
      urlReturn: 'https://www.beauty-revolution.pl/payment-success',
      urlStatus: 'https://www.beauty-revolution.pl/payment-status',
      sign: generateSign(sessionId, amount, CRC), // Потрібно згенерувати правильний sign
    };

    console.log('Generated sign:', generateSign(sessionId, amount, CRC));

    try {
      const response = await axios.post(
        'https://secure.przelewy24.pl/api/v1/transaction/register',
        transactionData,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.error) {
        console.error('Przelewy24 error:', response.data.error);
      }

      console.log('Przelew24 response status:', response.status);
      console.log('Przelew24 response data:', response.data);

      if (response.data === 200 && response.data.data && response.data.data.token) {
        res.json({
          paymentUrl: `https://secure.przelewy24.pl/trnRequest/${response.data.data.token}`,
        });
      } else {
        res.status(500).json({ error: 'Не вдалося створити платіж' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
