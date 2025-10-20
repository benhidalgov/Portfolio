import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; 

// Datos para la navegación principal (WORK, PLAY, ABOUT)
const primaryNav = [
  { path: '/projects', name: 'WORK', subtext: 'A selection of recent work' },
  { path: '/play', name: 'PLAY', subtext: 'Making things for fun' },
  { path: '/about', name: 'ABOUT', subtext: "Let's get to know each other" },
];

// Datos para la sección de "Case Studies" (Casos de Estudio)
const caseStudies = [
  { id: 1, name: 'GLOBAL CITIZEN', detail: 'Mobile app & design system' },
  { id: 2, name: 'CAMBIO', detail: 'Mobile app & UX research' },
  { id: 3, name: 'STORMENKS', detail: 'Mobile app & web platform' },
  { id: 4, name: 'TINICARD', detail: 'Mobile app and web platform' },
];

function Sidebar() {
  const location = useLocation(); // Hook de React Router para saber la ruta actual
  const [theme, setTheme] = React.useState('DARK'); // Hook para el estado del tema

  const toggleTheme = () => {
    // Lógica simple para cambiar el tema
    const newTheme = theme === 'DARK' ? 'LIGHT' : 'DARK';
    setTheme(newTheme);
    // En una aplicación real, aquí aplicarías una clase al body o usarías Context
    document.body.setAttribute('data-theme', newTheme.toLowerCase());
  };

  return (
    <nav className="sidebar">
      {/* SECCIÓN SUPERIOR: Título / Nombre */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-title">
          <div className="logo-placeholder">LOGO</div>
        </Link>
        <p className="sidebar-intro-text">
          UI based product designer, currently at SFITT, building things that hopefully 
          encourage us to lead more thoughtful lives.
        </p>
      </div>

      {/* SECCIÓN CENTRAL: Enlaces Principales y Casos de Estudio */}
      <div className="sidebar-nav-sections">
        {/* Enlaces Principales */}
        <div className="section-group">
          <p className="section-title">NAVIGATE</p>
          {primaryNav.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              // Usa la clase 'active' si la ruta actual coincide
              className={`nav-item-primary ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="item-name">{item.name}</span>
              <span className="item-subtext">{item.subtext}</span>
            </Link>
          ))}
        </div>

        {/* Casos de Estudio (simula la sección "SELECTED CASE STORIES") */}
        <div className="section-group case-studies">
          <p className="section-title">SELECTED CASE STORIES</p>
          {caseStudies.map((study) => (
            <Link 
              key={study.id} 
              to={`/projects/${study.id}`} 
              className="case-study-item"
            >
              <span className="case-study-icon"></span>
              <div className="case-study-text">
                <span className="case-study-name">{study.name}</span>
                <span className="case-study-detail">{study.detail}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* SECCIÓN INFERIOR: Selector de Tema */}
      <div className="sidebar-footer">
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {theme} / {theme === 'DARK' ? 'LIGHT' : 'DARK'} 
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
