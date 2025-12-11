import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-left">
        <img src="/logoTrello.png" className="navbar-logo" alt="WorkflowHub Logo" />
        <h1 className="navbar-title">WorkflowHub</h1>
      </Link>
      <div className="navbar-right">
        <p className="welcome">Welcome , User !</p>
        <Link to="/trash" className="trash-wrapper">
          <i className="fa-solid fa-trash trash-icon"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
