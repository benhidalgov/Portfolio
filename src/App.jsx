import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Estilos Globales
import './index.css'; // Importa estilos base y variables CSS
import './styles/layout.css'; // Contiene .app-container y .main-content-area

// IMPORTACIÓN CLAVE: Importa el ThemeProvider desde el contexto
import { ThemeProvider } from './Context/ThemeContext.jsx'; 

// Componentes de Layout (Se mantienen estáticos para carga inmediata)
import Sidebar from './Components/Sidebar/Sidebar.jsx'; 
import Footer from './Components/Footer/Footer.jsx';
import PageTransition from './Components/PageTransition/PageTransition.jsx';
import Loading from './Components/Loading/Loading.jsx';

// Importaciones Lazy de Páginas
const Home = React.lazy(() => import('./Pages/Home/home.jsx'));
const About = React.lazy(() => import('./Pages/about/about.jsx'));
const Projects = React.lazy(() => import('./Pages/Projects/projects.jsx'));
const Next = React.lazy(() => import('./Pages/Next/Next.jsx'));

// Importaciones Lazy de Case Studies
const Cloud = React.lazy(() => import('./Pages/Projects/Cloud.jsx'));
const Data = React.lazy(() => import('./Pages/Projects/data.jsx'));
const Security = React.lazy(() => import('./Pages/Projects/security.jsx'));
const FullStack = React.lazy(() => import('./Pages/Projects/fullstack.jsx'));


function App() {
  const location = useLocation();

  return (
    // PASO 1: Envuelve TODO con ThemeProvider
    <ThemeProvider> 
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
                
                {/* Rutas de Case Studies (Enfoques de Ingeniería) */}
                <Route path="/projects/cloud" element={<PageTransition><Cloud /></PageTransition>} />
                <Route path="/projects/data" element={<PageTransition><Data /></PageTransition>} />
                <Route path="/projects/security" element={<PageTransition><Security /></PageTransition>} />
                <Route path="/projects/fullstack" element={<PageTransition><FullStack /></PageTransition>} />
                
                {/* Ruta 404 */}
                <Route path="*" element={
                  <PageTransition>
                    <div style={{ padding: '50px', textAlign: 'center' }}>
                      <h1>404</h1>
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