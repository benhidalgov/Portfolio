import { useState, useEffect } from 'react';
import './Loading.css';

const LINES = [
  'Despertando el entorno',
  'Ajustando la luz',
  'Abriendo la puerta',
];

const Loading = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [lineFade, setLineFade] = useState(true);

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setLineFade(false);
      setTimeout(() => {
        setLineIndex((prev) => (prev + 1) % LINES.length);
        setLineFade(true);
      }, 300);
    }, 1800);

    return () => clearInterval(lineInterval);
  }, []);

  return (
    <div className="dream-loading">
      <div className="dream-loading__scene" aria-hidden="true">
        <div className="dream-loading__ring dream-loading__ring--a" />
        <div className="dream-loading__ring dream-loading__ring--b" />
        <div className="dream-loading__orb" />
      </div>

      <p className={`dream-loading__line ${lineFade ? 'is-in' : 'is-out'}`}>
        {LINES[lineIndex]}
      </p>

      <h1 className="dream-loading__title">Benjamín Hidalgo</h1>
      <p className="dream-loading__tag">Portafolio</p>
    </div>
  );
};

export default Loading;
