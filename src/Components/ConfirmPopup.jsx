import React from 'react';
import '../Style/ConfirmPopup.css';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, actionType }) => {
  if (!isOpen) return null;

  const isDelete = actionType === 'delete';
  
  const title = "Message de confirmation";
  const message = isDelete 
    ? "Are you sure you want to delete this task?" 
    : "Are you sure you want to restore this task?";
  
  const confirmButtonText = isDelete ? "Delete" : "Restore";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="confirmation-modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="confirmation-title">{title}</h2>
        <p className="confirmation-message">{message}</p>
        
        <div className="confirmation-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={() => { onConfirm(); onClose(); }}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;