import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { projects } from '../../data/projects.js';
import EtherealMark from '../EtherealMark/EtherealMark.jsx';
import '../../styles/Sidebar.css';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SunIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="10" cy="10" r="4" />
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.6 4.6l1.4 1.4M14 14l1.4 1.4M4.6 15.4l1.4-1.4M14 6l1.4-1.4" />
  </svg>
);

const MoonIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M15 10.5A7 7 0 0 1 6 3a7 7 0 1 0 9 7.5z" />
  </svg>
);

function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeMenuOnMobile = () => { if (isMobile) setIsOpen(false); };

  const primaryNav = [
    { path: '/', name: 'Inicio' },
    { path: '/projects', name: 'Archivo' },
    { path: '/about', name: 'Perfil' },
  ];

  return (
    <>
      <button className="mobile-nav-toggle" onClick={toggleSidebar} aria-label="Abrir navegación">
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isMobile && isOpen && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,3,11,0.6)', zIndex: 1999 }}
          onClick={closeMenuOnMobile}
        />
      )}

      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="header-logo-toggle-group">
            <Link to="/" className="sidebar-title" onClick={closeMenuOnMobile} aria-label="Ir al inicio — Benjamín Hidalgo">
              <EtherealMark size={42} className="sidebar-seal" />
            </Link>

            <button onClick={toggleSidebar} className="sidebar-toggle-button" aria-label="Colapsar navegación">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {isOpen && (
            <p className="sidebar-intro-text">
              Ingeniería Informática especializada en soluciones escalables y seguridad.
            </p>
          )}
        </div>

        <div className={`sidebar-nav-sections ${!isOpen ? 'nav-collapsed' : ''}`}>
          <div className="section-group">
            {isOpen && <p className="section-title">Navegación</p>}
            {primaryNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item-primary ${location.pathname === item.path ? 'active' : ''} ${!isOpen ? 'icon-only' : ''}`}
                title={!isOpen ? item.name : undefined}
                onClick={closeMenuOnMobile}
              >
                {!isOpen ? (
                  <span className="nav-dot" aria-hidden="true" />
                ) : (
                  <span className="item-name">{item.name}</span>
                )}
              </Link>
            ))}
          </div>

          {isOpen && <div className="sidebar-divider" aria-hidden="true" />}

          <div className="section-group case-studies">
            {isOpen && <p className="section-title">Casos de estudio</p>}
            {projects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className={`case-study-item ${!isOpen ? 'icon-only' : ''}`}
                title={!isOpen ? p.navTitle : undefined}
                onClick={closeMenuOnMobile}
              >
                {!isOpen ? (
                  <span className="nav-dot" aria-hidden="true" />
                ) : (
                  <span>{p.navTitle}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="sidebar-footer">
          <button
            className={`theme-toggle-button ${!isOpen ? 'icon-only' : ''}`}
            onClick={toggleTheme}
            title={theme === 'DARK' ? 'Cambiar a modo diurno' : 'Cambiar a modo nocturno'}
            aria-label={theme === 'DARK' ? 'Cambiar a modo diurno' : 'Cambiar a modo nocturno'}
          >
            {isOpen ? (
              <span className="theme-toggle-content">
                {theme === 'DARK' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
                <span>{theme === 'DARK' ? 'Nocturno' : 'Diurno'}</span>
              </span>
            ) : (
              <span className="theme-toggle-icon-collapsed">
                {theme === 'DARK' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
