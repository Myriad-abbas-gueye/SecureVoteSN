import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { VoteContext } from '../VoteContext/VoteContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { voteCount, timeLeft } = useContext(VoteContext);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  if (timeLeft <= 0) {
    alert('Temps écoulé');
    navigate('/');
  }

  return (
    <div className="dashboard">
      <h2>SecureVoteSN</h2>
      <div className="stats">
        <div className="stat">
          <h3>Total des votes</h3>
          <p>{voteCount}</p>
        </div>
        <div className="stat">
          <h3>Temps restants</h3>
          <p>{formatTime(timeLeft)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
