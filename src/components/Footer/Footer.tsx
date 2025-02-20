import '../Footer/Footer.scss';

type Props = {
  setIsRegul: (bool: boolean) => void;
  setIsPolityk: (bool: boolean) => void;
};

export const Footer: React.FC<Props> = ({ setIsRegul, setIsPolityk }) => {
  return (
    <div className="footer footer__wrapper">
      <div className="footer__content">
        <p>© 2025 Beauty Revolution Conference.</p>
        <p>Усі права захищено.</p>
      </div>

      <div className="footer__regulamin">
        <a href="#" className="footer__regul" onClick={() => setIsRegul(true)}>
          Regulamin sklepu
        </a>
        <a
          href="#"
          className="footer__regul"
          onClick={() => setIsPolityk(true)}
        >
          Polityka prywatności
        </a>
      </div>
    </div>
  );
};
