import React, { useState } from 'react';
import './App.scss';
import { Header } from './components/HeaderPage/Header';
import { TicketPage } from './components/TicketPage/TicketPage';
import { Footer } from './components/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';
import { Regulamin } from './components/Regulamin/Regulamin';
import { Polityka } from './components/Polityka-prywatnosci/Polityka';
import { TicketPagePl } from './LangPol/TicketPagePl/TicketPagePl';
import { FooterPl } from './LangPol/FooterPl/FooterPl';

export const App: React.FC = () => {
  const [isPolityk, setIsPolityk] = useState(false);
  const [isRegul, setIsRegul] = useState(false);
  const [langUa, setLangUa] = useState(true);
  const [langPl, setLangPl] = useState(false);

  return (
    <div className="App">
      <Header
        setLangPl={setLangPl}
        setLangUa={setLangUa}
        langUa={langUa}
        langPl={langPl}
      />
      {langUa && (
        <>
          <TicketPage />{' '}
          <Footer setIsRegul={setIsRegul} setIsPolityk={setIsPolityk} />
        </>
      )}
      {langPl && (
        <>
          <TicketPagePl />{' '}
          <FooterPl setIsRegul={setIsRegul} setIsPolityk={setIsPolityk} />
        </>
      )}
      <Analytics />

      {isRegul && <Regulamin setIsRegul={setIsRegul} />}
      {isPolityk && <Polityka setIsPolityk={setIsPolityk} />}
    </div>
  );
};
