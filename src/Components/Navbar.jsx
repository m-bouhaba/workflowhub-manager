import React from "react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
const Navbar = ({username}) => {
    


  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-left">
        <img src="/logoTrello.png" className="navbar-logo" alt="WorkflowHub Logo" />
        {/* <h1 className="navbar-title">WorkflowHub</h1> */}
      </Link>
        <p className="welcome">Welcome , {username}  👋</p>
      <div className="navbar-right">
        <Link to="/trash" className="trash-wrapper">
          <i className="fa-solid fa-trash trash-icon"></i>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;