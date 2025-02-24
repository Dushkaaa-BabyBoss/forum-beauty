import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, surname, phone, amount } = req.body;

  // 🔹 ДАНІ ДЛЯ PRZELEWY24
  const merchantId = process.env.P24_MERCHANT_ID || 'b81d7626';
  const crcKey = process.env.P24_CRC_KEY || 'f78903438443d488';

  const orderData = {
    merchantId: merchantId,
    posId: merchantId,
    sessionId: crypto.randomUUID(),
    amount,
    currency: 'PLN',
    description: `Оплата квитка ${name} ${surname}`,
    email: email,
    country: 'PL',
    urlReturn: 'https://www.beauty-revolution.pl/success',
    urlStatus: 'https://www.beauty-revolution.pl/api/p24Webhook',
  };

  // 🔹 ПІДПИСУЄМО ЗАПИТ (SHA384)
  orderData["sign"] = crypto
    .createHash('sha384')
    .update(`${orderData.merchantId}|${orderData.sessionId}|${orderData.amount}|${orderData.currency}|${crcKey}`)
    .digest('hex');

  try {
    console.log("🔹 Відправка запиту в Przelewy24:", orderData);

    const response = await fetch("https://secure.przelewy24.pl/api/v1/transaction/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.P24_API_KEY}` },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (data.data && data.data.token) {
      return res.status(200).json({
        redirectUrl: `https://secure.przelewy24.pl/trnRequest/${data.data.token}`,
      });
    } else {
      return res.status(500).json({ error: 'Не вдалося ініціалізувати платіж' });
    }
  } catch (error) {
    console.error("❌ ПОМИЛКА:", error);
    return res.status(500).json({ error: "Помилка сервера" });
  }
}
