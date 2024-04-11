import React from "react";
import "./Navbar.css";
import { Link } from "react-scroll";
const navbar = () => {
  return (
    <div className="n-wrapper" id="Navbar">    
      {/* right */}
      <div className="n-right">
              <Link className="home" to="App" spy={true} smooth={true}>
              <button className="button n-button">Home</button>
              </Link>
        <a href="/connexion">
        <button className="button n-button">S'authentifier</button>
        </a>
      </div>
    </div>
  );
};

export default navbar;