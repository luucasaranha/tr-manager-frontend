import { Transaction } from '../types/transaction';

interface ModalProps {
  transaction: Transaction;
  onClose: () => void;
}

export function TransactionModal({ transaction, onClose }: ModalProps) {
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
