import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Estilos Globales
import './index.css'; // Importa estilos base y variables CSS
import './styles/layout.css'; // Contiene .app-container y .main-content-area

// 🏆 IMPORTACIÓN CLAVE: Importa el ThemeProvider desde el contexto
import { ThemeProvider } from './Context/ThemeContext.jsx'; 

// Utilidad de Sonido (Web Audio API)
import { playTerminalBip } from './utils/sound.js';

// Componentes de Layout (Se mantienen estáticos para carga inmediata)
import Sidebar from './Components/Sidebar/Sidebar.jsx'; 
import Footer from './Components/Footer/Footer.jsx';
import PageTransition from './Components/PageTransition/PageTransition.jsx';
import Loading from './Components/Loading/Loading.jsx';
import CustomCursor from './Components/CustomCursor/CustomCursor.jsx';

// Helper para añadir un delay artificial y permitir que la animación MAGI de 2.2s termine
const lazyWithDelay = (importFunc, delay = 2200) => {
  return React.lazy(() => 
    Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  );
};

// Importaciones Lazy de Páginas
const Home = lazyWithDelay(() => import('./Pages/Home/home.jsx'));
const About = lazyWithDelay(() => import('./Pages/about/about.jsx'));
const Projects = lazyWithDelay(() => import('./Pages/Projects/projects.jsx'));
const Next = lazyWithDelay(() => import('./Pages/Next/Next.jsx'));

// Importaciones Lazy de Case Studies (Refactorizado a componente dinámico)
const CategoryDetail = lazyWithDelay(() => import('./Pages/Projects/CategoryDetail.jsx'));


function App() {
  const location = useLocation();

  // Escuchador Global de Sonidos de UI NERV
  useEffect(() => {
    const handleUiClick = (e) => {
      const isInteractive = e.target.closest('a') || e.target.closest('button');
      if (isInteractive) {
        playTerminalBip();
      }
    };

    document.addEventListener('click', handleUiClick);
    return () => {
      document.removeEventListener('click', handleUiClick);
    };
  }, []);

  return (
    // 🏆 PASO 1: Envuelve TODO con ThemeProvider
    <ThemeProvider> 
      <CustomCursor />
      {/* CONTENEDOR PRINCIPAL: Define el layout de dos columnas */}
      <div className="app-container">
        
        <Sidebar /> 
        
        <div className="main-content-area">

          {/* Contenedor de rutas con AnimatePresence y Suspense */}
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loading />}>
              <Routes location={location} key={location.pathname}>
                {/* Rutas principales */}
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                <Route path="/Next" element={<PageTransition><Next /></PageTransition>} /> 
                
                {/* Rutas de Case Studies (Enfoques de Ingeniería) - Dinámico */}
                <Route path="/projects/:categoryId" element={<PageTransition><CategoryDetail /></PageTransition>} />
                
                {/* Ruta 404 */}
                <Route path="*" element={
                  <PageTransition>
                    <div style={{ padding: '50px', textAlign: 'center' }}>
                      <h1 className="glitch-text" data-text="404">404</h1>
                      <p>Página no encontrada. ¡El enlace podría estar roto!</p>
                    </div>
                  </PageTransition>
                } />
              </Routes>
            </Suspense>
          </AnimatePresence>
          
          <Footer />
          
        </div> {/* Cierre de .main-content-area */}
      </div> {/* Cierre de .app-container */}
    </ThemeProvider>
  );
}

export default App;