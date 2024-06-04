import React, { useContext } from 'react';
import { Link ,useNavigate ,Outlet} from 'react-router-dom';
import './Dashboard.css';
import { VoteContext } from '../../VoteContext/VoteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
const AdminDashboard = () => {
  const { voteCount } = useContext(VoteContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Vous pouvez ajouter ici la logique de déconnexion (par exemple, suppression du token, nettoyage du state, etc.)
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Tableau de Bord Administrateur</h2>
        <button onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} /> Se Déconnecter
        </button>
      </div>
      <div className="admin-stats">
        <div className="stat">
          <h3>Total des votants</h3>
          <p>{voteCount}</p>
        </div>
      </div>
      <nav>
        <ul>
          <li><Link to="/admin/electeur">Ajouter la Liste des Électeurs</Link></li>
          <li><Link to="/admin/resultat">Voir les Résultats</Link></li>
        </ul>
      </nav>
      <div className="admin-dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
