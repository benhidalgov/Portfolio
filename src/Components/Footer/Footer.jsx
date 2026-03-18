import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-links">
        <h3>// Navegación</h3>
        <Link to="/" className="footer-link">Inicio</Link>
        <Link to="/Next" className="footer-link">Futuros Proyectos</Link>
        <Link to="/about" className="footer-link">Sobre Mí</Link>
      </div>

      <div className="footer-social">
        <h3>// Conectar</h3>
        <a href="https://github.com/benhidalgov" target="_blank" rel="noopener noreferrer" className="social-link">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/benjamin-hidalgov/" target="_blank" rel="noopener noreferrer" className="social-link">
          LinkedIn
        </a>
        <a href="mailto:hidalgobenjaminv@gmail.com" className="social-link">
          Email
        </a>
      </div>

      <div className="footer-copyright">
        <p>&gt;&gt; SYSTEM_STATUS: <span className="status-text">OPERATIONAL</span> // {currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
