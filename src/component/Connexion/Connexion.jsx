import React, { useState } from 'react';
import './Connexion.css'; 

const Connexion = () => {
  const [cni, setcni] = useState('');
  const [numero, setNumero] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cni, numero })
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('User authenticated:', responseData.message);
        // Redirect or perform any action upon successful authentication
      } else {
        console.error('Authentication failed:', responseData.message);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  }

  return (
    <div className="connexion-container">
      <h2>Authentification</h2>
      <form onSubmit={handleLogin} className="connexion-form">
        <div className="form-group">
          <label htmlFor="cni">CNI :</label>
          <input type="string" id="cni" value={cni} onChange={(e) => setcni(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="numero">Numero electeur:</label>
          <input type="string" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </div>
        <button type="submit" className="btn-submit">S'authentifier</button>
      </form>
    </div>
  );
}

export default Connexion;
