import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Barra de peligro superior */}
      <div className="footer-hazard-bar" aria-hidden="true" />

      <div className="footer-inner">

        {/* Columna: Identidad */}
        <div className="footer-col footer-col--brand">
          <div className="footer-brand">
            <span className="footer-brand-tag">// NERV</span>
            <p className="footer-brand-name">BENJAMIN HIDALGO</p>
            <p className="footer-brand-sub">Software Engineer &amp; Cloud Architect</p>
          </div>
        </div>

        {/* Columna: Navegación */}
        <div className="footer-col">
          <h3 className="footer-col-title">// NAVEGACIÓN</h3>
          <nav className="footer-nav">
            <Link to="/" className="footer-link">
              <span className="footer-link-arrow">▸</span> Inicio
            </Link>
            <Link to="/projects" className="footer-link">
              <span className="footer-link-arrow">▸</span> Proyectos
            </Link>
            <Link to="/Next" className="footer-link">
              <span className="footer-link-arrow">▸</span> Futuros Proyectos
            </Link>
            <Link to="/about" className="footer-link">
              <span className="footer-link-arrow">▸</span> Sobre Mí
            </Link>
          </nav>
        </div>

        {/* Columna: Conectar */}
        <div className="footer-col">
          <h3 className="footer-col-title">// CONECTAR</h3>
          <nav className="footer-nav">
            <a
              href="https://github.com/benhidalgov"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-link--external"
            >
              <span className="footer-link-arrow">▸</span> GitHub
              <span className="footer-ext-tag">[EXT]</span>
            </a>
            <a
              href="https://www.linkedin.com/in/benjamin-hidalgov/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-link--external"
            >
              <span className="footer-link-arrow">▸</span> LinkedIn
              <span className="footer-ext-tag">[EXT]</span>
            </a>
            <a
              href="mailto:hidalgobenjaminv@gmail.com"
              className="footer-link"
            >
              <span className="footer-link-arrow">▸</span> Email
            </a>
          </nav>
        </div>

      </div>

      {/* Barra de estado inferior */}
      <div className="footer-status-bar">
        <span className="footer-status-left">
          <span className="footer-status-dot" />
          SYSTEM_STATUS: <span className="footer-status-value">OPERATIONAL</span>
        </span>
        <span className="footer-status-center">
          © {currentYear} Benjamin Hidalgo — Todos los derechos reservados.
        </span>
        <span className="footer-status-right">
          BUILD: <span className="footer-status-value">v2.0.0</span> // MAGI_CORE
        </span>
      </div>
    </footer>
  );
}

export default Footer;
