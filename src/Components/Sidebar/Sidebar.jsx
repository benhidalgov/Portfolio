import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext.jsx';
import '../../styles/Sidebar.css';
import logo from '../../assets/images/Logo.svg';
import { 
  WindrunnerGlyph, 
  GemheartGlyph, 
  SkybreakerGlyph, 
  DustbringerGlyph, 
  LightweaverGlyph,
  BridgeFourGlyph,
  GlyphDivider,
  HighstormIcon,
  StormlightIcon 
} from '../Glyphs/RadiantGlyphs.jsx';
import '../Glyphs/RadiantGlyphs.css';

// Iconos SVG de menú
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
  
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeMenuOnMobile = () => { if (isMobile) setIsOpen(false); };

  // Navegación principal con glifos de órdenes
  const primaryNav = [
    { path: '/', name: 'Inicio', subtext: 'El camino más importante...', glyph: <WindrunnerGlyph size={18} /> },
    { path: '/projects', name: 'Proyectos', subtext: 'Crónicas de ingeniería', glyph: <SkybreakerGlyph size={18} /> },
    { path: '/about', name: 'About Me', subtext: 'Conoce al Radiante', glyph: <LightweaverGlyph size={18} /> },
  ];

  // Case studies con glifos temáticos
  const caseStudies = [
    { title: 'TaskManager (Kanban)', path: '/projects/taskmanager', glyph: <BridgeFourGlyph size={16} /> },
    { title: 'Portafolio Roshar', path: '/projects/portfolio', glyph: <GemheartGlyph size={16} /> },
    { title: 'Perle Noir Landing', path: '/projects/perlenoir', glyph: <LightweaverGlyph size={16} /> },
    { title: 'Inventario Golang', path: '/projects/golang', glyph: <DustbringerGlyph size={16} /> },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button className="mobile-nav-toggle" onClick={toggleSidebar} aria-label="Toggle Navigation">
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay */}
      {isMobile && isOpen && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1999 }} 
          onClick={closeMenuOnMobile}
        />
      )}

      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* HEADER */}
        <div className="sidebar-header">
          <div className="header-logo-toggle-group">
            <Link to="/" className="sidebar-title" onClick={closeMenuOnMobile}>
              <img 
                src={logo} 
                alt="Logo B. Hidalgo" 
                className="sidebar-logo-img" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/0A0E1A/00D4FF?text=BH" }}
              />
            </Link>
            
            <button onClick={toggleSidebar} className="sidebar-toggle-button">
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          
          {isOpen && (
            <>
              <p className="sidebar-intro-text">
                Caballero Radiante // Ingeniero en Informática especializado en soluciones escalables y seguridad.
              </p>
              {/* Glifo decorativo del Corredor del Viento */}
              <div className="sidebar-glyph-decoration">
                <WindrunnerGlyph size={36} className="glyph-breathe" />
              </div>
            </>
          )}
        </div>

        {/* NAVIGATION */}
        <div className={`sidebar-nav-sections ${!isOpen ? 'nav-collapsed' : ''}`}>
          <div className="section-group">
            {isOpen && (
              <div className="section-title-with-glyph">
                <GemheartGlyph size={12} />
                <p className="section-title" style={{ marginTop: 0 }}>Juramentos</p>
              </div>
            )}
            {primaryNav.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-item-primary ${location.pathname === item.path ? 'active' : ''} ${!isOpen ? 'icon-only' : ''}`}
                title={!isOpen ? item.name : undefined}
                onClick={closeMenuOnMobile}
              >
                {!isOpen ? (
                  <span className="item-icon-collapsed">{item.glyph}</span>
                ) : (
                  <div className="nav-item-with-glyph">
                    <span className="nav-item-glyph">{item.glyph}</span>
                    <div className="nav-item-text">
                      <span className="item-name">{item.name}</span>
                      <span className="item-subtext">{item.subtext}</span>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Divider entre secciones */}
          {isOpen && (
            <div style={{ padding: '0.5rem 0' }}>
              <GlyphDivider width={180} />
            </div>
          )}

          <div className="section-group case-studies">
            {isOpen && (
              <div className="section-title-with-glyph">
                <GemheartGlyph size={12} />
                <p className="section-title" style={{ marginTop: 0 }}>Crónicas de Roshar</p>
              </div>
            )}
            {caseStudies.map((study) => (
              <Link 
                key={study.path} 
                to={study.path} 
                className={`case-study-item ${!isOpen ? 'icon-only' : ''}`}
                title={!isOpen ? study.title : undefined}
                onClick={closeMenuOnMobile}
              >
                {!isOpen ? (
                  <span className="item-icon-collapsed">{study.glyph}</span>
                ) : (
                  <>
                    <span className="case-study-symbol">{study.glyph}</span>
                    <span>{study.title}</span>
                  </>
                )}
              </Link>
            ))}
          </div>

          {/* Juramento al pie de la navegación */}
          {isOpen && (
            <div className="sidebar-oath">
              <p className="oath-text">&ldquo;Fuerza antes que debilidad.&rdquo;</p>
            </div>
          )}
        </div>
        
        {/* THEME TOGGLE */}
        <div className="sidebar-footer">
          <button 
            className={`theme-toggle-button ${!isOpen ? 'icon-only' : ''}`} 
            onClick={toggleTheme}
            title={theme === 'DARK' ? 'Activar Luz Tormentosa' : 'Activar Alta Tormenta'}
          >
            {isOpen ? (
              <span className="theme-toggle-content">
                {theme === 'DARK' ? <HighstormIcon size={16} /> : <StormlightIcon size={16} />}
                <span>{theme === 'DARK' ? 'Alta Tormenta' : 'Luz Tormentosa'}</span>
                {theme === 'DARK' ? <HighstormIcon size={16} /> : <StormlightIcon size={16} />}
              </span>
            ) : (
              <span className="theme-toggle-icon-collapsed">
                {theme === 'DARK' ? <HighstormIcon size={18} /> : <StormlightIcon size={18} />}
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;