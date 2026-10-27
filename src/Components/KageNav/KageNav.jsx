import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import EtherealMark from '../EtherealMark/EtherealMark.jsx';
import './KageNav.css';

const NAV_LINKS = [
  { to: '/#about',    label: 'Sobre mí' },
  { to: '/#skills',   label: 'Herramientas' },
  { to: '/#projects', label: 'Archivo' },
  { to: '/#contact',  label: 'Contacto' },
];

export default function KageNav() {
  const { theme, toggleTheme } = useTheme();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const scrollFrame = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (scrollFrame.current !== null) return;
      scrollFrame.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setStuck(y > 20);
        setHidden(y > lastY.current && y > 200);
        lastY.current = y;
        scrollFrame.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', menuOpen);
  }, [menuOpen]);

  const goToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`kage-nav ${stuck ? 'stuck' : ''} ${hidden ? 'hide' : ''} ${menuOpen ? 'menu-open' : ''}`}
      id="kage-nav"
    >
      <Link to="/" className="kage-brand" onClick={() => setMenuOpen(false)} aria-label="Inicio — Benjamín Hidalgo">
        <div className="kage-brand-glyph-wrap">
          <EtherealMark size={32} className="kage-brand-glyph" />
        </div>
        <span className="kage-brand-tx">
          <b>Benjamín Hidalgo</b>
          <i>Ingeniería y diseño</i>
        </span>
      </Link>

      <nav className="kage-nav-links" id="kage-navlinks">
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="kage-nav-link"
            onClick={() => goToSection(to.split('#')[1])}
          >
            {label}
          </Link>
        ))}
      </nav>

      <button
        className="kage-theme-btn"
        onClick={toggleTheme}
        title={theme === 'DARK' ? 'Cambiar a modo diurno' : 'Cambiar a modo nocturno'}
        aria-label={theme === 'DARK' ? 'Cambiar a modo diurno' : 'Cambiar a modo nocturno'}
      >
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

      <button
        className={`kage-burger ${menuOpen ? 'active' : ''}`}
        aria-label="Abrir menú"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i /><i />
      </button>
    </header>
  );
}
