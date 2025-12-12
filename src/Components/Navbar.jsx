import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = ({ username, trashCount }) => {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-left">
        <img src="/logoTrello.png" className="navbar-logo" alt="WorkflowHub Logo" />
      </Link>
      
      <p className="welcome">Welcome , {username} 👋</p>
      
      <div className="navbar-right">
        <Link to="/trash" className="trash-wrapper">
          <i className="fa-solid fa-trash trash-icon"></i>
          {/* Only show badge if count > 0 */}
          {trashCount > 0 && (
            <span className="trash-count-badge">{trashCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;