import React from 'react';
import './Card.css';

const Card = ({ candidate, onSelect }) => {
  return (
    <div className="card" onClick={() => onSelect(candidate)}>
      <img src={candidate.image} alt={candidate.name} />
      <div className="card-info">
        <h3>{candidate.name}</h3>
      </div>
    </div>
  );
};

export default Card;
