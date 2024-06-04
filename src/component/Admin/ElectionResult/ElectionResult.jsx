import React, { useContext } from 'react';
import './ElectionResult.css';
import { VoteContext } from '../../VoteContext/VoteContext';

const ElectionResult = () => {
  const { timeLeft } = useContext(VoteContext);

  if (timeLeft > 0) {
    return (
      <div className="election-results">
        <h2>Résultats des Élections</h2>
        <p>Les résultats seront disponibles après la fin du vote.</p>
      </div>
    );
  }

  const results = [
    { region: 'Dakar', voters: 1000, macky: 500, khalifa: 300, diomaye: 100, dethie: 100 },
    { region: 'Thies', voters: 800, macky: 400, khalifa: 200, diomaye: 100, dethie: 100 },
  ];

  return (
    <div className="election-results">
      <h2>Résultats des Élections</h2>
      <table>
        <thead>
          <tr>
            <th>Région</th>
            <th>Nombre de votants</th>
            <th>Macky Sall</th>
            <th>Khalifa Sall</th>
            <th>Diomaye Faye</th>
            <th>Dethie</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.region}</td>
              <td>{result.voters}</td>
              <td>{result.macky}</td>
              <td>{result.khalifa}</td>
              <td>{result.diomaye}</td>
              <td>{result.dethie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElectionResult;
