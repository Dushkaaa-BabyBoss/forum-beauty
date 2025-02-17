import '../HeaderPage/Header.scss';

type PropsHeader = {
  setLangPl: (bool: boolean) => void;
  setLangUa: (bool: boolean) => void;
  langUa: boolean;
  langPl: boolean;
};

export const Header: React.FC<PropsHeader> = ({
  setLangPl,
  setLangUa,
  // langUa,
  langPl,
}) => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__top">
          <h1 className="header__title">Beauty Revolution Conference</h1>
          <div className="header__lang lang">
            <a
              href="#"
              className="lang__link"
              onClick={() => (setLangPl(true), setLangUa(false))}
            >
              PL
            </a>
            <a
              href="#"
              className="lang__link"
              onClick={() => (setLangUa(true), setLangPl(false))}
            >
              UA
            </a>
          </div>
        </div>
        <div className="header__center">
          <div className="header__left-side">
            <img src="./poster.png" alt="poster" className="header__poster" />
          </div>
          <div className="header__right-side">
            <img src="./logo-line.png" alt="logo" className="header__logo" />
            <div className="header__links">
              {/* eslint-disable max-len */}
              <a
                href="https://www.instagram.com/the.beauty_revolution?igsh=ZHdvaHNrYnB4bGlt"
                className="header__links--about"
                target="_blank"
                rel="noreferrer"
              >
                {/* Дізнатися більше */}
                {langPl ? <>Dowiedz się więcej</> : <>Дізнатися більше</>}
              </a>
              <a href="#ticket" className="header__links--buy-ticket">
                {/* Купити квиток */}
                {langPl ? <>Kup bilet</> : <>Купити квиток</>}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
