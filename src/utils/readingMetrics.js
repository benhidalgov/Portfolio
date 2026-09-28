/**
 * Utilidades minimalistas de métricas de lectura y rendimiento de carga.
 * Estilo Roshar / Minimalist UI (Ponytail: <40 líneas, cero dependencias).
 */

export function calculateReadingTime(text, wpm = 200) {
  if (!text || typeof text !== 'string') {
    return { words: 0, minutes: 0, text: '0 min de lectura' };
  }

  const clean = text.replace(/<[^>]*>/g, ' ').trim();
  const words = clean ? clean.split(/\s+/).filter(Boolean).length : 0;

  if (words === 0) {
    return { words: 0, minutes: 0, text: '0 min de lectura' };
  }

  const minutes = Math.ceil(words / wpm);
  const textLabel = words < wpm ? '< 1 min de lectura' : `${minutes} min de lectura`;

  return { words, minutes, text: textLabel };
}

export function getLoadingPerformance() {
  if (typeof performance === 'undefined' || typeof performance.getEntriesByType !== 'function') {
    return { loadTimeMs: 0, domReadyMs: 0, fcpMs: null, rating: 'Desconocida' };
  }

  const nav = performance.getEntriesByType('navigation')?.[0];
  if (!nav) {
    return { loadTimeMs: 0, domReadyMs: 0, fcpMs: null, rating: 'Desconocida' };
  }

  const loadTimeMs = Math.round(nav.loadEventEnd || 0);
  const domReadyMs = Math.round(nav.domContentLoadedEventEnd || 0);

  const paintEntries = performance.getEntriesByType('paint') || [];
  const fcpEntry = paintEntries.find((p) => p.name === 'first-contentful-paint');
  const fcpMs = fcpEntry ? Math.round(fcpEntry.startTime) : null;

  let rating = 'Desconocida';
  if (loadTimeMs > 0) {
    if (loadTimeMs < 1000) rating = 'Óptima';
    else if (loadTimeMs < 2500) rating = 'Aceptable';
    else rating = 'Lenta';
  }

  return { loadTimeMs, domReadyMs, fcpMs, rating };
}
