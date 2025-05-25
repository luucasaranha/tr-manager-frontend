
import { useState } from 'react';
import { NewTransaction, Transaction } from '../types/transaction.ts';
import { useTransactions } from '../hooks/useTransactions.ts';
import { EditButton } from '../components/EditButton';
import { TransactionModal } from '../components/TransactionModal';
import { TransactionForm } from '../components/TransactionForm';
import { DeleteButton } from '../components/DeleteButton';

export function FinancialTable() {
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