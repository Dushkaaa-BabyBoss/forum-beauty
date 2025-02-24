import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  const { email, name, surname, phone, amount } = req.body;

  const merchantId = 'b81d7626';
  const crcKey = 'f78903438443d488';

  const orderData = {
    merchantId: merchantId,
    posId: 334750,
    sessionId: crypto.randomUUID(),
    amount,
    currency: 'PLN',
    description: `Оплата квитка ${name} ${surname}`,
    email: email,
    country: 'PL',
    language: 'pl',
    urlReturn: 'https://www.beauty-revolution.pl/success',
    urlStatus: 'https://www.beauty-revolution.pl/api/p24Webhook',
    sign: '',
  };

  orderData.sign = crypto
    .createHash('sha384')
    .update(
      `${orderData.merchantId}|${orderData.sessionId}|${orderData.amount}|${orderData.currency}|${crcKey}`,
    )
    .digest('hex');
  
  try {
    console.log(orderData);

    const response = await fetch("https://secure.przelewy24.pl/api/v1/transaction/register", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer 7812c1120629c2a8d6f93fa1564e278d` },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    if (data.data && data.data.token) {
      res.status(200).json({
        redirectUrl: `https://secure.przelewy24.pl/trnRequest/${data.data.token}`,
      });
    } else {
      res.status(500).json(({ error: 'Not initialization payment' }));
    }
  } catch (error) {
    res.status(500).json(({ error: "Server error" }));
  }
}
