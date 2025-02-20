/* eslint-disable */

import { useState } from 'react';
import '../../components/TicketPage/TicketPage.scss';
import {
  PayPalScriptProvider,
  // PayPalButtons,
  // PayPalButtonsComponentProps,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';

enum Price {
  // standart = 5,
  // vip = 5,
  standart = 649,
  vip = 949,
}

export const TicketPagePl: React.FC = () => {
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
  /* eslint-disable max-len */
  const initialOptions: ReactPayPalScriptOptions = {
    clientId:
      // 'AULAws5LQhhdzcqSGpJho9Hz6G56XXCCVCkRBz0bGKGqyrv6XBBmurGRerRxmITh6qYjS5iTWPFDtZaW',
      'AcDg9Updj6ox7ScbndAOAr0RF3FF3dkJBNjN5T9FJfuO4XhBXkC9N0QyvjWUG3AO7fx6y6AAmC1LseQQ',
    components: 'buttons',
    currency: 'PLN',
  };

  // const styles: PayPalButtonsComponentProps['style'] = {
  //   shape: 'rect',
  //   layout: 'vertical',
  // };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="ticket" id="ticket">
        <div className="ticket__wrapper">
          <div className="ticket__main">
            <div className="ticket__top">
              <h1 className="ticket__title">Bilety</h1>
            </div>
            <div className="ticket__content">
              <div className="ticket__standart">
                <h2 className="ticket__standart--title">
                  Bilet <span className="standart">Standart</span>
                </h2>
                <ul className="ticket__standart--list">
                  <li className="ticket__standart--item">
                    Udział we wszystkich wykładach, dyskusjach panelowych i
                    prezentacjach
                  </li>
                  <li className="ticket__standart--item">Odznaka uczestnika</li>
                  <li className="ticket__standart--item">
                    Notatnik i długopis z logo konferencji
                  </li>
                  <li className="ticket__standart--item">
                    Lekkie materiały reklamowe (książki, kupony rabatowe od
                    sponsorzy)
                  </li>
                  <li className="ticket__standart--item">
                    Dostęp do obszaru konferencji generalnej, w którym odbywa
                    się konferencja główne wydarzenia
                  </li>
                  <li className="ticket__standart--item">
                    Miejsca siedzące w sektorze standardowym z dobrą
                    widocznością sceny
                  </li>
                  <li className="ticket__standart--item">
                    Przerwa kawowa (herbata, kawa, woda, ciasteczka)
                  </li>
                  <li className="ticket__standart--item">
                    Dostęp do części wspólnych z przekąskami
                  </li>
                  <li className="ticket__standart--item">
                    Możliwość zakupu materiałów od sponsorów VIP
                  </li>
                  <li className="ticket__standart--item">
                    Udział we wspólnych loteriach od sponsorów
                  </li>
                  <li className="ticket__standart--item">
                    Zdjęcie/wideo od fotografa-kamerzysty po konferencji
                  </li>
                </ul>
                <a
                  href="#tiketForm"
                  className="ticket__link"
                  onClick={() => handleBuyTicket('Standart')}
                >
                  Kup bilet
                </a>
                <p className="ticket__standart--price">
                  Cena:
                  <span className="ticket__standart--price--cost">
                    {Price.standart} PLN
                  </span>
                </p>
              </div>
              <div className="ticket__vip">
                <h2 className="ticket__vip--title">
                  Bilet <span className="vip">VIP</span>
                </h2>
                <ul className="ticket__vip--list">
                  <li className="ticket__vip--item">
                    Wszystkie zalety pakietu STANDARD
                  </li>
                  <li className="ticket__vip--item">
                    Szybka rejestracja bez kolejek (oddzielny licznik)
                  </li>
                  <li className="ticket__vip--item">
                    W pierwszej specjalnie wyposażona przestrzeń z wygodnymi
                    siedzeniami z rzędu
                  </li>
                  <li className="ticket__vip--item">
                    Zestaw upominkowy od sponsorów VIP
                  </li>
                  <li className="ticket__vip--item">
                    Identyfikatory imienne ze statusem VIP
                  </li>
                  <li className="ticket__vip--item">
                    Bezpłatny lunch w wydzielonym pomieszczeniu
                  </li>
                  <li className="ticket__vip--item">
                    Puchar imienny członka VIP
                  </li>
                </ul>

                <a
                  href="#tiketForm"
                  className="ticket__link--vip"
                  onClick={() => handleBuyTicket('VIP')}
                >
                  Kup bilet
                </a>
                <p className="ticket__vip--price">
                  Cena:
                  <span className="ticket__vip--price--cost">
                    {Price.vip} PLN
                  </span>
                </p>
              </div>
            </div>

            {showForm && (
              <div className="ticket__form">
                <form id="tiketForm" className="ticket__form form">
                  <h2 className="option">Płatność za bilet {ticketType}</h2>
                  {email && (
                    <>
                      <h3 className="warning__title">
                        OSTRZEŻENIE!! Wpisz poprawny e-mail
                      </h3>
                      <p className="warning__description">
                        Potwierdzenie otrzymania biletu otrzymasz pocztą email
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
                    {`Imię:`}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form__input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />

                  <label className="form__label" htmlFor="surname">
                    Nazwisko:
                  </label>
                  <input
                    id="surname"
                    type="text"
                    className="form__input"
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                  />

                  <label className="form__label" htmlFor="tel">
                    Telefon:
                  </label>
                  <input
                    id="tel"
                    type="tel"
                    className="form__input"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />

                  <p className="option">
                    Do zapłaty:{' '}
                    <strong className="option">{ticketPrice} PLN</strong>
                  </p>

                  
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};
