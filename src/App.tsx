import React from 'react';
import './App.scss';
import { Header } from './components/HeaderPage/Header';
import { TicketPage } from './components/TicketPage/TicketPage';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <TicketPage />
      <Footer />
    </div>
  );
};
