import '../EventsPl/EventsPl.scss';

export const EventsPl: React.FC = () => {
  return (
    <div className="events">
      <div className="events__wrapper">
        <h1 className="events__title">
          Zapraszamy stylistów rzęs z Europy i nie tylko na wielką konferencję
          beauty!
        </h1>
        <div className="events__content">
          <p>
            15 maja 2025 roku w Warszawie odbędzie się Beauty Revolution
            Conference – wydarzenie, które stanie się źródłem inspiracji i
            nowych umiejętności dla wszystkich zajmujących się przedłużaniem
            rzęs.
          </p>{' '}
          <p>
            Czeka na Was 6 unikalnych tematów, obejmujących zarówno aspekty
            techniczne pracy, jak i strategie rozwoju w branży beauty.
          </p>{' '}
          <p>
            To szansa, aby uczyć się od najlepszych ekspertów, zdobyć cenne
            doświadczenie, nawiązać nowe kontakty i wynieść swój biznes na
            wyższy poziom!
          </p>{' '}
          <p>Nie przegap tej okazji – dołącz do rewolucji w świecie piękna!</p>
        </div>
      </div>
    </div>
  );
};
