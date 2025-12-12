import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ username, trashCount, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-left">
        <img src="/logoTrello.png" className="navbar-logo" alt="WorkflowHub Logo" />
      </Link>
      
      <p className="welcome">Welcome , {username} 👋</p>
      
      <div className="navbar-right">
        {/* Trash Icon with Badge */}
        <Link to="/trash" className="trash-wrapper">
          <i className="fa-solid fa-trash trash-icon"></i>
          {trashCount > 0 && (
            <span className="trash-count-badge">{trashCount}</span>
          )}
        </Link>

        {/* Separator Line */}
        <div className="nav-separator"></div>

        {/* Logout Button */}
        <div className="logout-wrapper" onClick={onLogout} title="Logout">
          <i className="fa-solid fa-right-from-bracket logout-icon"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;