import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Estilos Globales
import './index.css'; // Importa estilos base y variables CSS
import './styles/layout.css'; // Contiene .app-container y .main-content-area

// 🏆 IMPORTACIÓN CLAVE: Importa el ThemeProvider desde el contexto
import { ThemeProvider } from './Context/ThemeContext.jsx'; 

// Importaciones de Páginas
import Home from './Pages/Home/home.jsx';
import About from './Pages/about/about.jsx';
import Projects from './Pages/Projects/projects.jsx';
import Next from './Pages/Next/Next.jsx';

// Importaciones de Páginas de Proyectos (Case Studies)
import Cloud from './Pages/Projects/Cloud.jsx';
import Data from './Pages/Projects/data.jsx';
import Security from './Pages/Projects/security.jsx';
import FullStack from './Pages/Projects/fullstack.jsx';

// Importaciones de Componentes de Layout
import Sidebar from './Components/Sidebar/Sidebar.jsx'; 
import Footer from './Components/Footer/Footer.jsx';


function App() {
  return (
    // 🏆 PASO 1: Envuelve TODO con ThemeProvider
    <ThemeProvider> 
      <Router>
        {/* CONTENEDOR PRINCIPAL: Define el layout de dos columnas */}
        <div className="app-container">
          
          <Sidebar /> 
          
          <div className="main-content-area">

            {/* Contenedor de rutas */}
            <Routes>
              {/* Rutas principales */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/Next" element={<Next />} /> 
              
              {/* Rutas de Case Studies (Enfoques de Ingeniería) */}
              <Route path="/projects/cloud" element={<Cloud />} />
              <Route path="/projects/data" element={<Data />} />
              <Route path="/projects/security" element={<Security />} />
              <Route path="/projects/fullstack" element={<FullStack />} />
              
              {/* Ruta 404 */}
              <Route path="*" element={
                <div style={{ padding: '50px', textAlign: 'center' }}>
                  <h1>404</h1>
                  <p>Página no encontrada. ¡El enlace podría estar roto!</p>
                </div>
              } />
            </Routes>
            
            <Footer />
            
          </div> {/* Cierre de .main-content-area */}
        </div> {/* Cierre de .app-container */}
      </Router>
    </ThemeProvider>
  );
}

export default App;