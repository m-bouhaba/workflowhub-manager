import React from 'react';
import '../Style/Footer.css';
// import { FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa'; 

export default function Footer() {
  return (
    <footer className="footer">
      <p className="app-name">WorkflowHub Lite — Gestion de tâches</p>

      {/* Social Icons */}
      {/* <div className="social-icons">
        <a href="https://www.instagram.com/username" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/username" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div> */}

      <p className="copyright">© 2025 WorkflowHub Studio. Tous droits réservés.</p>
    </footer>
  );
}
