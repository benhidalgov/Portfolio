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
      setResolveText(Math.random() > 0.5 ? "RESOLVED" : "PRIORITY");
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
      className="magi-cursor-wrapper"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Estado Normal: Hexágono Hueco (MAGI Base) */}
      <svg 
        className={`magi-hexagon ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`} 
        viewBox="0 0 100 100"
      >
        <polygon points="50,5 95,28 95,72 50,95 5,72 5,28" />
      </svg>

      {/* Estado Clicado: Consenso de las 3 Computadoras */}
      {isClicking && (
        <div className="magi-resolve-container">
          <div className="magi-triangle t1"></div>
          <div className="magi-triangle t2"></div>
          <div className="magi-triangle t3"></div>
          <span className="magi-text">{resolveText}</span>
        </div>
      )}
    </div>
  );
}

export default CustomCursor;
