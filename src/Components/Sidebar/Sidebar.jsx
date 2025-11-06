import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx'; // Corregido: Ruta relativa a Context
import '../../styles/Sidebar.css';
import logo from '../../assets/images/Logo.png'; // Asegúrate que esta ruta es correcta

// Iconos SVG (MenuIcon y CloseIcon)
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

function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // Empieza abierto

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const primaryNav = [
    { path: '/', name: 'Inicio', subtext: 'Volvamos a empezar' },
    { path: '/projects', name: 'Proyectos', subtext: 'Mis trabajos de ingeniería' },
    { path: '/about', name: 'About me', subtext: "Conoce al profesional." },
  ];

  const caseStudies = [
    { title: 'Cloud & Infraestructura', path: '/projects/cloud' },
    { title: 'Análisis de Datos & BI', path: '/projects/data' },
    { title: 'Ciberseguridad & Ética', path: '/projects/security' },
    { title: 'Desarrollo Full-Stack', path: '/projects/fullstack' },
  ];

  return (
    <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* SECCIÓN SUPERIOR: Logo, Botón Toggle y texto intro */}
      <div className="sidebar-header">
        
        {/* 1. Contenedor para Logo y Botón TOGGLE (Nivel superior) */}
        <div className="header-logo-toggle-group">
            {/* Logo */}
            <Link to="/" className="sidebar-title">
              <img 
                src={logo} 
                alt="Logo B. Hidalgo" 
                className="sidebar-logo-img" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/000000/FFFFFF?text=BH" }}
              />
            </Link>
            
            {/* Botón Toggle (Se queda solo en su grupo para ser centrado con el logo) */}
            <button onClick={toggleSidebar} className="sidebar-toggle-button">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
        </div>
        
        {/* 3. Texto Intro (solo si está abierto) */}
        {isOpen && (
          <p className="sidebar-intro-text">
            "Ingeniero en Informática en desarrollo, fan de las soluciones escalables y que busca la realización de proyectos que puedan proteger al usuario"
          </p>
        )}
      </div>

      {/* SECCIÓN CENTRAL: Navegación (Solo visible si está abierto) */}
      {isOpen && (
        <div className="sidebar-nav-sections">
          {/* ... (Contenido de Navegación) ... */}
          <div className="section-group">
            <p className="section-title">NAVEGACIÓN</p>
            {primaryNav.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-item-primary ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="item-name">{item.name}</span>
                <span className="item-subtext">{item.subtext}</span>
              </Link>
            ))}
          </div>

          <div className="section-group case-studies">
            <p className="section-title">ENFOQUES DE INGENIERÍA</p>
            {caseStudies.map((study) => (
              <Link 
                key={study.path} 
                to={study.path} 
                className="case-study-item"
              >
                <span className="case-study-symbol">⦿</span> {study.title}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* SECCIÓN INFERIOR: Selector de Tema (Solo visible si está abierto) */}
      {isOpen && (
        <div className="sidebar-footer">
          <button className="theme-toggle-button" onClick={toggleTheme}>
            {theme} / {theme === 'DARK' ? 'LIGHT' : 'DARK'} 
          </button>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;