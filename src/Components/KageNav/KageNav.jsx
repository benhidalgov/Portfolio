import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import RadiantSeal from '../Glyphs/RadiantSeal.jsx';
import './KageNav.css';

const NAV_LINKS = [
  { to: '/#about',    label: 'Sobre Mí',     sub: 'Radiante' },
  { to: '/#skills',   label: 'Habilidades',  sub: 'Habilidades' },
  { to: '/#projects', label: 'Proyectos',    sub: 'Proyectos' },
  { to: '/#contact',  label: 'Contacto',     sub: 'Contacto' },
];

export default function KageNav() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 20);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', menuOpen);
  }, [menuOpen]);

  const handleNavClick = (hash) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      // Same-page scroll
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`kage-nav ${stuck ? 'stuck' : ''} ${hidden ? 'hide' : ''} ${menuOpen ? 'menu-open' : ''}`}
      id="kage-nav"
    >
      {/* Brand: Sello Heráldico Radiante */}
      <Link to="/" className="kage-brand" onClick={() => setMenuOpen(false)} aria-label="Inicio - Benjamín Hidalgo">
        <div className="kage-brand-glyph-wrap">
          <RadiantSeal size={34} className="kage-brand-glyph" />
        </div>
        <span className="kage-brand-tx">
          <b>BHidalgo</b>
          <i>{theme === 'DARK' ? 'Corredor del Viento' : 'Tejedor de Luz'}</i>
        </span>
      </Link>

      {/* Desktop nav links */}
      <nav className="kage-nav-links" id="kage-navlinks">
        {NAV_LINKS.map(({ to, label, sub }) => {
          const hash = to.split('#')[1] ? `#${to.split('#')[1]}` : to;
          return (
            <button
              key={to}
              className="kage-nav-link"
              onClick={() => handleNavClick(hash)}
            >
              <span>{label}</span>
              <span className="alt">{sub}</span>
            </button>
          );
        })}
        {/* Other pages */}
        <Link to="/projects" className="kage-nav-link" onClick={() => setMenuOpen(false)}>
          <span>Portafolio</span>
          <span className="alt">Archivo</span>
        </Link>
        <Link to="/about" className="kage-nav-link" onClick={() => setMenuOpen(false)}>
          <span>Sobre Mí</span>
          <span className="alt">Perfil</span>
        </Link>
      </nav>

      {/* Theme toggle */}
      <button className="kage-theme-btn" onClick={toggleTheme} title={theme === 'DARK' ? 'Modo Luz (Tejedor de Luz)' : 'Alta Tormenta (Corredor del Viento)'}>
        {theme === 'DARK' ? (
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
            <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.6 4.6l1.4 1.4M14 14l1.4 1.4M4.6 15.4l1.4-1.4M14 6l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
            <path d="M15 10.5A7 7 0 0 1 6 3a7 7 0 1 0 9 7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Hamburger */}
      <button
        className={`kage-burger ${menuOpen ? 'active' : ''}`}
        aria-label="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i /><i />
      </button>
    </header>
  );
}
