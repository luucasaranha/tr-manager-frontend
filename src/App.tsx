import { useState, useEffect } from 'react';
import './App.css';

// Types
interface Transaction {
  id: number;
  bank: string;
  category: string;
  description: string;
  value: number;
  date: string;
}

type NewTransaction = Omit<Transaction, 'id'>;


interface ModalProps {
  transaction: Transaction;
  onClose: () => void;
}


interface TransactionFormProps {
  onAdd: (transaction: NewTransaction) => void;
  onClose: () => void;
  editTransaction?: Transaction;
}

interface DeleteButtonProps {
  transactionId: number;
  onDelete: (id: number) => void;
}

interface EditButtonProps {
  onClick: () => void;
}

// Reusable components
const DeleteButton = ({ transactionId, onDelete }: DeleteButtonProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDelete(transactionId);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      className="delete-button"
      aria-label="Delete transaction"
    >
      <img
      src="/delete_ic.png"
      alt="Delete"
      className="delete-icon"
      />
    </button>
  );
};

const EditButton = ({ onClick }: EditButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      className="edit-button"
      aria-label="Edit transaction"
    >
      <img 
        src="/edit_ic.png"  
        alt="Edit" 
        className="edit-icon"
      />
    </button>
  );
};

// Modal components
function TransactionModal({ transaction, onClose }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
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

function TransactionForm({ onAdd, onClose, editTransaction }: TransactionFormProps) {
  const initialFormState: NewTransaction = {
    category: '',
    bank: '',
    description: '',
    value: 0,
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState<NewTransaction>(
    editTransaction || initialFormState
  );

  useEffect(() => {
    if (editTransaction) {
      const { id, ...editData } = editTransaction;
      setFormData(editData);
    }
  }, [editTransaction]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData(initialFormState);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close form">&times;</button>
        <form onSubmit={handleSubmit} className="transaction-form">
          <h3>{editTransaction ? 'Edit' : 'Add New'} Transaction</h3>

          <div className="form-group">
            <label htmlFor="bank">Bank:</label>
            <input
              type="text"
              id="bank"
              value={formData.bank}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="submit-button">
            {editTransaction ? 'Update' : 'Add'} Transaction
          </button>
        </form>
      </div>
    </div>
  );
}

function useTransactions() {
  const [transactions, setTransactions] = useState([
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
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const getCurrentMonthTotal = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthTransactions = transactions.filter(transaction => {
      // Parse ISO date format (YYYY-MM-DD)
      const transactionDate = new Date(transaction.date);
      
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
  
    return currentMonthTransactions.reduce((total, transaction) => total + transaction.value, 0);
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getCurrentMonthTotal
  };
}

function FinancialTable() {
  const {
    transactions, 
    addTransaction, 
    updateTransaction,
    deleteTransaction, 
    getCurrentMonthTotal
  } = useTransactions();
  
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  const handleEditSubmit = (editedData: NewTransaction) => {
    if (editingTransaction) {
      updateTransaction({ ...editedData, id: editingTransaction.id });
      setEditingTransaction(null);
    }
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
            <th>Bank</th>
            <th>Category</th>
            <th>Description</th>
            <th>Value</th>
            <th>Date</th>
            <th>Actions</th>
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
              <td>{transaction.bank}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>${transaction.value.toFixed(2)}</td>
              <td>{new Date(transaction.date).toLocaleDateString('pt-br')}</td>
              <td onClick={e => e.stopPropagation()} className="action-buttons">
                <EditButton onClick={() => setEditingTransaction(transaction)} />
                <DeleteButton 
                  transactionId={transaction.id} 
                  onDelete={deleteTransaction} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions.length === 0 && (
        <div className="no-data">No transactions available</div>
      )}

      {selectedTransaction && (
        <TransactionModal 
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {isAddingTransaction && (
        <TransactionForm 
          onAdd={addTransaction}
          onClose={() => setIsAddingTransaction(false)}
        />
      )}

      {editingTransaction && (
        <TransactionForm 
          onAdd={handleEditSubmit}
          onClose={() => setEditingTransaction(null)}
          editTransaction={editingTransaction}
        />
      )}

      <div className="summary-section">
        <div className="monthly-total">
          <h3>Current Month Total:</h3>
          <span className="total-amount">${getCurrentMonthTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <FinancialTable />
    </div>
  );
}

export default App;
