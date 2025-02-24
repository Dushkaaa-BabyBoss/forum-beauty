// pages/api/createTransaction.ts

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, email } = req.body;

    // Перевіряємо, чи вказано суму
    if (!amount || !email) {
      return res.status(400).json({ message: 'Необхідно вказати суму та email' });
    }

    // Генерація sessionId для транзакції
    const sessionId = `order-${Date.now()}`;
    const amountInCents = amount * 100;  // Перетворюємо на копійки
    const currency = 'PLN';  // Валюта
    const description = 'Квиток на конференцію';  // Опис транзакції
    const country = 'PL';  // Країна
    const urlReturn = 'https://www.beauty-revolution.pl/success';  // URL для повернення після оплати
    const urlStatus = 'https://www.beauty-revolution.pl/api/paymentStatus';  // URL для перевірки статусу платежу

    // Формуємо дані для запиту до Przelewy24
    const formData = new URLSearchParams();
    formData.append('sessionId', sessionId);
    formData.append('amount', amountInCents.toString());
    formData.append('currency', currency);
    formData.append('description', description);
    formData.append('country', country);
    formData.append('urlReturn', urlReturn);
    formData.append('urlStatus', urlStatus);

    try {
      // Надсилаємо запит на створення транзакції
      const response = await fetch('https://secure.przelewy24.pl/api/v1/transaction/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'Authorization': 'Basic ' + Buffer.from('b81d7626:f78903438443d488').toString('base64') // ваш Klucz API
          'Authorization': `Bearer 7812c1120629c2a8d6f93fa1564e278d`,
        },
        body: formData.toString()
      });

      const data = await response.json();

      if (data.redirectUrl) {
        // Якщо все в порядку, перенаправляємо користувача на сторінку оплати
        res.status(200).json({ redirectUrl: data.redirectUrl });
      } else {
        // Якщо сталася помилка при створенні транзакції
        res.status(400).json({ message: 'Помилка при створенні транзакції' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Серверна помилка при створенні транзакції' });
    }
  } else {
    res.status(405).json({ message: 'Метод не дозволений' });
  }
}
