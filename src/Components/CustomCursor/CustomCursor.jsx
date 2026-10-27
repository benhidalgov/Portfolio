import { useEffect, useRef } from 'react';
import './CustomCursor.css';

/**
 * Cursor orbe: núcleo de luz + halo + onda al hacer clic.
 * Sin texto y sin audio. Se desactiva en touch y con movimiento reducido.
 */
function CustomCursor() {
  const wrapperRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    const isTouch = () =>
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth <= 768;

    if (isTouch() || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let hasMoved = false;

    const scheduleAnimation = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (e) => {
      posRef.current = {
        x: Math.max(0, Math.min(window.innerWidth, e.clientX)),
        y: Math.max(0, Math.min(window.innerHeight, e.clientY)),
      };
      if (!hasMoved) {
        hasMoved = true;
        currentRef.current = { ...posRef.current };
        wrapper.style.opacity = '1';
        wrapper.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        return;
      }
      scheduleAnimation();
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const isCard = target.closest('.kh-ledger-row, .project-card-summary, .about-directory, .kh-directory, .kh-foot');
      const isAction = target.closest('a, button, [role="button"], .kh-cta, .btn-primary, .kage-theme-btn, .mobile-nav-toggle');
      const isSubtle = target.closest('.kh-hero-links a, .kh-ledger-links a, .kh-arrowlink, .tech-tag, .kage-rail-btn, .kage-nav-link, [data-cursor]');

      wrapper.classList.toggle('is-card', Boolean(isCard));
      wrapper.classList.toggle('is-action', !isCard && Boolean(isAction));
      wrapper.classList.toggle('is-subtle', !isCard && !isAction && Boolean(isSubtle));
    };

    const onMouseDown = () => {
      wrapper.classList.add('is-clicking');
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        wrapper.classList.remove('is-clicking');
      }, 620);
    };

    const onTouchStart = () => {
      wrapper.style.display = 'none';
      document.documentElement.classList.add('touch-device');
    };

    const onResize = () => {
      if (isTouch()) {
        wrapper.style.display = 'none';
        document.documentElement.classList.add('touch-device');
      } else {
        wrapper.style.display = 'block';
        document.documentElement.classList.remove('touch-device');
      }
    };

    function animate() {
      rafRef.current = null;
      const p = posRef.current;
      const c = currentRef.current;
      const dx = p.x - c.x;
      const dy = p.y - c.y;
      c.x += dx * 0.28;
      c.y += dy * 0.28;
      wrapper.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        c.x = p.x;
        c.y = p.y;
      }
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="dream-cursor" aria-hidden="true">
      <div className="dream-cursor__halo" />
      <div className="dream-cursor__core" />
      <div className="dream-cursor__ripple" />
    </div>
  );
}

export default CustomCursor;
