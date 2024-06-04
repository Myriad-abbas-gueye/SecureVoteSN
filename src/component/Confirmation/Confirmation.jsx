import React from 'react';
import "./Confirmation.css"

const Confirmation = ({ candidate, onConfirmation }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmation du choix</h2>
        <p>Confirmez-vous votre choix pour {candidate.name} ?</p>
        <div className="modal-actions">
          <button onClick={() => onConfirmation(true)}>Oui</button>
          <button onClick={() => onConfirmation(false)}>Non</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
