import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Estilos Globales
import './index.css';
import './styles/layout.css';

// ThemeProvider
import { ThemeProvider } from './Context/ThemeContext.jsx';

// Components for non-home pages (sidebar layout)
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Loading from './Components/Loading/Loading.jsx';
import CustomCursor from './Components/CustomCursor/CustomCursor.jsx';
import Atmosphere from './Components/Atmosphere/Atmosphere.jsx';
import { useReveal } from './utils/useReveal.js';

// Lazy-loaded pages
const KageHome       = React.lazy(() => import('./Pages/Home/KageHome.jsx'));
const About          = React.lazy(() => import('./Pages/about/about.jsx'));
const Projects       = React.lazy(() => import('./Pages/Projects/projects.jsx'));
const CategoryDetail = React.lazy(() => import('./Pages/Projects/CategoryDetail.jsx'));

// Wrapper for sidebar pages
function SidebarLayout({ children }) {
  const location = useLocation();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content-area">
        <div className="main-content-body" data-route={location.pathname}>
          <Suspense fallback={<Loading />}>
            {/* Dentro del Suspense: si observara antes de que el chunk de la
                página monte, no encontraría ningún [data-rv] y el contenido
                quedaría invisible. */}
            <RevealScope scope={`.main-content-body[data-route="${location.pathname}"]`} />
            {children}
          </Suspense>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function RevealScope({ scope }) {
  useReveal(scope);
  return null;
}

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <ThemeProvider>
      <Atmosphere />
      <CustomCursor />
      {isHome ? (
        // ── Kage full-page experience (no sidebar, own nav)
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<KageHome />} />
          </Routes>
        </Suspense>
      ) : (
        // ── Other pages keep the sidebar layout
        <SidebarLayout>
          <Routes location={location} key={location.pathname}>
            <Route path="/about"    element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:categoryId" element={<CategoryDetail />} />
            <Route path="*" element={
              <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1>404</h1>
                <p>Esta habitación no existe.</p>
              </div>
            } />
          </Routes>
        </SidebarLayout>
      )}
    </ThemeProvider>
  );
}

export default App;