import { useState } from 'react'
import './App.css'

interface Transaction {
  id: number;
  category: string;
  description: string;
  value: number;
  date: string;
}

interface ModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

type NewTransaction = Omit<Transaction, 'id'>;

function TransactionModal({ transaction, onClose }: ModalProps) {
  if (!transaction) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>Transaction Details</h3>
        <div className="modal-details">
          <p><strong>ID:</strong> {transaction.id}</p>
          <p><strong>Category:</strong> {transaction.category}</p>
          <p><strong>Description:</strong> {transaction.description}</p>
          <p><strong>Value:</strong> ${transaction.value.toFixed(2)}</p>
          <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

function TransactionForm({ onAdd, onClose }: { onAdd: (transaction: NewTransaction) => void, onClose: () => void }) {
  const [formData, setFormData] = useState<NewTransaction>({
    category: '',
    description: '',
    value: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      category: '',
      description: '',
      value: 0,
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="transaction-form">
          <h3>Add New Transaction</h3>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value:</label>
            <input
              type="number"
              id="value"
              step="0.01"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-button">Add Transaction</button>
        </form>
      </div>
    </div>
  );
}

function FinantialTable() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, category: 'Category 1', description: 'Description 1', value: 100, date: '2023-01-01' },
    { id: 2, category: 'Category 2', description: 'Description 2', value: 200, date: '2023-01-02' },
    { id: 3, category: 'Category 3', description: 'Description 3', value: 300, date: '2023-01-03' },
    { id: 4, category: 'Category 4', description: 'Description 4', value: 400, date: '2023-01-04' },
    { id: 5, category: 'Category 5', description: 'Description 5', value: 500, date: '2023-01-05' },
    { id: 6, category: 'Category 6', description: 'Description 6', value: 600, date: '2023-01-06' },
    { id: 7, category: 'Category 7', description: 'Description 7', value: 700, date: '2023-01-07' },
    { id: 8, category: 'Category 8', description: 'Description 8', value: 800, date: '2023-01-08' }
  ]);

  const handleAddTransaction = (newTransaction: NewTransaction) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Math.max(0, ...transactions.map(t => t.id)) + 1
    };
    setTransactions([...transactions, transaction]);
  };

  return (
    <div className="finantial-table">
      <div className="header-actions">
        <h2>Financial Management</h2>
        <button 
          className="add-transaction-button" 
          onClick={() => setIsAddingTransaction(true)}
        >
          Add Transaction
        </button>
      </div>

      <table>
        <thead>
          <tr className="finantial-table-tr">
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Value</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr 
              key={transaction.id}
              onClick={() => setSelectedTransaction(transaction)}
              className="clickable-row"
            >
              <td>{transaction.id}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>${transaction.value.toFixed(2)}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTransaction && (
        <TransactionModal 
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {isAddingTransaction && (
        <TransactionForm 
          onAdd={handleAddTransaction}
          onClose={() => setIsAddingTransaction(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <FinantialTable />
    </div>
  );
}

export default App
