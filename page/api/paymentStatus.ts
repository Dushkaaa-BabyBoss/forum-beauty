import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const API_KEY = '7812c1120629c2a8d6f93fa1564e278d'; // Ваш API ключ
const MERCHANT_ID = "b81d7626";
const CRC_KEY = "f78903438443d488";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { merchantId, sessionId, amount, currency, status, sign } = req.body;

  // Перевіряємо підпис
  const expectedSign = crypto
    .createHash("md5")
    .update(`${MERCHANT_ID}|${sessionId}|${amount}|${currency}|${API_KEY}|${CRC_KEY}`)
    .digest("hex");

  if (expectedSign !== sign) return res.status(400).json({ error: "Invalid signature" });

  if (status === "SUCCESS") {
    console.log(`✅ Оплата успішна: ${sessionId}`);
  } else {
    console.log(`❌ Оплата не пройшла: ${sessionId}`);
  }

  return res.status(200).json({ message: "OK" });
}
