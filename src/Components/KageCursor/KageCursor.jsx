import { useEffect, useRef } from 'react';
import './KageCursor.css';

export default function KageCursor() {
  const dotRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Only show on pointer:fine devices
    const mql = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mql.matches) return;
    dot.style.opacity = '1';

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor], .card, .kage-nav-link, .kage-chip');
      if (interactive && !activeRef.current) {
        activeRef.current = true;
        dot.classList.add('act');
      }
    };

    const onLeave = (e) => {
      const interactive = e.target.closest('a, button, [data-cursor], .card, .kage-nav-link, .kage-chip');
      if (interactive && activeRef.current) {
        activeRef.current = false;
        dot.classList.remove('act');
      }
    };

    function animate() {
      const p = posRef.current;
      const c = currentRef.current;
      // Lerp toward target
      c.x += (p.x - c.x) * 0.12;
      c.y += (p.y - c.y) * 0.12;
      dot.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return <div ref={dotRef} className="kage-cursor-dot" id="kage-cursor" aria-hidden="true" />;
}
