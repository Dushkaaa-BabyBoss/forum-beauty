import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: ['GET', 'POST', 'OPTIONS'], // Allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));
app.use(express.json());

const PRZELEW24_API_URL = 'https://secure.przelew24.pl/api/v1/'; // Przelew24's endpoint
const API_KEY = '7812c1120629c2a8d6f93fa1564e278d'; // Replace with your actual API key
const MERCHANT_ID = 'b81d7626'; // Replace with your merchant ID

// API endpoint to create a payment session
app.post('/api/payment', async (req, res) => {
  const { amount, currency, email, orderId } = req.body;

  try {
    // const response = await fetch(`${PRZELEW24_API_URL}create-payment`, {
    const response = await fetch(`${PRZELEW24_API_URL}create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        merchant_id: MERCHANT_ID,
        amount,
        currency,
        email,
        order_id: orderId,
      }),
    });

    const data = await response.json();
    if (data.success) {
      res.status(200).json({ success: true, paymentUrl: data.payment_url });
    } else {
      res.status(400).json({ success: false, message: 'Failed to create payment session.' });
    }
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
