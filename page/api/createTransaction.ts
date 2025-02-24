import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const MERCHANT_ID = "b81d7626"; // Ваша ID з Przelewy24
const POS_ID = MERCHANT_ID; // Якщо POS_ID збігається, залиште так
const CRC_KEY = "f78903438443d488"; // Ваш CRC Key
const API_URL = "https://secure.przelewy24.pl/api/v1/transaction/register";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { amount, email } = req.body;
  if (!amount || !email) return res.status(400).json({ error: "Missing required fields" });

  const sessionId = `order-${Date.now()}`;
  const amountInCents = amount * 100; // Przelewy24 працює з грошима у GROSH (1 PLN = 100 GROSH)
  const currency = "PLN";
  const urlReturn = "https://www.beauty-revolution.pl/success"; // URL після успішного платежу
  const urlStatus = "https://www.beauty-revolution.pl/api/paymentStatus"; // Вебхук

  // Формуємо підпис (sign)
  const signString = `${MERCHANT_ID}|${sessionId}|${amountInCents}|${currency}|${CRC_KEY}`;
  const sign = crypto.createHash("md5").update(signString).digest("hex");

  const transactionData = {
    merchantId: MERCHANT_ID,
    posId: POS_ID,
    sessionId,
    amount: amountInCents,
    currency,
    description: "Квиток на конференцію",
    email,
    country: "PL",
    urlReturn,
    urlStatus,
    sign,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${MERCHANT_ID}:${CRC_KEY}`).toString("base64")}`, // Авторизація через Base64
      },
      body: JSON.stringify(transactionData),
    });

    const data = await response.json();

    if (data.data?.token) {
      return res.status(200).json({
        redirectUrl: `https://secure.przelewy24.pl/trnRequest/${data.data.token}`,
      });
    } else {
      return res.status(400).json({ error: "Помилка створення платежу", details: data });
    }
  } catch (error) {
    console.error("Помилка оплати:", error);
    return res.status(500).json({ error: "Серверна помилка" });
  }
}
