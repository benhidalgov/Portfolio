import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // 🏆 CORRECCIÓN: Ahora solo importa su CSS local

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-links">
        <h3>Navegación</h3>
        {/* Enlaces internos usando Link */}
        <Link to="/" className="footer-link">Inicio</Link>
        <Link to="/projects" className="footer-link">Proyectos</Link>
        <Link to="/about" className="footer-link">Sobre Mí</Link>
        <Link to="/contact" className="footer-link">Contacto</Link>
      </div>

      <div className="footer-social">
        <h3>Conéctate</h3>
        {/* Enlaces externos usando <a> */}
        <a href="[Tu URL de GitHub]" target="_blank" rel="noopener noreferrer" className="social-link">
          GitHub
        </a>
        <a href="[Tu URL de LinkedIn]" target="_blank" rel="noopener noreferrer" className="social-link">
          LinkedIn
        </a>
        <a href="mailto:[Tu Correo Electrónico]" className="social-link">
          Email
        </a>
      </div>

      <div className="footer-copyright">
        <p>Hecho con ❤️ y React.</p>
        <p>&copy; {currentYear} [Tu Nombre]. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
