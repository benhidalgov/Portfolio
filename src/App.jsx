import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Estilos Globales
import './index.css';
import './styles/layout.css';

// ThemeProvider
import { ThemeProvider } from './Context/ThemeContext.jsx';

// Sound utility
import { playTerminalBip } from './utils/sound.js';

// Components for non-home pages (sidebar layout)
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Loading from './Components/Loading/Loading.jsx';
import CustomCursor from './Components/CustomCursor/CustomCursor.jsx';
import { useReveal } from './utils/useReveal.js';

// Lazy-loaded pages
const KageHome       = React.lazy(() => import('./Pages/Home/KageHome.jsx'));
const About          = React.lazy(() => import('./Pages/about/about.jsx'));
const Projects       = React.lazy(() => import('./Pages/Projects/projects.jsx'));
const Next           = React.lazy(() => import('./Pages/Next/Next.jsx'));
const CategoryDetail = React.lazy(() => import('./Pages/Projects/CategoryDetail.jsx'));

// Wrapper for sidebar pages
function SidebarLayout({ children }) {
  const location = useLocation();
  // Re-observa al cambiar de ruta: cada página monta sus propios [data-rv].
  useReveal(`.main-content-body[data-route="${location.pathname}"]`);

  return (
    <div className="app-container">
      {/* Atmósfera compartida con el Home (definidas en index.css). */}
      <div id="vignette" />
      <div id="grain" />

      <Sidebar />
      <div className="main-content-area">
        <div className="main-content-body" data-route={location.pathname}>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Global sound on interactive clicks (non-home pages only)
  useEffect(() => {
    if (isHome) return;
    const handleClick = (e) => {
      if (e.target.closest('a') || e.target.closest('button')) {
        playTerminalBip();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isHome]);

  return (
    <ThemeProvider>
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
            <Route path="/Next"     element={<Next />} />
            <Route path="/projects/:categoryId" element={<CategoryDetail />} />
            <Route path="*" element={
              <div style={{ padding: '50px', textAlign: 'center' }}>
                <h1 className="glitch-text" data-text="404">404</h1>
                <p>Página no encontrada.</p>
              </div>
            } />
          </Routes>
        </SidebarLayout>
      )}
    </ThemeProvider>
  );
}

export default App;