import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const MERCHANT_ID = 'b81d7626';
const POS_ID = process.env.PRZELEWY24_POS_ID;
const CRC_KEY = 'f78903438443d488';
const API_URL = 'https://secure.przelewy24.pl/api/v1/transaction/register'; // Залишаємо URL для Przelew24 API

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' });

  const { amount, email } = req.body;

  const sessionId = `order-${Date.now()}`;
  const amountInCents = amount * 100;
  const currency = 'PLN';
  const description = 'Квиток на конференцію';
  const country = 'PL';
  const urlReturn = 'https://www.beauty-revolution.pl/success';
  const urlStatus = 'https://www.beauty-revolution.pl/api/paymentStatus'; // Локальний шлях до API

  const hash = crypto
    .createHash('md5')
    .update(
      `${MERCHANT_ID}|${sessionId}|${amountInCents}|${currency}|${CRC_KEY}`,
    )
    .digest('hex');

  const transactionData = {
    merchantId: MERCHANT_ID,
    posId: POS_ID,
    sessionId,
    amount: amountInCents,
    currency,
    description,
    email,
    country,
    urlReturn,
    urlStatus,
    sign: hash,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST', // Залишаємо POST запит до API Przelew24
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();
    if (data.data?.token) {
      const redirectUrl = `https://secure.przelewy24.pl/trnRequest/${data.data.token}`;
      return res.status(200).json({ redirectUrl });
    } else {
      throw new Error('Помилка при створенні транзакції');
    }
  } catch (error) {
    console.error('Помилка оплати:', error);
    return res.status(500).json({ error: 'Помилка оплати' });
  }
}
