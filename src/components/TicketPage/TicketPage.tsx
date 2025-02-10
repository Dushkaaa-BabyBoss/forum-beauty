import { useState } from 'react';
import '../TicketPage/TicketPage.scss';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

enum Price {
  standart = 649,
  vip = 949,
}

export const TicketPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [ticketType, setTicketType] = useState<'Standart' | 'VIP'>('Standart');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');

  const handleBuyTicket = (type: 'Standart' | 'VIP') => {
    setTicketType(type);
    setShowForm(true);
  };

  const ticketPrice = ticketType === 'Standart' ? Price.standart : Price.vip;
  // const [formData, setFormData] = useState({
  //   email: '',
  //   name: '',
  //   surname: '',
  //   tel: '',
  //   typeTicket: 'standart',
  // });

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  // ) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/payment', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         name: formData.name,
  //         surname: formData.surname,
  //         tel: formData.tel,
  //         typeTicket: formData.typeTicket,
  //         amount:
  //           formData.typeTicket === 'standart' ? Price.standart : Price.vip,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.redirectUrl) {
  //       window.location.href = data.redirectUrl; // Переадресація на сторінку Przelewy24
  //     } else {
  //       alert('Помилка при ініціалізації платежу.');
  //     }
  //   } catch (error) {
  //     console.error('Помилка:', error);
  //   }
  // };

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          'AWuKGlMuh_TyVaCiohRcPFeOLkjYHK1TROpjbbdsi323N3YfaCRCFrUsjz4VjfViJuVubQXiMszDsZwL',
        currency: 'PLN',
        enableFunding: 'paylater,card',
      }}
    >
      <div className="ticket" id="ticket">
        <div className="ticket__wrapper">
          <div className="ticket__main">
            <div className="ticket__top">
              <h1 className="ticket__title">Квиткі</h1>
            </div>
            <div className="ticket__content">
              <div className="ticket__standart">
                <h2 className="ticket__standart--title">
                  Квиток <span className="standart">Standart</span>
                </h2>
                <ul className="ticket__standart--list">
                  <li className="ticket__standart--item">
                    Участь у всіх лекціях, панельних дискусіях і презентаціях
                  </li>
                  <li className="ticket__standart--item">Бейдж учасника</li>
                  <li className="ticket__standart--item">
                    Блокнот і ручка з логотипом конференції
                  </li>
                  <li className="ticket__standart--item">
                    Легкі рекламні матеріали (буклети, знижкові купони від
                    спонсорів)
                  </li>
                  <li className="ticket__standart--item">
                    Доступ до загальної зони конференції, де відбуваються
                    основні події
                  </li>
                  <li className="ticket__standart--item">
                    Місця у стандартному секторі з хорошою видимістю сцени
                  </li>
                  <li className="ticket__standart--item">
                    Кава-брейк (чай, кава, вода, печиво)
                  </li>
                  <li className="ticket__standart--item">
                    Доступ до загальних зон із закусками
                  </li>
                  <li className="ticket__standart--item">
                    Можливість придбати матеріали VIP спонсорів
                  </li>
                  <li className="ticket__standart--item">
                    Участь у спільних розіграшах від спонсорів
                  </li>
                  <li className="ticket__standart--item">
                    Фото /відео від фотографа-відеографа після конференції
                  </li>
                </ul>
                <a
                  href="#tiketForm"
                  className="ticket__link"
                  onClick={() => handleBuyTicket('Standart')}
                >
                  Купити квиток
                </a>
                <p className="ticket__standart--price">
                  Ціна:{' '}
                  <span className="ticket__standart--price--cost">
                    {Price.standart} PLN
                  </span>
                </p>
              </div>
              <div className="ticket__vip">
                <h2 className="ticket__vip--title">
                  Квиток <span className="vip">VIP</span>
                </h2>
                <ul className="ticket__vip--list">
                  <li className="ticket__vip--item">
                    Усі переваги пакету STANDARD
                  </li>
                  <li className="ticket__vip--item">
                    Швидка реєстрація без черг (окрема стійка)
                  </li>
                  <li className="ticket__vip--item">
                    Спеціально обладнана зона з комфортними місцями у першому
                    ряді
                  </li>
                  <li className="ticket__vip--item">
                    Подарунковий набір від VIP спонсорів
                  </li>
                  <li className="ticket__vip--item">
                    Іменні бейджі з VIP-статусом
                  </li>
                  <li className="ticket__vip--item">
                    Безкоштовний обід в окремій зоні
                  </li>
                  <li className="ticket__vip--item">
                    Іменний кубок учасника VIP
                  </li>
                </ul>

                <a
                  href="#tiketForm"
                  className="ticket__link--vip"
                  onClick={() => handleBuyTicket('VIP')}
                >
                  Купити квиток
                </a>
                <p className="ticket__vip--price">
                  Ціна:{' '}
                  <span className="ticket__vip--price--cost">
                    {Price.vip} PLN
                  </span>
                </p>
              </div>
            </div>

            {showForm && (
              // <form
              //   action="#"
              //   id="tiketForm"
              //   className="ticket__form form"
              //   onSubmit={e => e.preventDefault()}
              // >
              //   <label htmlFor="email" className="form__label">
              //     E-mail:{' '}
              //   </label>
              //   <input
              //     type="email"
              //     name="email"
              //     id="email"
              //     className="form__input"
              //     value={formData.email}
              //     onChange={handleChange}
              //     required
              //   />

              //   <label htmlFor="name" className="form__label">
              //     Ім'я:
              //   </label>
              //   <input
              //     type="text"
              //     name="name"
              //     id="name"
              //     className="form__input"
              //     value={formData.name}
              //     onChange={handleChange}
              //     required
              //   />

              //   <label htmlFor="surname" className="form__label">
              //     Прізвище:{' '}
              //   </label>
              //   <input
              //     type="text"
              //     name="surname"
              //     id="surname"
              //     className="form__input"
              //     value={formData.surname}
              //     onChange={handleChange}
              //     required
              //   />

              //   <label htmlFor="tel" className="form__label">
              //     Телефон:{' '}
              //   </label>
              //   <input
              //     type="tel"
              //     name="tel"
              //     id="tel"
              //     className="form__input"
              //     value={formData.tel}
              //     required
              //   />

              //   <select
              //     name="typeTicket"
              //     id="typeTicket"
              //     className="form__input option"
              //     value={formData.typeTicket}
              //     onChange={handleChange}
              //     required
              //   >
              //     <option value="tandart">Standart {Price.standart}</option>
              //     <option value="tandart">VIP {Price.vip}</option>
              //   </select>

              //   <button
              //     type="submit"
              //     className="form__button"
              //     onClick={handleSubmit}
              //   >
              //     Оплатити
              //   </button>
              // </form>
              <div className="ticket__form">
                <form id="tiketForm" className="ticket__form form">
                  <h2>Оплата квитка {ticketType}</h2>

                  <label className="form__label">E-mail:</label>
                  <input
                    type="email"
                    className="form__input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />

                  <label className="form__label">Ім'я:</label>
                  <input
                    type="text"
                    className="form__input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />

                  <label className="form__label">Прізвище:</label>
                  <input
                    type="text"
                    className="form__input"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                  />

                  <label className="form__label">Телефон:</label>
                  <input
                    type="tel"
                    className="form__input"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />

                  <p>
                    До сплати: <strong>{ticketPrice} PLN</strong>
                  </p>

                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                          {
                            amount: {
                              value: ticketPrice.toString(),
                              currency_code: 'PLN',
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      // if (!actions.order) {
                      //   return Promise.reject(
                      //     new Error('Order acton not available'),
                      //   );
                      // }
                      if (!actions.order) return;
                      return actions.order?.capture().then(details => {
                        const payerName =
                          details.payer?.name?.given_name || 'Користувач';
                        alert(`Оплата успішна! Дякуємо, ${payerName}`);
                        setShowForm(false);
                      });
                    }}
                    onError={err => {
                      console.error('Помилка оплати:', err);
                      alert(
                        'Сталася помилка під час оплати. Спробуйте ще раз.',
                      );
                    }}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
