import React from 'react';
import '../../styles/hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eva-label">PILOT_01 // OPERATIVE PROFILE</span>
        <div className="hero-divider"></div>
        <h1 className="hero-title glitch-text" data-text="Hola, soy Benjamín Hidalgo">
          Hola, soy <span className="name-highlight">Benjamín Hidalgo</span>
        </h1>
        <p className="hero-subtitle">
          &gt; Ingeniero informático en proceso<span className="cursor">_</span>
        </p>
        <div className="hero-cta">
        </div>
      </div>
    </section>
  );
}

export default Hero;
