import { useState } from 'react';
import { Transaction, NewTransaction } from '../types/transaction';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, bank: 'Nubank', category: 'Category 1', description: 'Description 1', value: 100, date: '2025-05-03' },
    { id: 11, bank: 'Nubank', category: 'Category 1', description: 'Description 1', value: 100, date: '2025-05-05' },
    { id: 34, bank: 'Nubank', category: 'Category 1', description: 'Description 1', value: 100, date: '2025-05-05' },
    { id: 2, bank: 'Santander', category: 'Category 2', description: 'Description 2', value: 200, date: '2025-06-03' },
    { id: 3, bank: 'Itau', category: 'Category 3', description: 'Description 3', value: 300, date: '2025-07-01' },
    { id: 4, bank: 'Santander', category: 'Category 4', description: 'Description 4', value: 400, date: '2025-08-01' },
    { id: 5, bank: 'Santander', category: 'Category 5', description: 'Description 5', value: 500, date: '2025-09-01' },
    { id: 6, bank: 'Santander', category: 'Category 6', description: 'Description 6', value: 600, date: '2025-10-01' },
    { id: 7, bank: 'Nubank', category: 'Category 7', description: 'Description 7', value: 700, date: '2025-11-01' },
    { id: 8, bank: 'Nubank', category: 'Category 8', description: 'Description 8', value: 800, date: '2025-12-01' },
    { id: 9, bank: 'Nubank', category: 'Category 9', description: 'Description 9', value: 900, date: '2025-03-01' }
  ]);

  const addTransaction = (newTransaction: NewTransaction) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Math.max(0, ...transactions.map(t => t.id)) + 1
    };
    setTransactions(prev => [...prev, transaction]);
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev =>
      prev.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getCurrentMonthTotal = () => {
    const now = new Date();
    return transactions
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((acc, t) => acc + t.value, 0);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getCurrentMonthTotal
  };
}
