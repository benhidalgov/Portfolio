import { useEffect } from 'react';

/**
 * Dispara el sistema global de reveals ([data-rv] -> .rv-in) definido en index.css.
 *
 * El Home (KageHome) tiene su propio observer porque además rastrea la sección
 * activa para el canvas. Este hook es la versión mínima para las páginas con
 * sidebar, que solo necesitan el reveal.
 *
 * Uso:
 *   useReveal();                  // observa todo [data-rv] del documento
 *   useReveal('.about-page');     // limita el alcance a un contenedor
 */
export function useReveal(scopeSelector) {
  useEffect(() => {
    const root = scopeSelector ? document.querySelector(scopeSelector) : document;
    if (!root) return;

    const els = root.querySelectorAll('[data-rv]');
    if (!els.length) return;

    // Sin soporte de IntersectionObserver, revelar de inmediato.
    // [data-rv] arranca en opacity:0, asi que un fallo no puede dejar el contenido invisible.
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('rv-in'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('rv-in');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    // Elementos ya visibles al montar: revelar sin esperar al observer.
    // Cubre el caso de contenido above-the-fold, que si no aparece tras un parpadeo.
    requestAnimationFrame(() => {
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('rv-in');
      });
    });

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [scopeSelector]);
}
