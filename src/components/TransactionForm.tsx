import { useEffect, useState } from 'react';
import { NewTransaction, Transaction } from '../types/transaction.ts';

interface TransactionFormProps {
  onAdd: (transaction: NewTransaction) => void;
  onClose: () => void;
  editTransaction?: Transaction;
}

export function TransactionForm({ onAdd, onClose, editTransaction }: TransactionFormProps) {
  const initialFormState: NewTransaction = {
    category: '',
    bank: '',
    description: '',
    value: 0,
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState<NewTransaction>(initialFormState);

  useEffect(() => {
    if (editTransaction) {
      const { id, ...rest } = editTransaction;
      setFormData(rest);
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
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <form onSubmit={handleSubmit} className="transaction-form">
          <h3>{editTransaction ? 'Edit' : 'Add New'} Transaction</h3>
          {['bank', 'category', 'description'].map(field => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="text"
                id={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
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
