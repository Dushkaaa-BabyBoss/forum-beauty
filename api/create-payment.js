// // api/create-payment.js
// import axios from 'axios';
// import crypto from 'crypto';
// import dotenv from 'dotenv';
// import { sendEmail } from './emailService';
// dotenv.config();

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   if (req.method === 'POST') {
//     console.log('Received request:', req.body);
//     const { email, name, surname, phone, amount, ticketType } = req.body;

//     const sessionId = `session-${Date.now()}`;

//     // const API_KEY = process.env.P24_API_KEY;
//     // const CRC = process.env.P24_CRC_KEY;
//     // const SECRET_ID = process.env.P24_SECRET_ID;
//     // const MERCHANT_ID = process.env.P24_MERCHANT_ID;

//     const API_KEY = process.env.P24_TEST_API_KEY;
//     const CRC = process.env.P24_TEST_CRC_KEY;
//     const SECRET_ID = process.env.P24_TEST_SECRET_ID;
//     const MERCHANT_ID = process.env.P24_TEST_MERCHANT_ID;

//     const cost = amount * 100;

//     const checksumData = {
//       sessionId: sessionId,
//       merchantId: Number(MERCHANT_ID),
//       amount: cost,
//       currency: 'PLN',
//       crc: CRC,
//     };

//     const stringToHash = JSON.stringify(checksumData, null, 0);

//     const generatedCRC = crypto
//       .createHash('sha384')
//       .update(stringToHash)
//       .digest('hex');

//     const transactionData = {
//       merchantId: MERCHANT_ID,
//       posId: MERCHANT_ID,
//       sessionId: sessionId,
//       amount: cost,
//       currency: 'PLN',
//       description: `Оплата квитка`,
//       email,
//       country: 'PL',
//       language: 'pl',
//       urlReturn: 'https://www.beauty-revolution.pl/',
//       // urlStatus: 'https://www.beauty-revolution.pl/api/example',
//       sign: generatedCRC,
//     };

//     const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;
//     console.log('Authorization header:', authHeader);

//     try {
//       const response = await axios.post(
//         'https://sandbox.przelewy24.pl/api/v1/transaction/register',
//         transactionData,
//         {
//           headers: {
//             Authorization: authHeader,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (response.data.error) {
//         console.error('Przelewy24 error:', response.data.error);
//       }

//       console.log('Przelew24 response status:', response.status);
//       console.log('Przelew24 response data:', response.data);

//       if (
//         response.status === 200 &&
//         response.data.data &&
//         response.data.data.token
//       ) {
//         res.json({
//           paymentUrl: `https://sandbox.przelewy24.pl/trnRequest/${response.data.data.token}`,
//         });
//         console.log(response.data.data.token);
//       } else {
//         res.status(500).json({ error: 'Не вдалося створити платіж' });
//       }
//       //////////// Verify payment
//       const transactionVerificationData = {
//         merchantId: MERCHANT_ID,
//         posId: MERCHANT_ID,
//         sessionId: sessionId,
//         amount: cost,
//         currency: 'PLN',
//         orderId: response.data.data.orderId, // Використовуємо orderId з відповіді
//         sign: generatedCRC,
//       };

//       const verificationResponse = await axios.put(
//         'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
//         transactionVerificationData,
//         {
//           headers: {
//             Authorization: authHeader,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (verificationResponse.status === 200) {
//         console.log('✅ Transaction verified successfully');
//       } else {
//         console.error(
//           '❌ Transaction verification failed:',
//           verificationResponse.data,
//         );
//         return res
//           .status(400)
//           .json({ error: 'Transaction verification failed' });
//       }

//       // 5. Повертаємо успішний результат з URL для платежу
//       res.json({ paymentUrl });
//       //////// end 
//     } catch (error) {
//       console.log('Przelewy24 error:', error.response?.data || error.message);
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
// api/create-payment.js
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (req.method === 'POST') {
    console.log('Received request:', req.body);
    const { email, name, surname, phone, amount, ticketType } = req.body;

    const sessionId = `session-${Date.now()}`;

    const API_KEY = process.env.P24_TEST_API_KEY;
    const CRC = process.env.P24_TEST_CRC_KEY;
    const SECRET_ID = process.env.P24_TEST_SECRET_ID;
    const MERCHANT_ID = process.env.P24_TEST_MERCHANT_ID;

    const cost = amount * 100;

    const checksumData = {
      sessionId: sessionId,
      merchantId: Number(MERCHANT_ID),
      amount: cost,
      currency: 'PLN',
      crc: CRC,
    };

    const stringToHash = JSON.stringify(checksumData, null, 0);

    const generatedCRC = crypto
      .createHash('sha384')
      .update(stringToHash)
      .digest('hex');

    const transactionData = {
      merchantId: MERCHANT_ID,
      posId: MERCHANT_ID,
      sessionId: sessionId,
      amount: cost,
      currency: 'PLN',
      description: `Оплата квитка`,
      email,
      country: 'PL',
      language: 'pl',
      urlReturn: 'https://www.beauty-revolution.pl/',
      sign: generatedCRC,
    };

    const authHeader = `Basic ${Buffer.from(`${MERCHANT_ID}:${API_KEY}`).toString('base64')}`;
    console.log('Authorization header:', authHeader);

    try {
      // 1. Реєстрація транзакції
      const response = await axios.post(
        'https://sandbox.przelewy24.pl/api/v1/transaction/register',
        transactionData,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.error) {
        console.error('Przelewy24 error:', response.data.error);
        return res.status(500).json({ error: 'Не вдалося створити платіж' });
      }

      console.log('Przelew24 response status:', response.status);
      console.log('Przelew24 response data:', response.data);

      // 2. Отримуємо token транзакції
      const token = response.data.data.token;

      if (!token) {
        return res.status(500).json({ error: 'Не вдалося отримати токен транзакції' });
      }

      const orderId = response.data.data?.orderId;
      if (!orderId) {
        console.error('❌ No orderId received:', response.data);
        return res.status(500).json({ error: 'Не вдалося отримати orderId' });
      }

      // 3. Повертаємо URL для платежу
      const paymentUrl = `https://sandbox.przelewy24.pl/trnRequest/${token}`;
      console.log('Payment URL:', paymentUrl);

      // 4. Підготовка даних для верифікації транзакції
      const transactionVerificationData = {
        merchantId: MERCHANT_ID,
        posId: MERCHANT_ID,
        sessionId: sessionId,
        amount: cost,
        currency: 'PLN',
        orderId: response.data.data.orderId, // Використовуємо orderId з відповіді
        sign: generatedCRC,
      };

      // 5. Верифікація транзакції
      const verificationResponse = await axios.put(
        'https://sandbox.przelewy24.pl/api/v1/transaction/verify',
        transactionVerificationData,
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        },
      );

      // 6. Перевірка результату верифікації
      if (verificationResponse.status === 200) {
        console.log('✅ Transaction verified successfully');
      } else {
        console.error(
          '❌ Transaction verification failed:',
          verificationResponse.data,
        );
        return res.status(400).json({ error: 'Transaction verification failed' });
      }

      // 7. Повертаємо остаточний результат
      res.json({ paymentUrl });

    } catch (error) {
      console.log('Przelewy24 error:', error.response?.data || error.message);
      res.status(500).json({ error: error.message });
    }
  }
}
