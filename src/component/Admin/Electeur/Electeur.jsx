import React, { useState } from 'react';
import './Electeur.css';

const Electeur = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    // Logique pour télécharger et traiter le fichier des électeurs
    console.log(file);
  };

  return (
    <div className="upload-voters">
      <h2>Ajouter la Liste des Électeurs</h2>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" className="btn-upload">Télécharger</button>
      </form>
    </div>
  );
};

export default Electeur;
