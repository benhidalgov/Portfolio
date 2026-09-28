import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../Components/SEO/SEO.jsx';
import KageCanvas from '../../Components/KageCanvas/KageCanvas.jsx';
import KageNav from '../../Components/KageNav/KageNav.jsx';
import KageRail from '../../Components/KageRail/KageRail.jsx';
import KagePreloader from '../../Components/KagePreloader/KagePreloader.jsx';
import { homeSkills } from '../../data/skills.js';
import { projectData } from '../../data/project.jsx';
import { getLoadingPerformance } from '../../utils/readingMetrics.js';
import './KageHome.css';

// Sections config
const SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact'];

// Skill categories (no certs on home)
const SKILL_CATS = homeSkills.filter(c => c.title !== 'Certificaciones').slice(0, 3);

// Projects for the lesson list
const FEATURED_PROJECTS = projectData;

// ──────────────────────────────────────────────
// Arrow link helper
function ArrowLink({ href, to, children, 'data-rv': rv }) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="kh-ar">
        <svg viewBox="0 0 14 14" fill="none">
          <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3"/>
        </svg>
      </span>
    </>
  );
  return to
    ? <Link to={to} className="kh-arrowlink" data-rv={rv}>{inner}</Link>
    : <a href={href} className="kh-arrowlink" data-rv={rv}>{inner}</a>;
}

// ──────────────────────────────────────────────
export default function KageHome() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [copied, setCopied] = useState(false);
  const [perfMetrics, setPerfMetrics] = useState(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const measurePerf = () => {
      const metrics = getLoadingPerformance();
      if (metrics.loadTimeMs > 0) {
        setPerfMetrics(metrics);
      }
    };

    if (document.readyState === 'complete') {
      const timer = setTimeout(measurePerf, 150);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener('load', measurePerf, { once: true });
      return () => window.removeEventListener('load', measurePerf);
    }
  }, [preloaderDone]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('hidalgobenjaminv@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  }, []);

  // Register section ref
  const setRef = useCallback((el, i) => {
    sectionRefs.current[i] = el;
  }, []);

  // Preloader done → trigger reveals
  const handlePreloaderDone = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  // Smooth scroll to a section on the home page
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ── IntersectionObserver for scroll reveals + active section
  useEffect(() => {
    if (!preloaderDone) return;

    // Reveal system
    const revealEls = document.querySelectorAll('[data-rv]');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('rv-in');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObs.observe(el));

    // Active section tracker
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = SECTIONS.indexOf(e.target.id);
          if (idx !== -1) setActiveSection(idx);
        }
      });
    }, { threshold: 0.4 });

    sectionRefs.current.forEach(el => { if (el) sectionObs.observe(el); });

    // Trigger hero immediately
    setTimeout(() => {
      const heroReveal = document.querySelectorAll('#hero [data-rv]');
      heroReveal.forEach(el => el.classList.add('rv-in'));
    }, 100);

    return () => { revealObs.disconnect(); sectionObs.disconnect(); };
  }, [preloaderDone]);

  return (
    <>
      <SEO
        title="Benjamín Hidalgo | Ingeniero Full-Stack"
        description="Portafolio profesional de Benjamín Hidalgo — Ingeniero Informático especializado en desarrollo Full-Stack, arquitectura de sistemas y soluciones escalables."
      />

      {/* Preloader */}
      {!preloaderDone && <KagePreloader onDone={handlePreloaderDone} />}

      {/* Fixed overlays */}
      <KageCanvas activeSection={activeSection} />
      <div id="vignette" />
      <div id="grain" />
      <KageNav activeSection={activeSection} />
      <KageRail activeSection={activeSection} />

      {/* Page content (above canvas) */}
      <div className="kh-page">

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ HERO */}
        <section
          className="kh-hero"
          id="hero"
          ref={el => setRef(el, 0)}
        >
          <div className="kh-hero-top">
            <div className="kh-eyebrow" data-rv="fade">
              <kbd>CAP_00</kbd>
              <span>Archivo de Ingeniería & Caballero Radiante</span>
            </div>
            <h1 className="kh-display kh-h-hero">
              <span className="mask-line"><span>Hola, soy</span></span>
              <span className="mask-line"><span>Benjamín</span></span>
              <span className="mask-line kh-name-line"><span>Hidalgo.</span></span>
            </h1>
            <p className="kh-hero-sub" data-rv="up">
              Ingeniero Informático en proceso — construyendo sistemas escalables,
              interfaces de precisión técnica y arquitecturas que perduran.
            </p>
          </div>

          <div className="kh-hero-spacer" />

          <div className="kh-hero-foot">
            <div className="kh-cue" data-rv="fade">
              <span>Scroll para explorar</span>
              <span className="kh-track"><i /></span>
            </div>

            {/* Chapter chips */}
            <div className="kh-chips">
              {['Sobre Mí', 'Habilidades', 'Proyectos', 'Contacto'].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  className={`kh-chip ${activeSection === i + 1 ? 'on' : ''}`}
                  data-rv="up"
                  onClick={() => {
                    const el = document.getElementById(SECTIONS[i + 1]);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <kbd className="kh-chip-kbd">0{i + 1}</kbd>
                  <span className="kh-chip-tx">
                    <b>{label}</b>
                    <p>{[
                      'Conoce al Radiante',
                      'Arsenal técnico',
                      'Bento de proyectos',
                      'Abre un vínculo',
                    ][i]}</p>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Vertical side text */}
          <div className="kh-hero-side" data-rv="up">
            <span className="kh-side-v">Benjamin Hidalgo V.</span>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ABOUT (Chapter I) */}
        <section
          className="kh-sec kage-sec"
          id="about"
          ref={el => setRef(el, 1)}
        >
          <div className="kh-sec-head" data-rv="fade">
            <span className="kh-sec-k"><kbd>01</kbd> — El Radiante</span>
            <span className="kh-rule" />
            <span className="kh-sec-k">Sobre Mí</span>
          </div>

          <div className="kh-gate-grid">
            <h2 className="kh-display kh-h-sec" data-rv="up">
              Vida antes que muerte. Fuerza antes que debilidad.
            </h2>
            <div className="kh-gate-copy">
              <p className="kh-lead" data-rv="up">
                Soy Benjamín Hidalgo, estudiante de Ingeniería Informática con enfoque en
                arquitectura de sistemas, ingeniería de software Full-Stack y ciberseguridad.
                Construyo con rigor, diseño con sobriedad y propósito.
              </p>
              <p className="kh-body" data-rv="up">
                Mis proyectos abarcan desde tableros de gestión reactiva y microservicios concurrentes
                en Go hasta sistemas de indexación documental con RAG vectorial. Cada desarrollo
                constituye un juramento de calidad técnica.
              </p>
              <ArrowLink to="/about" data-rv="fade">Dossier del Radiante</ArrowLink>
            </div>
          </div>

          {/* Stats */}
          <div className="kh-gate-stats" data-rv="up">
            <div><b>04+</b><span>Proyectos Producción</span></div>
            <div><b>08+</b><span>Certificaciones</span></div>
            <div><b>03+</b><span>Años de Formación</span></div>
            <div><b>∞</b><span>Ideales & Rigor</span></div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SKILLS (Chapter II) */}
        <section
          className="kh-sec kage-sec"
          id="skills"
          ref={el => setRef(el, 2)}
        >
          <div className="kh-sec-head" data-rv="fade">
            <span className="kh-sec-k"><kbd>02</kbd> — Arsenal Técnico</span>
            <span className="kh-rule" />
            <span className="kh-sec-k">Habilidades</span>
          </div>

          <div className="kh-cards">
            {SKILL_CATS.map((cat, i) => (
              <article className="kh-card" key={cat.title} data-rv="up">
                <div className="kh-card-top">
                  <kbd>ORD_0{i + 1}</kbd>
                  <span className="kh-card-counter">0{i + 1} / 0{SKILL_CATS.length}</span>
                </div>
                <h3 className="kh-card-title">{cat.title}</h3>
                <div className="kh-card-tags">
                  {cat.skills.map((s, idx) => {
                    const pastelTypes = ['pastel-blue', 'pastel-green', 'pastel-amber', 'pastel-purple'];
                    const pastelClass = pastelTypes[(i + idx) % pastelTypes.length];
                    return (
                      <span key={s} className={`kh-pill ${pastelClass}`}>{s}</span>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PROJECTS (Chapter III - Bento Grid) */}
        <section
          className="kh-sec kage-sec"
          id="projects"
          ref={el => setRef(el, 3)}
        >
          <div className="kh-sec-head" data-rv="fade">
            <span className="kh-sec-k"><kbd>03</kbd> — Crónicas</span>
            <span className="kh-rule" />
            <span className="kh-sec-k">Proyectos</span>
          </div>

          <div className="kh-cur-head">
            <h2 className="kh-display kh-h-sec" data-rv="up">
              Cada proyecto, un juramento pronunciado.
            </h2>
            <p className="kh-body-lg" data-rv="up">
              Sistemas completos, desde el modelo de datos y concurrencia hasta la interfaz de usuario.
              Arquitecturas modulares diseñadas para perdurar.
            </p>
          </div>

          {/* Bento Box Asymmetrical Grid */}
          <div className="kh-bento-grid">
            {/* Card 1: TaskManager (Large Span - 2 cols) */}
            <article className="kh-bento-card kh-bento-featured" data-rv="up">
              <div className="kh-faux-chrome">
                <div className="kh-chrome-dots">
                  <span /><span /><span />
                </div>
                <span className="kh-chrome-path">taskmanager.benhidalgo.dev</span>
                <span className="kh-bento-badge pastel-blue">SUPABASE + RLS</span>
              </div>
              <div className="kh-bento-body">
                <div className="kh-bento-meta">
                  <kbd>PRJ_01</kbd>
                  <span className="kh-bento-sub">Gestión & Arquitectura Reactiva</span>
                </div>
                <h3 className="kh-bento-title">TaskManager (Kanban)</h3>
                <p className="kh-bento-desc">
                  Tablero Kanban Fullstack de alta fidelidad. Drag & Drop fluido, autenticación segura, persistencia en PostgreSQL con políticas RLS granulares y gestión de estado optimista con Zustand.
                </p>
                <div className="kh-bento-tech">
                  <span className="kh-pill pastel-blue">TypeScript</span>
                  <span className="kh-pill pastel-blue">React</span>
                  <span className="kh-pill pastel-green">Supabase</span>
                  <span className="kh-pill pastel-amber">PostgreSQL</span>
                  <span className="kh-pill pastel-purple">Zustand</span>
                </div>
                <div className="kh-bento-actions">
                  <Link to="/projects/taskmanager" className="kh-bento-link primary">
                    <span>Dossier</span>
                    <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </Link>
                  <a href="https://github.com/benhidalgov/TaskManager" target="_blank" rel="noopener noreferrer" className="kh-bento-link">
                    <span>GitHub ↗</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Card 2: KGB Knowledge Base (1 col) */}
            <article className="kh-bento-card" data-rv="up">
              <div className="kh-bento-header-compact">
                <kbd>PRJ_02</kbd>
                <span className="kh-bento-badge pastel-green">GEMINI RAG</span>
              </div>
              <div className="kh-bento-body">
                <h3 className="kh-bento-title">Consola Knowledge Base (KGB)</h3>
                <p className="kh-bento-desc">
                  Plataforma corporativa de conocimiento técnico: indexación en memoria con DuckDB, embeddings semánticos con Gemini RAG, bóveda cifrada en AES-256 y latencia sub-milisegundo.
                </p>
                <div className="kh-bento-tech">
                  <span className="kh-pill pastel-green">Python</span>
                  <span className="kh-pill pastel-green">DuckDB</span>
                  <span className="kh-pill pastel-amber">Gemini RAG</span>
                  <span className="kh-pill pastel-red">AES-256</span>
                </div>
                <div className="kh-bento-actions">
                  <Link to="/projects/kgb" className="kh-bento-link primary">
                    <span>Dossier</span>
                    <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </Link>
                  <a href="https://github.com/benhidalgov/KGB" target="_blank" rel="noopener noreferrer" className="kh-bento-link">
                    <span>GitHub ↗</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Card 3: API Inventario Golang (1 col) */}
            <article className="kh-bento-card" data-rv="up">
              <div className="kh-bento-header-compact">
                <kbd>PRJ_03</kbd>
                <span className="kh-bento-badge pastel-blue">CONCURRENCY</span>
              </div>
              <div className="kh-bento-body">
                <h3 className="kh-bento-title">API Inventario Golang</h3>
                <p className="kh-bento-desc">
                  Microservicio backend de inventario de alto rendimiento. Arquitectura limpia, sincronización thread-safe con sync.Mutex, Repository pattern y persistencia SQLite embebida.
                </p>
                <div className="kh-bento-tech">
                  <span className="kh-pill pastel-blue">Go</span>
                  <span className="kh-pill pastel-blue">SQLite</span>
                  <span className="kh-pill pastel-green">sync.Mutex</span>
                  <span className="kh-pill pastel-amber">Clean Arch</span>
                </div>
                <div className="kh-bento-actions">
                  <Link to="/projects/golang" className="kh-bento-link primary">
                    <span>Dossier</span>
                    <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </Link>
                  <a href="https://github.com/benhidalgov/Inventario_Golang" target="_blank" rel="noopener noreferrer" className="kh-bento-link">
                    <span>GitHub ↗</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Card 4: Autodocs (1 col) */}
            <article className="kh-bento-card" data-rv="up">
              <div className="kh-bento-header-compact">
                <kbd>PRJ_04</kbd>
                <span className="kh-bento-badge pastel-amber">ENTERPRISE</span>
              </div>
              <div className="kh-bento-body">
                <h3 className="kh-bento-title">Autodocs (Sistema Tickets)</h3>
                <p className="kh-bento-desc">
                  Gestión corporativa de soporte y tickets técnicos. Validación algorítmica de RUT chileno (Módulo 11), backend modular desacoplado, Prisma ORM y despliegue continuo en Vercel.
                </p>
                <div className="kh-bento-tech">
                  <span className="kh-pill pastel-blue">TypeScript</span>
                  <span className="kh-pill pastel-amber">Prisma ORM</span>
                  <span className="kh-pill pastel-green">Vercel</span>
                </div>
                <div className="kh-bento-actions">
                  <Link to="/projects/autodocs" className="kh-bento-link primary">
                    <span>Dossier</span>
                    <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </Link>
                  <a href="https://autodocs-mu.vercel.app" target="_blank" rel="noopener noreferrer" className="kh-bento-link">
                    <span>Demo ↗</span>
                  </a>
                  <a href="https://github.com/benhidalgov/Autodocs" target="_blank" rel="noopener noreferrer" className="kh-bento-link">
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Card 5: Minutera Web App (1 col) */}
            <article className="kh-bento-card" data-rv="up">
              <div className="kh-bento-header-compact">
                <kbd>PRJ_05</kbd>
                <span className="kh-bento-badge pastel-green">PRODUCTIVITY</span>
              </div>
              <div className="kh-bento-body">
                <h3 className="kh-bento-title">Minutera Web App</h3>
                <p className="kh-bento-desc">
                  Aplicación web orientada a la trazabilidad operativa: catalogación de acuerdos de equipo, seguimiento de compromisos semanales y gestión de acuerdos en tiempo real.
                </p>
                <div className="kh-bento-tech">
                  <span className="kh-pill pastel-blue">TypeScript</span>
                  <span className="kh-pill pastel-blue">React</span>
                  <span className="kh-pill pastel-green">Vite</span>
                  <span className="kh-pill pastel-purple">Vercel</span>
                </div>
                <div className="kh-bento-actions">
                  <Link to="/projects/minutera" className="kh-bento-link primary">
                    <span>Dossier</span>
                    <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4"/></svg>
                  </Link>
                  <a href="https://minutera.vercel.app" target="_blank" rel="noopener noreferrer" className="kh-bento-link">
                    <span>Demo ↗</span>
                  </a>
                  <a href="https://github.com/benhidalgov/Minutera" target="_blank" rel="noopener noreferrer" className="kh-bento-link">
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Card 6: Portafolio Roshar (Wide Span - 3 cols) */}
            <article className="kh-bento-card kh-bento-wide" data-rv="up">
              <div className="kh-faux-chrome">
                <div className="kh-chrome-dots">
                  <span /><span /><span />
                </div>
                <span className="kh-chrome-path">urithiru-terminal // webgl-shaders</span>
                <span className="kh-bento-badge pastel-purple">THREE.JS + REACT 19</span>
              </div>
              <div className="kh-bento-body kh-bento-wide-body">
                <div className="kh-bento-wide-content">
                  <div className="kh-bento-meta">
                    <kbd>PRJ_06</kbd>
                    <span className="kh-bento-sub">Gráficos 3D & Sistema de Audio Web</span>
                  </div>
                  <h3 className="kh-bento-title">Portafolio Roshar</h3>
                  <p className="kh-bento-desc">
                    Plataforma técnica interactiva con estética de El Archivo de las Tormentas. Shaders WebGL interactivos con Three.js, síntesis sonora Web Audio API, cursor Shardblade reactivo y arquitectura modular dividida en chunks de alto rendimiento.
                  </p>
                </div>
                <div className="kh-bento-wide-side">
                  <div className="kh-bento-tech">
                    <span className="kh-pill pastel-purple">React 19</span>
                    <span className="kh-pill pastel-blue">Three.js</span>
                    <span className="kh-pill pastel-green">Web Audio API</span>
                    <span className="kh-pill pastel-amber">Framer Motion</span>
                    <span className="kh-pill pastel-blue">Vite</span>
                  </div>
                  <div className="kh-bento-actions">
                    <Link to="/projects/portfolio" className="kh-bento-link primary">
                      <span>Dossier</span>
                      <svg viewBox="0 0 14 14" fill="none" width="12" height="12"><path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4"/></svg>
                    </Link>
                    <a href="https://github.com/benhidalgov/Portfolio" target="_blank" rel="noopener noreferrer" className="kh-bento-link">
                      <span>GitHub ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div style={{ marginTop: '2.5rem' }} data-rv="fade">
            <ArrowLink to="/projects">Explorar archivo completo de proyectos</ArrowLink>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CONTACT (Chapter IV) */}
        <section
          className="kh-sec kh-fin kage-sec"
          id="contact"
          ref={el => setRef(el, 4)}
        >
          <div className="kh-eyebrow" data-rv="fade">
            <kbd>CAP_04</kbd>
            <span>Vínculo Spren & Contacto</span>
          </div>
          <h2 className="kh-display kh-fin-h" data-rv="up">
            Abre<br />un vínculo.
          </h2>
          <p className="kh-body-lg" data-rv="up">
            ¿Tienes un desafío técnico o una propuesta de ingeniería? Conversemos — cada
            colaboración inicia con un primer contacto claro y directo.
          </p>

          <div className="kh-cta-row" data-rv="fade">
            <a href="mailto:hidalgobenjaminv@gmail.com" className="kh-cta kh-cta-primary" title="Abrir cliente de correo">
              <span>Enviar Correo</span>
              <svg viewBox="0 0 14 14" fill="none" width="13" height="13" aria-hidden="true">
                <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`kh-cta kh-cta-secondary kh-copy-btn ${copied ? 'copied' : ''}`}
              title="Copiar dirección de correo al portapapeles"
              aria-label="Copiar correo hidalgobenjaminv@gmail.com"
            >
              {copied ? (
                <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  ¡Copiado!
                </span>
              ) : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Copiar Correo
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </span>
              )}
            </button>
          </div>

          <div className="kh-social-row" data-rv="up">
            <a href="https://github.com/benhidalgov" target="_blank" rel="noopener noreferrer" className="kh-social-link">
              <kbd>GH</kbd>
              <span>github.com/benhidalgov</span>
            </a>
            <span className="kh-social-sep">/</span>
            <a href="https://www.linkedin.com/in/benjamin-hidalgov/" target="_blank" rel="noopener noreferrer" className="kh-social-link">
              <kbd>IN</kbd>
              <span>linkedin.com/in/benjamin-hidalgov</span>
            </a>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ FOOTER */}
        <footer className="kh-foot kage-sec">
          <div className="kh-foot-grid">
            <div className="kh-foot-brand">
              <p>
                Ingeniero Informático — Desarrollador Full-Stack.<br />
                Construyendo con propósito, diseñando para perdurar.
              </p>
            </div>
            <div>
              <h4>Navegación</h4>
              <ul>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Sobre Mí</a></li>
                <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Habilidades</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Proyectos</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4>Proyectos</h4>
              <ul>
                {FEATURED_PROJECTS.slice(0, 4).map(p => (
                  <li key={p.id}><Link to="/projects">{p.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Conectar</h4>
              <ul>
                <li><a href="https://github.com/benhidalgov" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/benjamin-hidalgov/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="mailto:hidalgobenjaminv@gmail.com">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="kh-foot-base">
            <span>© 2026 Benjamín Hidalgo</span>
            <span className="kh-foot-oath">«Vida antes que muerte»</span>
            <span>React · Three.js · Vite</span>
            {perfMetrics && perfMetrics.loadTimeMs > 0 && (
              <span
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-primary)', opacity: 0.9 }}
                title={`DOM: ${perfMetrics.domReadyMs}ms | FCP: ${perfMetrics.fcpMs ? perfMetrics.fcpMs + 'ms' : 'N/A'}`}
              >
                ⚡ {perfMetrics.loadTimeMs}ms [{perfMetrics.rating}]
              </span>
            )}
          </div>
        </footer>

      </div>{/* .kh-page */}
    </>
  );
}
