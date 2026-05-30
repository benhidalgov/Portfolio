import React, { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { WindrunnerGlyph, LightweaverGlyph } from '../Glyphs/RadiantGlyphs.jsx';
import './Loading.css';

const stormlightQuotes = [
  "VIDA ANTES QUE MUERTE",
  "FUERZA ANTES QUE DEBILIDAD",
  "EL CAMINO ANTES QUE EL DESTINO",
  "PROTEGERÉ A QUIENES NO PUEDEN PROTEGERSE A SÍ MISMOS",
  "VÍNCULO DE SPREN CONECTADO",
  "IDEALES PRONUNCIADOS..."
];

const Loading = () => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteFade, setQuoteFade] = useState(true);

  useEffect(() => {
    // Simular progreso de carga del 0 al 100
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Incremento aleatorio fluido
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 150);

    // Rotar juramentos cada 1.6 segundos con transición fade
    const quoteInterval = setInterval(() => {
      setQuoteFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % stormlightQuotes.length);
        setQuoteFade(true);
      }, 300);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="storm-loading-container">
      {/* Círculos de mandalas de Roshar concéntricos estáticos */}
      <div className="roshar-loading-mandala">
        <div className="mandala-ring ring-outer"></div>
        <div className="mandala-ring ring-middle"></div>
        <div className="mandala-ring ring-inner">
          {theme === 'LIGHT' ? (
            <LightweaverGlyph size={68} className="mandala-core-gem" />
          ) : (
            <WindrunnerGlyph size={68} className="mandala-core-gem" />
          )}
        </div>
      </div>

      {/* Juramento Radiante Actual que se desvanece suavemente */}
      <div className="storm-quote-container">
        <p className={`storm-quote ${quoteFade ? 'fade-in' : 'fade-out'}`}>
          {stormlightQuotes[quoteIndex]}
        </p>
      </div>

      {/* Barra de progreso de infusión de luz */}
      <div className="storm-status-bar-container">
        <div className="storm-status-header">
          <span>Infusión de Luz</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="storm-bar-outer">
          <div 
            className="storm-bar-inner" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>

      <h2 className="storm-title">URITHIRU</h2>
    </div>
  );
};

export default Loading;
