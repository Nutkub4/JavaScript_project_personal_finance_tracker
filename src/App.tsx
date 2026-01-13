import React, { useState, useEffect } from 'react';
import { FinanceProvider, useFinance } from './FinanceContext';
import { TransactionForm } from './TransactionForm';
import './App.css';

const Dashboard = () => {
  const { transactions, deleteTransaction } = useFinance();
  const [search, setSearch] = useState('');
  const [quote, setQuote] = useState('Loading daily wisdom...');

  // Requirement: Asynchronous Programming (Async/Await) & Fetch API
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));
        const data = await res.json();
        const content = JSON.parse(data.contents);
        setQuote(content[0].q + " — " + content[0].a);
      } catch (err) {
        setQuote("Success is the sum of small efforts repeated day in and day out.");
      }
    };
    fetchQuote();
  }, []);

  const amounts = transactions.map(t => t.amount);
  const balance = amounts.reduce((acc, item) => (acc += item), 0);
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
  const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;

  // Requirement: Search & Filter functionality
  const filteredItems = transactions.filter(t => 
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h2>Personal Finance Tracker</h2>
        
        <div className="balance-card">
          <small>TOTAL BALANCE</small>
          <h1 className={`balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
            ${balance.toFixed(2)}
          </h1>
        </div>

        <div className="summary-container">
          <div className="summary-box">
            <small>INCOME</small>
            <p className="money positive">+${income.toFixed(2)}</p>
          </div>
          <div className="summary-box border-left">
            <small>EXPENSE</small>
            <p className="money negative">-${expense.toFixed(2)}</p>
          </div>
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Search history..." 
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TransactionForm />

      <h4 className="history-header">History</h4>
      <ul className="history-list">
        {filteredItems.map(t => (
          <li key={t.id} className="list-item" style={{ borderLeft: `5px solid ${t.amount < 0 ? '#e74c3c' : '#27ae60'}` }}>
            <span>{t.text}</span>
            <span>
              <strong>${Math.abs(t.amount).toFixed(2)}</strong>
              <button className="delete-btn" onClick={() => deleteTransaction(t.id)}>x</button>
            </span>
          </li>
        ))}
      </ul>

      <footer className="api-footer">
        <div className="created-by">
          <p>Created by: <strong>Watchapon Wongapinya</strong></p>
        </div>
        <small>DAILY WISDOM</small>
        <p className="quote-text">{quote}</p>
      </footer>
    </div>
  );
};

const App = () => (
  <FinanceProvider>
    <Dashboard />
  </FinanceProvider>
);

export default App;