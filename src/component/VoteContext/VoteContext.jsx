import React, { createContext, useState, useEffect } from 'react';

export const VoteContext = createContext();

const VoteProvider = ({ children }) => {
  const [voteCount, setVoteCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedTime = localStorage.getItem('timeLeft');
    return storedTime ? parseInt(storedTime, 10) : 24 * 60 * 60;
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          localStorage.setItem('timeLeft', newTime);
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      localStorage.removeItem('timeLeft');
    }
  }, [timeLeft]);

  const incrementVoteCount = () => {
    setVoteCount(prevCount => prevCount + 1);
  };

  return (
    <VoteContext.Provider value={{ voteCount, incrementVoteCount, timeLeft }}>
      {children}
    </VoteContext.Provider>
  );
};

export default VoteProvider;
