import '../TicketPage/TicketPage.scss';

export const TicketPage: React.FC = () => {
  return (
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
              <a href="#" className="ticket__link">
                Купити квиток
              </a>
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
              <a href="#" className="ticket__link--vip">
                Купити квиток
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
