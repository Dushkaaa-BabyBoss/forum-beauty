import React from 'react';
import './App.scss';
import { Header } from './components/HeaderPage/Header';
import { TicketPage } from './components/TicketPage/TicketPage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <TicketPage />
    </div>
  );
};
