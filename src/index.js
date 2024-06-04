import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Connexion from './component/Connexion/Connexion';
import Accueil from './component/Accueil/Accueil';
import reportWebVitals from './reportWebVitals';
import VoteProvider from './component/VoteContext/VoteContext';
import Login from './component/Admin/Connexion/Login';
import Electeur from './component/Admin/Electeur/Electeur';
import Resultat from './component/Admin/ElectionResult/ElectionResult';
import AdminDashboard from './component/Admin/Dashboard/AdminDashboard';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
  {
    path: "/accueil",
    element: <Accueil />,
  },
  {
    path: "/admin/connexion",
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
    children: [
      { path: '/admin/electeur', element: <Electeur /> },
      { path: '/admin/resultat', element: <Resultat /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <VoteProvider>
  <RouterProvider router={router} />
  </VoteProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
