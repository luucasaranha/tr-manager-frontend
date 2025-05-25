interface EditButtonProps {
    onClick: () => void;
  }
  
  export const EditButton = ({ onClick }: EditButtonProps) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick();
    };
  
    return (
      <button onClick={handleClick} className="edit-button" aria-label="Edit transaction">
        <img src="/edit_ic.png" alt="Edit" className="edit-icon" />
      </button>
    );
  };
  