import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Estilos Globales
import './styles/layout.css'; // Contiene .app-container y .main-content-area

// Importaciones de Páginas
import Home from './Pages/Home/home.jsx';
import Projects from './Pages/Projects/projects.jsx';
import About from './Pages/About/about.jsx'; 
import Contact from './Pages/Contact/contact.jsx'; 

// Importaciones de Componentes de Layout
// NOTA: Hemos renombrado y usaremos Sidebar en lugar del Navbar superior
import Sidebar from './Components/Sidebar/Sidebar.jsx'; 
import Footer from './Components/Footer/Footer.jsx';


function App() {
  return (
    <Router>
      {/* CONTENEDOR PRINCIPAL: Define el layout de dos columnas */}
      <div className="app-container">
        
        {/* 1. BARRA LATERAL: Se mantiene estática */}
        {/* Usamos Sidebar, asumiendo que eliminaste el archivo 'navbar.jsx' antiguo */}
        <Sidebar /> 
        
        {/* 2. ÁREA PRINCIPAL DE CONTENIDO: Se desplaza a la derecha del Sidebar */}
        <div className="main-content-area">

          {/* Contenedor de rutas */}
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Ruta 404 */}
            <Route path="*" element={
              <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1>404</h1>
                <p>Página no encontrada. ¡El enlace podría estar roto!</p>
              </div>
            } />
          </Routes>
          
          {/* Footer visible en la parte inferior del área de contenido */}
          <Footer />
          
        </div> {/* Cierre de .main-content-area */}
      </div> {/* Cierre de .app-container */}
    </Router>
  );
}

export default App;
