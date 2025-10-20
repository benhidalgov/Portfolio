import React from 'react';
import '../../styles/hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hola, soy [Tu Nombre]</h1>
        <p className="hero-subtitle">Desarrollador Frontend • React • UI/UX</p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">Ver proyectos</a>
          <a href="#contact" className="btn-secondary">Contactar</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
