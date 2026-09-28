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
    let raf;
    let finished = false;
    const start = performance.now();
    const CREEP_MS = 1400;   // ritmo del avance simulado hasta 90%
    const HARD_CAP_MS = 2200; // techo: nunca retener al visitante mas que esto

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setProgress(100);
      setDone(true);
      setTimeout(() => { if (onDone) onDone(); }, 520);
    };

    // Avance simulado: rapido al inicio, se frena cerca del 90%.
    // Es solo feedback visual; el 100% lo dispara el load real.
    const creep = () => {
      const t = Math.min((performance.now() - start) / CREEP_MS, 1);
      setProgress(Math.round(90 * (1 - Math.pow(1 - t, 2))));
      if (t < 1) raf = requestAnimationFrame(creep);
    };
    raf = requestAnimationFrame(creep);

    // La senal real: el documento termino de cargar.
    const onLoad = () => {
      // Pequeno piso para que el ojo alcance a ver el estado final.
      const elapsed = performance.now() - start;
      setTimeout(finish, Math.max(0, 450 - elapsed));
    };
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });

    // Techo de seguridad por si load ya ocurrio o algo se cuelga.
    const cap = setTimeout(finish, HARD_CAP_MS);

    const oathTick = setInterval(() => {
      setOathIdx(i => (i + 1) % OATHS.length);
    }, 1400);

    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      clearTimeout(cap);
      clearInterval(oathTick);
      window.removeEventListener('load', onLoad);
    };
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
