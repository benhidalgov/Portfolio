import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col footer-col--brand">
          <div className="footer-brand">
            <p className="footer-brand-name">Benjamín Hidalgo</p>
            <p className="footer-brand-sub">Ingeniero Informático y Desarrollador de Software</p>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-title">Navegación</h3>
          <nav className="footer-nav">
            <Link to="/" className="footer-link">Inicio</Link>
            <Link to="/projects" className="footer-link">Archivo</Link>
            <Link to="/about" className="footer-link">Perfil</Link>
          </nav>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-title">Contacto</h3>
          <nav className="footer-nav">
            <a href="https://github.com/benhidalgov" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/benjamin-hidalgov/" target="_blank" rel="noopener noreferrer" className="footer-link">
              LinkedIn
            </a>
            <a href="mailto:hidalgobenjaminv@gmail.com" className="footer-link">
              Email
            </a>
          </nav>
        </div>
      </div>

      <div className="footer-status-bar">
        <span className="footer-status-left">
          <span className="footer-status-dot" />
          Disponible para colaborar
        </span>
        <span className="footer-status-center">
          © {currentYear} Benjamín Hidalgo
        </span>
        <span className="footer-status-right">
          Señal estable
        </span>
      </div>
    </footer>
  );
}

export default Footer;
