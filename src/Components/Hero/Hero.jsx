import React from 'react';
import '../../styles/hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hola,soy Benjamín Hidalgo</h1>
        <p className="hero-subtitle">Ingeniero informatico en proceso </p>        <div className="hero-cta">
          <a href="#projects" className="btn-primary">Ver proyectos</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
