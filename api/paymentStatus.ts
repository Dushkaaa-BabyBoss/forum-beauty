// pages/api/paymentStatus.ts
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sessionId } = req.body;

    // Перевіряємо статус транзакції через API Przelewy24
    try {
      const response = await fetch('https://secure.przelewy24.pl/api/v1/transaction/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from('b81d7626:f78903438443d488').toString('base64'), // ваш Klucz API
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        // Транзакція успішна
        res.status(200).json({ message: 'Оплата успішна' });
      } else {
        // Транзакція не успішна
        res.status(400).json({ message: 'Помилка при обробці платежу' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Помилка при перевірці статусу транзакції' });
    }
  } else {
    res.status(405).json({ message: 'Метод не дозволений' });
  }
}
