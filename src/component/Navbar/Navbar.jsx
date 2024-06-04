import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const navbar = () => {
  return (
    <div className="n-wrapper" id="Navbar">    
      {/* right */}
      <div className="n-right">
              <Link className="home" to="/">
              <button className="button n-button">Home</button>
              </Link>
              <Link className="home" to="/connexion">
              <button className="button n-button">S'authentifier</button>
              </Link>
      </div>
    </div>
  );
};

export default navbar;