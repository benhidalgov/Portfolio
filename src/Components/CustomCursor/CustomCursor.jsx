import React, { useState, useEffect } from 'react';
import './CustomCursor.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [resolveText, setResolveText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);
    
    if (mediaQuery.matches) return;

    const onMouseMove = (e) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setResolveText(Math.random() > 0.5 ? "JURAMENTO" : "RADIANTE");
      setTimeout(() => {
        setIsClicking(false);
      }, 700);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div 
      className="gem-cursor-wrapper"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Estado Normal: Glifo Alethi Geométrico */}
      <svg 
        className={`alethi-cursor-glyph ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`} 
        viewBox="0 0 100 100"
      >
        {/* Diamante exterior */}
        <polygon points="50,5 95,50 50,95 5,50" className="glyph-outline" />
        {/* Diamante interior */}
        <polygon points="50,25 75,50 50,75 25,50" className="glyph-inline" />
        {/* Ejes simétricos */}
        <line x1="50" y1="5" x2="50" y2="95" className="glyph-axis" />
        <line x1="5" y1="50" x2="95" y2="50" className="glyph-axis" />
        {/* Curvas/Alas decorativas */}
        <path d="M25,50 Q50,20 75,50" className="glyph-curve" />
        <path d="M25,50 Q50,80 75,50" className="glyph-curve" />
        {/* Gema corazón central */}
        <circle cx="50" cy="50" r="4" className="glyph-core" />
      </svg>

      {/* Estado Clicado: Resplandor de Luz Tormentosa */}
      {isClicking && (
        <div className="stormlight-burst-container">
          <div className="stormlight-ray r1"></div>
          <div className="stormlight-ray r2"></div>
          <div className="stormlight-ray r3"></div>
          <div className="stormlight-ray r4"></div>
          <span className="stormlight-text">{resolveText}</span>
        </div>
      )}
    </div>
  );
}

export default CustomCursor;
