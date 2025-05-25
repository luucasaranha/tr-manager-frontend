interface DeleteButtonProps {
    transactionId: number;
    onDelete: (id: number) => void;
  }
  
  export const DeleteButton = ({ transactionId, onDelete }: DeleteButtonProps) => {
    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (window.confirm('Are you sure you want to delete this transaction?')) {
        onDelete(transactionId);
      }
    };
  
    return (
      <button onClick={handleDelete} className="delete-button" aria-label="Delete transaction">
        <img src="/delete_ic.png" alt="Delete" className="delete-icon" />
      </button>
    );
  };
  