import React, { useState,useContext } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import Card from '../Card/Card';
import Confirmation from '../Confirmation/Confirmation';
import VoteConfirmation from '../VoteConfirmation/VoteConfirmation';
import { useNavigate } from 'react-router-dom';
import MackyImg from '../../img/macky.jpg';
import Khalifa from '../../img/khalifa.jpg';
import Diomaye from '../../img/diomaye.jpg';
import  {VoteContext}  from '../VoteContext/VoteContext';
import Dethie from '../../img/dethie.jpg'
import './Accueil.css'
const Accueil = () => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showVoteConfirmationModal, setShowVoteConfirmationModal] = useState(false);
    const navigate = useNavigate();
    const { incrementVoteCount } = useContext(VoteContext);
    const candidates = [
        {
          id: 1,
          name: "macky sall",
          image:MackyImg,
        },
        {
          id: 2,
          name: "khalifa sall",
          image: Khalifa, // Chemin vers l'image de Jane Smith
        },
        {
          id: 3,
          name: "diomaye faye",
          image: Diomaye, // Chemin vers l'image de Michael Johnson
        },
        {
            id: 4,
            name: "dethie",
            image: Dethie, // Chemin vers l'image de Michael Johnson
          },      
        ];
      const handleCandidateSelection = (candidate) => {
        setSelectedCandidate(candidate);
        setShowConfirmationModal(true);
      };
    
      const handleConfirmation = (confirmed) => {
        if (confirmed) {
          // Enregistrer le vote et afficher la deuxième modal de confirmation
          setShowConfirmationModal(false);
          setShowVoteConfirmationModal(true);
        } else {
          // Annuler la sélection du candidat
          setSelectedCandidate(null);
          setShowConfirmationModal(false);
        }
      };

      const handleVoteConfirmation = () => {
        setShowVoteConfirmationModal(false);
        incrementVoteCount(); // Incrémenter le compteur de votes
        navigate("/");
      };
    
      return (
        <div>
          <Dashboard />
          <h2>Choisissez votre candidat / Tane lene sen candidat</h2> {/* Titre ajouté */}

          <div className="card-container">
            {/* Affichage des cartes des candidats */}
            {candidates.map(candidate => (
              <Card key={candidate.id} candidate={candidate} onSelect={handleCandidateSelection} />
            ))}
          </div>
          {/* Modal de confirmation du choix du candidat */}
          {showConfirmationModal && (
            <Confirmation
              candidate={selectedCandidate}
              onConfirmation={handleConfirmation}
            />
          )}
          {/* Modal de confirmation du vote pris en compte */}
          {showVoteConfirmationModal && (
            <VoteConfirmation onClose={() => handleVoteConfirmation()} />
          )}
        </div>
      );
    };
    
    export default Accueil;
  