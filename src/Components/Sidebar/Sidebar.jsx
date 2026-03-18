import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import '../../styles/Sidebar.css';
import logo from '../../assets/images/Logo.svg';

// Iconos SVG
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
  </svg>
);
const DatabaseIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const primaryNav = [
    { path: '/', name: 'Inicio', subtext: '> Volvamos a empezar', icon: <HomeIcon /> },
    { path: '/projects', name: 'Proyectos', subtext: '> Mis trabajos de ingeniería', icon: <FolderIcon /> },
    { path: '/about', name: 'About Me', subtext: '> Conoce al operador', icon: <UserIcon /> },
  ];

  const caseStudies = [
    { title: 'Cloud & Infraestructura', path: '/projects/cloud', icon: <CloudIcon /> },
    { title: 'Análisis de Datos & BI', path: '/projects/data', icon: <DatabaseIcon /> },
    { title: 'Ciberseguridad & Ética', path: '/projects/security', icon: <ShieldIcon /> },
    { title: 'Desarrollo Full-Stack', path: '/projects/fullstack', icon: <CodeIcon /> },
  ];

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="header-logo-toggle-group">
            <Link to="/" className="sidebar-title">
              <img 
                src={logo} 
                alt="Logo B. Hidalgo" 
                className="sidebar-logo-img" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/0A0A0A/FF6A00?text=BH" }}
              />
            </Link>
            
            <button onClick={toggleSidebar} className="sidebar-toggle-button">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
        </div>
        
        {isOpen && (
          <p className="sidebar-intro-text">
            OPERATIVE_PROFILE // Ingeniero en Informática especializado en soluciones escalables y seguridad.
          </p>
        )}
      </div>

      {/* NAVIGATION */}
      <div className={`sidebar-nav-sections ${!isOpen ? 'nav-collapsed' : ''}`}>
        <div className="section-group">
          {isOpen && <p className="section-title">// Navigation</p>}
          {primaryNav.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-item-primary ${location.pathname === item.path ? 'active' : ''} ${!isOpen ? 'icon-only' : ''}`}
              title={!isOpen ? item.name : undefined}
            >
              {!isOpen ? (
                <span className="item-icon-collapsed">{item.icon}</span>
              ) : (
                <>
                  <span className="item-name">{item.name}</span>
                  <span className="item-subtext">{item.subtext}</span>
                </>
              )}
            </Link>
          ))}
        </div>

        <div className="section-group case-studies">
          {isOpen && <p className="section-title">// Engineering Data</p>}
          {caseStudies.map((study) => (
            <Link 
              key={study.path} 
              to={study.path} 
              className={`case-study-item ${!isOpen ? 'icon-only' : ''}`}
              title={!isOpen ? study.title : undefined}
            >
              {!isOpen ? (
                <span className="item-icon-collapsed">{study.icon}</span>
              ) : (
                <><span className="case-study-symbol">▶</span> {study.title}</>
              )}
            </Link>
          ))}
        </div>
      </div>
      
      {/* THEME TOGGLE */}
      {isOpen && (
        <div className="sidebar-footer">
          <button className="theme-toggle-button" onClick={toggleTheme}>
            [ {theme} ]
          </button>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;