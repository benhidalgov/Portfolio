import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../Components/SEO/SEO.jsx';
import KageCanvas from '../../Components/KageCanvas/KageCanvas.jsx';
import KageNav from '../../Components/KageNav/KageNav.jsx';
import KageRail from '../../Components/KageRail/KageRail.jsx';
import KageCursor from '../../Components/KageCursor/KageCursor.jsx';
import KagePreloader from '../../Components/KagePreloader/KagePreloader.jsx';
import { homeSkills } from '../../data/skills.js';
import { projectData } from '../../data/project.jsx';
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
  const sectionRefs = useRef([]);
  const observerRef = useRef(null);

  // Register section ref
  const setRef = useCallback((el, i) => {
    sectionRefs.current[i] = el;
  }, []);

  // Preloader done → trigger reveals
  const handlePreloaderDone = useCallback(() => {
    setPreloaderDone(true);
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
      <KageCursor />
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
              <span className="kh-dot" />
              Capítulo 00 — Caballero Radiante
            </div>
            <h1 className="kh-display kh-h-hero">
              <span className="mask-line"><span>Hola, soy</span></span>
              <span className="mask-line"><span>Benjamín</span></span>
              <span className="mask-line kh-name-line"><span>Hidalgo.</span></span>
            </h1>
            <p className="kh-hero-sub" data-rv="up">
              Ingeniero Informático en proceso — construyendo sistemas escalables,
              interfaces elegantes y soluciones que perduran.
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
              {['About', 'Skills', 'Projects', 'Contact'].map((label, i) => (
                <div
                  key={label}
                  className={`kh-chip ${activeSection === i + 1 ? 'on' : ''}`}
                  data-rv="up"
                  onClick={() => {
                    const el = document.getElementById(SECTIONS[i + 1]);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="kh-chip-num">0{i + 1}</span>
                  <span className="kh-chip-tx">
                    <b>{label}</b>
                    <p>{[
                      'Conoce al Radiante',
                      'Arsenal técnico',
                      'Crónicas de ingeniería',
                      'Abre un vínculo',
                    ][i]}</p>
                  </span>
                </div>
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
            <span className="kh-sec-k"><b>01</b> — El Radiante</span>
            <span className="kh-rule" />
            <span className="kh-sec-k">About</span>
          </div>

          <div className="kh-gate-grid">
            <h2 className="kh-display kh-h-sec" data-rv="up">
              Vida antes que muerte. Fuerza antes que debilidad.
            </h2>
            <div className="kh-gate-copy">
              <p className="kh-lead" data-rv="up">
                Soy Benjamín Hidalgo, estudiante de Ingeniería Informática con pasión por
                la arquitectura de sistemas, el desarrollo Full-Stack y la ciberseguridad.
                Construyo con propósito, diseño con precisión.
              </p>
              <p className="kh-body" data-rv="up">
                Mis proyectos van desde tableros Kanban con Supabase y React hasta
                microservicios en Go, landing pages de alta gama y sistemas de inventario.
                Cada línea de código es un juramento pronunciado.
              </p>
              <ArrowLink to="/about" data-rv="fade">Conoce al Radiante</ArrowLink>
            </div>
          </div>

          {/* Stats */}
          <div className="kh-gate-stats" data-rv="up">
            <div><b>4+</b><span>Proyectos</span></div>
            <div><b>8+</b><span>Certificaciones</span></div>
            <div><b>3+</b><span>Años de estudio</span></div>
            <div><b>∞</b><span>Ideales</span></div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SKILLS (Chapter II) */}
        <section
          className="kh-sec kage-sec"
          id="skills"
          ref={el => setRef(el, 2)}
        >
          <div className="kh-sec-head" data-rv="fade">
            <span className="kh-sec-k"><b>02</b> — Arsenal Técnico</span>
            <span className="kh-rule" />
            <span className="kh-sec-k">Skills</span>
          </div>

          <div className="kh-cards">
            {SKILL_CATS.map((cat, i) => (
              <article className="kh-card" key={cat.title} data-rv="up">
                <div className="kh-card-fr">
                  <span className="kh-card-ar">
                    <svg viewBox="0 0 14 14" fill="none">
                      <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3"/>
                    </svg>
                  </span>
                  {/* Ambient glow */}
                  <div className="kh-card-glow" />
                  <div className="kh-card-lab">
                    <b>{cat.title}</b>
                    <span className="kh-card-num">ORD_{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="kh-card-meta">
                  <span>{cat.skills.slice(0, 3).join(' · ')}</span>
                  <span>0{i + 1} / 0{SKILL_CATS.length}</span>
                </div>
                {/* Expanded tag list */}
                <div className="kh-card-tags">
                  {cat.skills.map(s => (
                    <span key={s} className="kh-tag">{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PROJECTS (Chapter III) */}
        <section
          className="kh-sec kage-sec"
          id="projects"
          ref={el => setRef(el, 3)}
        >
          <div className="kh-sec-head" data-rv="fade">
            <span className="kh-sec-k"><b>03</b> — Crónicas</span>
            <span className="kh-rule" />
            <span className="kh-sec-k">Projects</span>
          </div>

          <div className="kh-cur-head">
            <h2 className="kh-display kh-h-sec" data-rv="up">
              Cada proyecto, un juramento pronunciado.
            </h2>
            <p className="kh-body-lg" data-rv="up">
              Sistemas completos, desde el modelo de datos hasta la interfaz. Construidos
              para escalar, diseñados para impresionar.
            </p>
          </div>

          <div className="kh-cur">
            {FEATURED_PROJECTS.map((proj, i) => (
              <div className="kh-les" key={proj.id} data-rv="fade">
                <span className="kh-les-k">0{i + 1}</span>
                <h3 className="kh-les-h">{proj.title}</h3>
                <p className="kh-les-p">{proj.description.substring(0, 90)}…</p>
                <div className="kh-les-tech">
                  {(proj.tech || []).slice(0, 3).map(t => (
                    <span key={t} className="kh-tech-pill">{t}</span>
                  ))}
                </div>
                <div className="kh-les-links">
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="kh-les-link">
                      GitHub
                    </a>
                  )}
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="kh-les-link">
                      Live
                    </a>
                  )}
                </div>
                <div className="kh-les-bar" />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }} data-rv="fade">
            <ArrowLink to="/projects">Ver todos los proyectos</ArrowLink>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CONTACT (Chapter IV) */}
        <section
          className="kh-sec kh-fin kage-sec"
          id="contact"
          ref={el => setRef(el, 4)}
        >
          <div className="kh-eyebrow" data-rv="fade">
            <span className="kh-dot" />
            Capítulo 04 — Vínculo Spren
          </div>
          <h2 className="kh-display kh-fin-h" data-rv="up">
            Abre<br />un vínculo.
          </h2>
          <p className="kh-body-lg" data-rv="up">
            ¿Tienes un proyecto que requiere un Radiante? Escríbeme — cada
            conversación es el primer paso de un juramento.
          </p>

          <div className="kh-cta-row" data-rv="fade">
            <a href="mailto:hidalgobenjaminv@gmail.com" className="kh-cta">
              <i />
              <span>hidalgobenjaminv@gmail.com</span>
              <svg viewBox="0 0 14 14" fill="none" width="13" height="13">
                <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
            </a>
          </div>

          <div className="kh-social-row" data-rv="up">
            <a href="https://github.com/benhidalgov" target="_blank" rel="noopener noreferrer" className="kh-social-link">
              GitHub
            </a>
            <span className="kh-social-sep">◆</span>
            <a href="https://www.linkedin.com/in/benjamin-hidalgov/" target="_blank" rel="noopener noreferrer" className="kh-social-link">
              LinkedIn
            </a>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ FOOTER */}
        <footer className="kh-foot kage-sec">
          <div className="kh-foot-grid">
            <div className="kh-foot-brand">
              <p>
                Ingeniero Informático — Full-Stack Developer.<br />
                Construyendo con propósito, diseñando para perdurar.
              </p>
            </div>
            <div>
              <h4>Navegación</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
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
          </div>
        </footer>

      </div>{/* .kh-page */}
    </>
  );
}
