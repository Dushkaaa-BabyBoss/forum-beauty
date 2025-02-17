import '../Regulamin/Regulamin.scss';

type Props = {
  setIsRegul: (t: boolean) => void;
};

export const Regulamin: React.FC<Props> = ({ setIsRegul }) => {
  return (
    <div className="regulamin" id="regulamin">
      <h1 className="title-regul">Regulamin strony</h1>
      <div className="regulamin__wrapper">
        <div>
          <h2 className="regulamin__title">1. Postanowienia ogólne</h2>
          <div className="regulamin__description">
            <p>
              1.1. Niniejszy regulamin określa zasady korzystania z serwisu
              internetowego Beauty Revolution, dostępnego pod adresem
              www.beauty-revolution.pl.
            </p>
            <p>
              1.2. Właścicielem serwisu jest Iryna Khomiak LASHES & NAILS, z
              siedzibą w ul. Plonska 15, 03-683 Warszawa, NIP 9522144978, REGON
              521506727.
            </p>
            <p>
              1.3. Każdy użytkownik zobowiązany jest do zapoznania się z
              niniejszym regulaminem i akceptacji jego warunków przed
              skorzystaniem z serwisu.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">2. Warunki korzystania</h2>
          <div className="regulamin__description">
            <p>
              2.1. Użytkownicy mogą korzystać z serwisu w celu przeglądania
              treści, rejestracji na wydarzenia oraz dokonywania zakupów.
            </p>
            <p>
              2.2. Wszelkie materiały zamieszczone w serwisie są chronione
              prawem autorskim i nie mogą być kopiowane bez zgody właściciela.
            </p>
            <p>
              2.3. Użytkownik zobowiązuje się do korzystania z serwisu zgodnie z
              obowiązującym prawem i dobrymi obyczajami.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">
            3. Rejestracja i konto użytkownika
          </h2>
          <div className="regulamin__description">
            <p>
              3.1. Rejestracja w serwisie jest dobrowolna, ale może być wymagana
              do korzystania z pełnej funkcjonalności.
            </p>
            <p>
              3.2. Użytkownik zobowiązany jest do podania prawdziwych danych.
            </p>
            <p>
              3.3. Właściciel serwisu może usunąć konto użytkownika w przypadku
              naruszenia regulaminu.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">4. Zakupy i płatności</h2>
          <div className="regulamin__description">
            <p>4.1. W serwisie można dokonywać zakupu biletów na wydarzenia.</p>
            <p>4.2. Płatności obsługiwane są przez zewnętrznych operatorów.</p>
            <p>
              4.3. Bilety zakupione celowo przez użytkownika nie podlegają
              zwrotowi ani zwrotowi środków, zgodnie z obowiązującymi zasadami.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">5. Reklamacje i zwroty</h2>
          <div className="regulamin__description">
            <p>
              5.1. Reklamacje można zgłaszać drogą mailową na adres
              beutyrevolution2025@gmail.com.
            </p>
            <p>5.2. Rozpatrzenie reklamacji następuje w terminie 14 dni.</p>
            <p>
              5.3. Zakupione bilety nie podlegają zwrotowi ani wymianie na inne.
            </p>
            <p>
              5.4. Zwroty środków nie są możliwe, za wyjątkiem sytuacji, gdy
              wydarzenie zostanie odwołane przez organizatora.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">6. Ochrona danych osobowych</h2>
          <div className="regulamin__description">
            <p>
              6.1. Szczegółowe zasady przetwarzania danych określa Polityka
              Prywatności.
            </p>
          </div>
        </div>

        <div>
          <h2 className="regulamin__title">7. Postanowienia końcowe</h2>
          <div className="regulamin__description">
            <p>
              7.1. Właściciel serwisu może zmienić regulamin w dowolnym czasie.
            </p>
          </div>
        </div>
      </div>

      <a href="" className="regulamin__close" onClick={() => setIsRegul(false)}>
        Close
      </a>
    </div>
  );
};
