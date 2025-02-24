/* eslint-disable */

import { useState } from 'react';
import '../TicketPage/TicketPage.scss';

enum Price {
  // standart = 5,
  // vip = 5,
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

  const handlePayment = async () => {
    if (!email) return alert("Будь ласка, введіть ваш email");

    try {
      const response = await fetch("https://www.beauty-revolution.pl/api/createTransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: ticketPrice,
          email,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;  // Перенаправляємо на сторінку оплати
      } else {
        alert("Помилка створення платежу");
      }
    } catch (error) {
      console.error("Помилка оплати:", error);
      alert("Серверна помилка при оплаті");
    }
  };
  

  return (
    <div className="ticket" id="ticket">
      <div className="ticket__wrapper">
        <div className="ticket__main">
          <div className="ticket__top">
            <h1 className="ticket__title">Квитки</h1>
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
                  Доступ до загальної зони конференції, де відбуваються основні
                  події
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
                Ціна:
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
                  Спеціально обладнана зона з комфортними місцями у першому ряді
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
                Ціна:
                <span className="ticket__vip--price--cost">
                  {Price.vip} PLN
                </span>
              </p>
            </div>
          </div>

          {showForm && (
            <div className="ticket__form">
              <form id="tiketForm" className="ticket__form form">
                <h2 className="option">Оплата квитка {ticketType}</h2>
                {email && (
                  <>
                    <h3 className="warning__title">
                      УВАГА!! Заповни вірно e-mail
                    </h3>
                    <p className="warning__description">
                      На твою почту прийде підтвердження твого квитка
                    </p>
                  </>
                )}

                <label className="form__label" htmlFor="email">
                  E-mail:
                </label>
                <input
                  id="email"
                  type="email"
                  className="form__input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                <label className="form__label" htmlFor="name">
                  {`Ім'я:`}
                </label>
                <input
                  id="name"
                  type="text"
                  className="form__input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

                <label className="form__label" htmlFor="surname">
                  Прізвище:
                </label>
                <input
                  id="surname"
                  type="text"
                  className="form__input"
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                />

                <label className="form__label" htmlFor="tel">
                  Телефон:
                </label>
                <input
                  id="tel"
                  type="tel"
                  className="form__input"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />

                <p className="option">
                  До сплати:{' '}
                  <strong className="option">{ticketPrice} PLN</strong>
                </p>
              </form>

              {email && name && surname && phone && (
                <button onClick={handlePayment}>Оплатити через Przelew24</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
