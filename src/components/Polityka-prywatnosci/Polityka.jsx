import '../Regulamin/Regulamin.scss';

export const Polityka = ({ setIsPolityk }) => {
  return (
    <div className="regulamin" id="polityka">
      <h1 className="title-regul">Polityka Prywatności</h1>

      <div className="regulamin__wrapper">
        <div>
          <h2 className="regulamin__title">1. Administrator danych</h2>
          <div className="regulamin__description">
            <p>
              1.1. Administratorem danych osobowych jest Iryna Khomiak LASHES &
              NAILS, z siedzibą w ul. Plonska 15, 03-683 Warszawa, e-mail:
              beutyrevolution2025@gmail.com.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">2. Jakie dane zbieramy?</h2>
          <div className="regulamin__description">
            <p>2.1. Dane osobowe: imię, nazwisko, adres e-mail, telefon.</p>
            <p>
              2.2. Dane dotyczące płatności (przetwarzane przez zewnętrznych
              dostawców).
            </p>
            <p>
              2.3. Pliki cookies i dane analityczne (Google Analytics, Facebook
              Pixel).
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">3. Cel przetwarzania danych</h2>
          <div className="regulamin__description">
            <p>3.1. Realizacja zakupów i obsługa klienta.</p>
            <p>3.2. Wysyłka zakupionego biletu na email.</p>
            <p>3.3. Analiza ruchu na stronie.</p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">4. Udostępnianie danych</h2>
          <div className="regulamin__description">
            <p>
              4.1. Dane mogą być przekazywane operatorom płatności, firmom
              kurierskim oraz partnerom marketingowym.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">5. Prawa użytkownika</h2>
          <div className="regulamin__description">
            <p>5.1. Prawo do dostępu, poprawiania, usunięcia danych.</p>
            <p>5.2. Prawo do cofnięcia zgody na marketing.</p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">6. Pliki cookies</h2>
          <div className="regulamin__description">
            <p>
              6.1. Serwis korzysta z plików cookies w celach statystycznych i
              reklamowych.
            </p>
            <p>
              6.2. Użytkownik może zarządzać cookies w ustawieniach
              przeglądarki.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">7. Kontakt</h2>
          <div className="regulamin__description">
            <p>
              7.1. W sprawach dotyczących danych osobowych można skontaktować
              się pod adresem: beutyrevolution2025@gmail.com.
            </p>
          </div>
        </div>
      </div>

      <a
        href=""
        className="regulamin__close"
        onClick={() => setIsPolityk(false)}
      >
        Close
      </a>
    </div>
  );
};
