import React from 'react';
import './VoteConfirmation.css'; 

const VoteConfirmation = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Vote pris en compte</h2>
        <p>Votre vote a été enregistré avec succès.</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default VoteConfirmation;
