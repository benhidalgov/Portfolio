import { useEffect, useRef } from 'react';
import './CustomCursor.css';

function CustomCursor() {
  const wrapperRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const hoverStateRef = useRef(null); // null | 'action' | 'card' | 'subtle'
  const clickingRef = useRef(false);
  const clickTimeoutRef = useRef(null);
  const isTouchRef = useRef(false);

  useEffect(() => {
    // ── Check touch / mobile capabilities
    const checkIsTouch = () => {
      return (
        window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(hover: none)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth <= 768
      );
    };

    if (checkIsTouch()) {
      isTouchRef.current = true;
      return;
    }

    // Respeta la preferencia de movimiento reducido: el cursor sigue al puntero
    // con inercia y animaciones, y reemplaza el puntero nativo. Con movimiento
    // reducido se deja el cursor del sistema y no se monta nada.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isTouchRef.current = true;
      return;
    }

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const blade = wrapper.querySelector('.shardblade-cursor');
    const burstContainer = wrapper.querySelector('.stormlight-burst-container');
    const burstText = wrapper.querySelector('.stormlight-text');

    const RESOLVE_WORDS = ['JURAMENTO', 'RADIANTE', 'STORMLIGHT'];

    let hasMoved = false;

    // Position tracking — clamped to viewport to prevent layout shifts
    const onMouseMove = (e) => {
      posRef.current = {
        x: Math.max(0, Math.min(window.innerWidth, e.clientX)),
        y: Math.max(0, Math.min(window.innerHeight, e.clientY)),
      };

      if (!hasMoved) {
        hasMoved = true;
        currentRef.current = { ...posRef.current };
        wrapper.style.opacity = '1';
      }
    };

    // Responsive interaction sizing based on target element type & size
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !blade) return;

      const isCard = target.closest('.kh-card, .project-card-summary, .skill-category-card, .card');
      const isAction = target.closest('a, button, [role="button"], .kh-cta, .btn-primary, .kage-theme-btn, .mobile-nav-toggle');
      const isSubtle = target.closest('.kh-tag, .skill-tag, .kh-chip, .tech-tag, .kage-rail-btn, .kage-nav-link, [data-cursor]');

      let nextState = null;
      if (isCard) {
        nextState = 'card';
      } else if (isAction) {
        nextState = 'action';
      } else if (isSubtle) {
        nextState = 'subtle';
      }

      if (nextState !== hoverStateRef.current) {
        hoverStateRef.current = nextState;
        blade.classList.remove('hovering-action', 'hovering-card', 'hovering-subtle');
        if (nextState) {
          blade.classList.add(`hovering-${nextState}`);
        }
      }
    };

    const handleMouseDown = () => {
      clickingRef.current = true;
      if (blade) blade.classList.add('clicking');
      if (burstContainer) burstContainer.classList.add('active');
      if (burstText) burstText.textContent = RESOLVE_WORDS[Math.floor(Math.random() * RESOLVE_WORDS.length)];

      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => {
        clickingRef.current = false;
        if (blade) blade.classList.remove('clicking');
        if (burstContainer) burstContainer.classList.remove('active');
      }, 700);
    };

    // If a touch is registered, immediately disable custom cursor for mobile UX
    const onTouchStart = () => {
      isTouchRef.current = true;
      wrapper.style.display = 'none';
      document.documentElement.classList.add('touch-device');
    };

    // Handle window resize dynamically
    const onResize = () => {
      if (checkIsTouch()) {
        isTouchRef.current = true;
        wrapper.style.display = 'none';
        document.documentElement.classList.add('touch-device');
      } else {
        isTouchRef.current = false;
        wrapper.style.display = 'block';
        document.documentElement.classList.remove('touch-device');
      }
    };

    // Smooth RAF loop — zero React re-renders
    function animate() {
      const p = posRef.current;
      const c = currentRef.current;
      // Responsive lerp: fast enough to feel responsive, smooth enough to feel ethereal
      c.x += (p.x - c.x) * 0.24;
      c.y += (p.y - c.y) * 0.24;
      wrapper.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (isTouchRef.current) return null;

  return (
    <div
      ref={wrapperRef}
      className="gem-cursor-wrapper"
      aria-hidden="true"
    >
      {/* Responsive Shardblade SVG — tip at (2,2) matching pointer hotspot */}
      <svg
        className="shardblade-cursor"
        viewBox="0 0 32 38"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blade body: sweeping broadblade silhouette with guard */}
        <path
          className="blade-body"
          d="M 2 2
             C 7 4, 13 9, 18 16
             C 20 18, 22 20, 23 22
             L 27 20
             L 25 24
             L 22 24
             L 26 29
             L 24 31
             L 20 25
             L 18 28
             L 17 25
             C 13 19, 8 12, 4 6
             Z"
        />
        {/* Spine / fuller: glowing etched groove */}
        <path
          className="blade-spine"
          d="M 4 4 C 8 8, 12 14, 17 21"
        />
        {/* Edge highlight: razor-sharp cutting edge */}
        <path
          className="blade-edge"
          d="M 2 2 C 7 4, 13 9, 18 16 C 20 18, 22 20, 23 22"
        />
        {/* Inlaid glyph runes */}
        <circle cx="9" cy="8" r="0.7" className="rune-dot" />
        <circle cx="13" cy="13" r="0.7" className="rune-dot" />
        <circle cx="17" cy="18" r="0.7" className="rune-dot" />

        {/* Gemheart pommel: infused gemstone at the hilt */}
        <polygon
          points="25,28 28,31 25,34 22,31"
          className="gemheart-pommel"
        />
      </svg>

      {/* Click State: Stormlight Burst */}
      <div className="stormlight-burst-container">
        <div className="stormlight-ray r1"></div>
        <div className="stormlight-ray r2"></div>
        <div className="stormlight-ray r3"></div>
        <div className="stormlight-ray r4"></div>
        <span className="stormlight-text"></span>
      </div>
    </div>
  );
}

export default CustomCursor;
