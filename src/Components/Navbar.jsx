import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* LEFT: Logo + Welcome */}
      <div className="left-section">
        <Link to="/home" className="logo-wrapper">
          <img src="/logoTrello.png" alt="Logo" className="navbar-logo" />
        </Link>

        <p className="welcome-text">Welcome , User !</p>
      </div>

      {/* RIGHT: Trash Icon */}
      <div className="right-section">
        <Link to="/trash">
          <i className="fa-solid fa-trash trash-icon"></i>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;