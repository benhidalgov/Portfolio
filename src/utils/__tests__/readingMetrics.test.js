import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateReadingTime, getLoadingPerformance } from '../readingMetrics.js';

describe('calculateReadingTime', () => {
  it('returns 0 words and default label for empty or falsy inputs', () => {
    expect(calculateReadingTime('')).toEqual({
      words: 0,
      minutes: 0,
      text: '0 min de lectura',
    });
    expect(calculateReadingTime(null)).toEqual({
      words: 0,
      minutes: 0,
      text: '0 min de lectura',
    });
    expect(calculateReadingTime('   ')).toEqual({
      words: 0,
      minutes: 0,
      text: '0 min de lectura',
    });
  });

  it('calculates < 1 min de lectura for texts shorter than 200 words', () => {
    const text = 'Vida antes que muerte. Fuerza antes que debilidad. Viaje antes que destino.';
    const result = calculateReadingTime(text);

    expect(result.words).toBe(12);
    expect(result.minutes).toBe(1);
    expect(result.text).toBe('< 1 min de lectura');
  });

  it('calculates rounded minutes for longer texts (200 words per minute)', () => {
    // Generate 450 words
    const wordsArray = Array(450).fill('palabra');
    const text = wordsArray.join(' ');
    const result = calculateReadingTime(text);

    expect(result.words).toBe(450);
    // 450 / 200 = 2.25 -> Math.ceil gives 3 minutes
    expect(result.minutes).toBe(3);
    expect(result.text).toBe('3 min de lectura');
  });

  it('strips HTML tags before counting words', () => {
    const htmlText = '<article><h2>Urithiru</h2><p>La torre <strong>ciudad</strong> de Roshar.</p></article>';
    const result = calculateReadingTime(htmlText);

    expect(result.words).toBe(6); // Urithiru, La, torre, ciudad, de, Roshar
    expect(result.minutes).toBe(1);
    expect(result.text).toBe('< 1 min de lectura');
  });
});

describe('getLoadingPerformance', () => {
  const originalPerformance = globalThis.performance;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.performance = originalPerformance;
  });

  it('returns safe fallback object when performance API is unavailable', () => {
    // @ts-ignore
    globalThis.performance = undefined;

    const metrics = getLoadingPerformance();
    expect(metrics).toEqual({
      loadTimeMs: 0,
      domReadyMs: 0,
      fcpMs: null,
      rating: 'Desconocida',
    });
  });

  it('extracts metrics from Navigation Timing API and rates "Óptima" when load time is under 1000ms', () => {
    const mockNavEntry = {
      loadEventEnd: 850.4,
      domContentLoadedEventEnd: 320.1,
      startTime: 0,
    };

    const mockPaintEntry = {
      name: 'first-contentful-paint',
      startTime: 210.5,
    };

    globalThis.performance = {
      getEntriesByType: vi.fn((type) => {
        if (type === 'navigation') return [mockNavEntry];
        if (type === 'paint') return [mockPaintEntry];
        return [];
      }),
    };

    const metrics = getLoadingPerformance();

    expect(metrics.loadTimeMs).toBe(850);
    expect(metrics.domReadyMs).toBe(320);
    expect(metrics.fcpMs).toBe(211);
    expect(metrics.rating).toBe('Óptima');
  });

  it('rates "Aceptable" for load times between 1000ms and 2500ms', () => {
    globalThis.performance = {
      getEntriesByType: vi.fn((type) => {
        if (type === 'navigation') return [{
          loadEventEnd: 1800,
          domContentLoadedEventEnd: 900,
          startTime: 0,
        }];
        return [];
      }),
    };

    const metrics = getLoadingPerformance();
    expect(metrics.loadTimeMs).toBe(1800);
    expect(metrics.fcpMs).toBeNull();
    expect(metrics.rating).toBe('Aceptable');
  });

  it('rates "Lenta" for load times greater than or equal to 2500ms', () => {
    globalThis.performance = {
      getEntriesByType: vi.fn((type) => {
        if (type === 'navigation') return [{
          loadEventEnd: 3200,
          domContentLoadedEventEnd: 1500,
          startTime: 0,
        }];
        return [];
      }),
    };

    const metrics = getLoadingPerformance();
    expect(metrics.loadTimeMs).toBe(3200);
    expect(metrics.rating).toBe('Lenta');
  });
});
