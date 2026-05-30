import React from 'react';
import '../../styles/hero.css';
import { WindrunnerGlyph, LightweaverGlyph, GlyphDivider } from '../Glyphs/RadiantGlyphs.jsx';
import '../../Components/Glyphs/RadiantGlyphs.css';
import { useTheme } from '../../Context/ThemeContext.jsx';

function Hero() {
  const { theme } = useTheme();

  return (
    <section className="hero">
      {/* Gran glifo decorativo de fondo — Dinámico según la Orden activa (no gira) */}
      <div className="hero-glyph">
        {theme === 'DARK' ? (
          <WindrunnerGlyph size={400} />
        ) : (
          <LightweaverGlyph size={400} />
        )}
      </div>

      <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
        <span className="radiant-label">Caballero Radiante // Perfil Operativo</span>
        <div className="hero-divider"></div>
        <h1 className="hero-title glitch-text" data-text="Hola, soy Benjamín Hidalgo">
          Hola, soy <span className="name-highlight">Benjamín Hidalgo</span>
        </h1>
        <p className="hero-subtitle">
          &ldquo;Vida antes que muerte.&rdquo; Ingeniero informático en proceso<span className="cursor">◆</span>
        </p>
        <div className="hero-cta">
        </div>
        <GlyphDivider width={220} className="hero-glyph-divider" />
      </div>
    </section>
  );
}

export default Hero;
