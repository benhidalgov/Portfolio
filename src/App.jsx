import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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
import PageTransition from './Components/PageTransition/PageTransition.jsx';
import Loading from './Components/Loading/Loading.jsx';
import CustomCursor from './Components/CustomCursor/CustomCursor.jsx';

// Lazy-loaded pages
const KageHome       = React.lazy(() => import('./Pages/Home/KageHome.jsx'));
const About          = React.lazy(() => import('./Pages/about/about.jsx'));
const Projects       = React.lazy(() => import('./Pages/Projects/projects.jsx'));
const Next           = React.lazy(() => import('./Pages/Next/Next.jsx'));
const CategoryDetail = React.lazy(() => import('./Pages/Projects/CategoryDetail.jsx'));

// Wrapper for sidebar pages
function SidebarLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content-area">
        <div className="main-content-body">
          <AnimatePresence mode="wait">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </AnimatePresence>
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
            <Route path="/about"    element={<PageTransition><About /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/Next"     element={<PageTransition><Next /></PageTransition>} />
            <Route path="/projects/:categoryId" element={<PageTransition><CategoryDetail /></PageTransition>} />
            <Route path="*" element={
              <PageTransition>
                <div style={{ padding: '50px', textAlign: 'center' }}>
                  <h1 className="glitch-text" data-text="404">404</h1>
                  <p>Página no encontrada.</p>
                </div>
              </PageTransition>
            } />
          </Routes>
        </SidebarLayout>
      )}
    </ThemeProvider>
  );
}

export default App;