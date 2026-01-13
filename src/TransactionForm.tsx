import React, { useState } from 'react';
import { useFinance } from './FinanceContext';

export const TransactionForm = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(''); 
  const { addTransaction } = useFinance();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !amount) return;

    addTransaction({
      id: Date.now(),
      text,
      amount: parseFloat(amount)
    });

    setText('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input 
        className="form-input"
        type="text" 
        placeholder="Description (e.g., Salary, Coffee)" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        required 
      />
      <input 
        className="form-input" 
        type="number" 
        placeholder="Amount (- for expense)" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        required 
      />
      <button type="submit" className="submit-btn">Add Transaction</button>
    </form>
  );
};