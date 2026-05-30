import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Stormlight border superior */}
      <div className="footer-hazard-bar" aria-hidden="true" />

      <div className="footer-inner">

        {/* Columna: Identidad */}
        <div className="footer-col footer-col--brand">
          <div className="footer-brand">
            <span className="footer-brand-tag">◆ Urithiru</span>
            <p className="footer-brand-name">Benjamin Hidalgo</p>
            <p className="footer-brand-sub">Ingeniero informatico y desarrollador de software</p>
          </div>
        </div>

        {/* Columna: Navegación */}
        <div className="footer-col">
          <h3 className="footer-col-title">◆ Navegación</h3>
          <nav className="footer-nav">
            <Link to="/" className="footer-link">
              <span className="footer-link-arrow">◇</span> Inicio
            </Link>
            <Link to="/projects" className="footer-link">
              <span className="footer-link-arrow">◇</span> Proyectos
            </Link>
            <Link to="/Next" className="footer-link">
              <span className="footer-link-arrow">◇</span> Futuros Proyectos
            </Link>
            <Link to="/about" className="footer-link">
              <span className="footer-link-arrow">◇</span> Sobre Mí
            </Link>
          </nav>
        </div>

        {/* Columna: Conectar */}
        <div className="footer-col">
          <h3 className="footer-col-title">◆ Conectar</h3>
          <nav className="footer-nav">
            <a
              href="https://github.com/benhidalgov"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-link--external"
            >
              <span className="footer-link-arrow">◇</span> GitHub
              <span className="footer-ext-tag">[EXT]</span>
            </a>
            <a
              href="https://www.linkedin.com/in/benjamin-hidalgov/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-link--external"
            >
              <span className="footer-link-arrow">◇</span> LinkedIn
              <span className="footer-ext-tag">[EXT]</span>
            </a>
            <a
              href="mailto:hidalgobenjaminv@gmail.com"
              className="footer-link"
            >
              <span className="footer-link-arrow">◇</span> Email
            </a>
          </nav>
        </div>

      </div>

      {/* Barra de estado inferior */}
      <div className="footer-status-bar">
        <span className="footer-status-left">
          <span className="footer-status-dot" />
          Tormenta: <span className="footer-status-value">Activa</span>
        </span>
        <span className="footer-status-center">
          © {currentYear} Benjamin Hidalgo — Todos los derechos reservados.
        </span>
        <span className="footer-status-right">
          Epoch: <span className="footer-status-value">v2.0.0</span> ◆ Roshar
        </span>
      </div>
    </footer>
  );
}

export default Footer;
