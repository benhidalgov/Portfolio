import { useState, useEffect } from 'react';
import { useTheme } from '../../Context/ThemeContext.jsx';
import { WindrunnerGlyph, LightweaverGlyph } from '../Glyphs/RadiantGlyphs.jsx';
import './KagePreloader.css';

const OATHS = [
  'VIDA ANTES QUE MUERTE',
  'FUERZA ANTES QUE DEBILIDAD',
  'EL CAMINO ANTES QUE EL DESTINO',
  'INICIALIZANDO URITHIRU',
  'STORMLIGHT INFUNDIDO...',
];

export default function KagePreloader({ onDone }) {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [oathIdx, setOathIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const tick = setInterval(() => {
      p += Math.floor(Math.random() * 14) + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        // Fade out
        setTimeout(() => {
          setDone(true);
          setTimeout(() => { if (onDone) onDone(); }, 700);
        }, 300);
      }
      setProgress(p);
    }, 120);

    const oathTick = setInterval(() => {
      setOathIdx(i => (i + 1) % OATHS.length);
    }, 1600);

    return () => { clearInterval(tick); clearInterval(oathTick); };
  }, [onDone]);

  return (
    <div className={`kage-pre ${done ? 'done' : ''}`} id="kage-pre">
      <div className="kage-pre-in">
        {/* Glifo de la Orden — Windrunner (dark) / Lightweaver (light) */}
        <div className="kage-pre-mark">
          {theme === 'DARK' ? <WindrunnerGlyph /> : <LightweaverGlyph />}
        </div>

        <div className="kage-pre-label">Benjamin Hidalgo</div>
        <div className="kage-pre-oath">{OATHS[oathIdx]}</div>

        <div className="kage-pre-bar">
          <div className="kage-pre-fill" style={{ right: `${100 - progress}%` }} />
        </div>

        <div className="kage-pre-meta">
          <span>Cargando portafolio</span>
          <b><span>{Math.min(progress, 100)}</span>%</b>
        </div>
      </div>
    </div>
  );
}
