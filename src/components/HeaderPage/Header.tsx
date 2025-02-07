import '../HeaderPage/Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__top">
          <h1 className="header__title">Beauty Revolution Conference</h1>
        </div>
        <div className="header__center">
          <div className="header__left-side">
            <img src="./poster.png" alt="poster" className="header__poster" />
          </div>
          <div className="header__right-side">
            <img src="./logo-line.png" alt="logo" className="header__logo" />
            <div className="header__links">
              <a href="#" className="header__links--about">
                Дізнатися більше
              </a>
              <a href="#ticket" className="header__links--buy-ticket">
                Купити квиток
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
