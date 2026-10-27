import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../Components/SEO/SEO.jsx';
import KageNav from '../../Components/KageNav/KageNav.jsx';
import KageRail from '../../Components/KageRail/KageRail.jsx';
import Doorway from '../../Components/Atmosphere/Doorway.jsx';
import DreamFloor from '../../Components/Atmosphere/DreamFloor.jsx';
import Umbral from '../../Components/Umbral/Umbral.jsx';
import ProjectThumb from '../../Components/ProjectThumb/ProjectThumb.jsx';
import { homeSkills } from '../../data/skills.js';
import { projects } from '../../data/projects.js';
import './KageHome.css';

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'contact'];
const SKILL_CATS = homeSkills.filter(c => c.title !== 'Certificaciones').slice(0, 3);
const DISPLAY_PROJECTS = [...projects.filter(p => p.image), ...projects.filter(p => !p.image)];

function ArrowLink({ href, to, children }) {
  const inner = <span>{children}</span>;
  return to
    ? <Link to={to} className="kh-arrowlink">{inner}</Link>
    : <a href={href} className="kh-arrowlink">{inner}</a>;
}

export default function KageHome() {
  const [activeSection, setActiveSection] = useState(0);
  const [copied, setCopied] = useState(false);
  const sectionRefs = useRef([]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('hidalgobenjaminv@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  }, []);

  const setRef = useCallback((el, i) => {
    sectionRefs.current[i] = el;
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const sectionObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = SECTIONS.indexOf(e.target.id);
          if (idx !== -1) setActiveSection(idx);
        }
      });
    }, { threshold: 0.4 });

    sectionRefs.current.forEach(el => { if (el) sectionObs.observe(el); });
    return () => sectionObs.disconnect();
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <>
      <SEO
        title="Benjamín Hidalgo | Ingeniero Full-Stack"
        description="Portafolio profesional de Benjamín Hidalgo — Ingeniero Informático especializado en desarrollo Full-Stack, arquitectura de sistemas y soluciones escalables."
      />

      <KageNav activeSection={activeSection} />
      <KageRail activeSection={activeSection} />

      <div className="kh-page">
        {/* ENTRADA */}
        <section className="kh-hero" id="hero" ref={el => setRef(el, 0)}>
          <div className="kh-hero-scene" aria-hidden="true">
            <Doorway className="kh-hero-door" />
            <DreamFloor className="kh-hero-floor" />
          </div>
          <div className="kh-hero-scene-note" aria-hidden="true">
            <span>01 — EL UMBRAL</span>
            <span>Ingeniería · Software · Ciberseguridad</span>
          </div>

          <div className="kh-hero-top">
            <p className="kh-hero-kicker"><span aria-hidden="true" /> Portafolio personal · 2026</p>
            <p className="kh-hero-hi">Hola, soy</p>
            <h1 className="kh-display kh-h-hero">
              <span className="mask-line"><span>Benjamín</span></span>
              <span className="mask-line"><span>Hidalgo.</span></span>
            </h1>
            <p className="kh-hero-sub">
              Ingeniero Informático en proceso. Construyo sistemas claros,
              interfaces serenas y experiencias que se sienten ligeras.
            </p>
          </div>

          <div className="kh-hero-spacer" />

          <div className="kh-hero-foot">
            <div className="kh-cue" aria-hidden="true">
              <span>Baja para entrar</span>
              <span className="kh-track"><i /></span>
            </div>
          </div>
        </section>

        {/* EL ESTUDIO */}
        <section className="kh-sec" id="about" ref={el => setRef(el, 1)}>
          <div className="kh-room-head">
            <h2 className="kh-display kh-h-sec">El estudio</h2>
            <p className="kh-room-sub">Trabajo para que lo complejo se sienta simple.</p>
          </div>

          <div className="kh-studio-grid">
            <p className="kh-studio-lead">
              Soy Benjamín Hidalgo. Estudio Ingeniería Informática y trabajo en
              arquitectura de sistemas, desarrollo Full-Stack y ciberseguridad.
            </p>
            <div className="kh-studio-copy">
              <p className="kh-body">
                Me interesa lo que se siente simple porque está bien construido:
                modelos de datos claros, interfaces sin ruido y decisiones que
                se pueden explicar.
              </p>
              <ArrowLink to="/about">Ver el perfil completo</ArrowLink>
            </div>
          </div>
        </section>

        {/* HERRAMIENTAS */}
        <section className="kh-sec" id="skills" ref={el => setRef(el, 2)}>
          <div className="kh-room-head">
            <h2 className="kh-display kh-h-sec">Herramientas</h2>
            <p className="kh-room-sub">Lo que uso para construir, sin adornos.</p>
          </div>

          <div className="kh-directory">
            {SKILL_CATS.map((cat) => (
              <section className="kh-directory-col" key={cat.title}>
                <h3>{cat.title}</h3>
                <ul>
                  {cat.skills.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </section>

        {/* EL ARCHIVO */}
        <section className="kh-sec" id="projects" ref={el => setRef(el, 3)}>
          <div className="kh-room-head">
            <h2 className="kh-display kh-h-sec">El archivo</h2>
            <p className="kh-room-sub">
              Seis sistemas, seis problemas concretos. Del modelo de datos a la interfaz.
            </p>
          </div>

          <div className="kh-project-grid">
            {DISPLAY_PROJECTS.map((p, i) => (
              <article className="kh-project-card" key={p.slug}>
                <Link to={`/projects/${p.slug}`} className={`kh-project-visual ${p.image ? 'has-image' : 'is-concept'}`} aria-label={`Ver proyecto: ${p.title}`}>
                  <ProjectThumb project={p} className="kh-project-image" />
                  <span className="kh-project-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="kh-project-open" aria-hidden="true">↗</span>
                </Link>
                <div className="kh-project-info">
                  <div className="kh-project-heading">
                    <h3><Link to={`/projects/${p.slug}`}>{p.title}</Link></h3>
                    <span>{p.card?.badge || p.tech[0]}</span>
                  </div>
                  <p>{p.subtitle || p.summary}</p>
                  <div className="kh-project-meta">
                    <span>{p.tech.slice(0, 3).join(' · ')}</span>
                    <div className="kh-project-links">
                      {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer">Demo</a>}
                      {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">Código</a>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="kh-room-more">
            <ArrowLink to="/projects">Ver todos los proyectos</ArrowLink>
          </div>
        </section>

        {/* EL UMBRAL */}
        <Umbral onEnter={() => scrollToSection('contact')} />

        {/* RECEPCIÓN */}
        <section className="kh-sec kh-fin" id="contact" ref={el => setRef(el, 4)}>
          <h2 className="kh-display kh-fin-h">Hablemos.</h2>
          <div className="kh-fin-side">
            <p className="kh-body-lg">
              Cuéntame qué estás construyendo. Si la idea todavía es difusa, también sirve.
            </p>

            <div className="kh-cta-row">
              <a href="mailto:hidalgobenjaminv@gmail.com" className="kh-cta kh-cta-primary">
                Escríbeme
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`kh-cta kh-cta-secondary kh-copy-btn ${copied ? 'copied' : ''}`}
                aria-label="Copiar correo hidalgobenjaminv@gmail.com"
              >
                {copied ? 'Correo copiado' : 'Copiar correo'}
              </button>
            </div>

            <div className="kh-social-row">
              <a href="https://github.com/benhidalgov" target="_blank" rel="noopener noreferrer" className="kh-social-link">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/benjamin-hidalgov/" target="_blank" rel="noopener noreferrer" className="kh-social-link">
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* PIE */}
        <footer className="kh-foot">
          <div className="kh-foot-grid">
            <div className="kh-foot-brand">
              <p>
                Ingeniero Informático y desarrollador Full-Stack.<br />
                Construyo sistemas que se sienten simples.
              </p>
            </div>
            <div>
              <h4>Navegación</h4>
              <ul>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Sobre mí</a></li>
                <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Herramientas</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Archivo</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4>Proyectos</h4>
              <ul>
                {projects.slice(0, 4).map(p => (
                  <li key={p.id}><Link to={`/projects/${p.slug}`}>{p.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul>
                <li><a href="https://github.com/benhidalgov" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/benjamin-hidalgov/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="mailto:hidalgobenjaminv@gmail.com">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="kh-foot-base">
            <span>© 2026 Benjamín Hidalgo</span>
            <span className="kh-foot-oath">Disponible para colaborar</span>
            <span>React y Vite</span>
          </div>
        </footer>
      </div>
    </>
  );
}
