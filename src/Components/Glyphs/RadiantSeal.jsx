import React from 'react';

/**
 * Sello Heráldico Radiante — Logotipo oficial de Benjamín Hidalgo
 * Fusión de heráldica Alethi, alas de Corredor del Viento y monograma BH.
 */
export default function RadiantSeal({ size = 42, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`radiant-seal ${className}`}
      aria-label="Logo Benjamín Hidalgo - Sello Radiante"
      role="img"
    >
      <defs>
        {/* Resplandor de Luz Tormentosa */}
        <filter id="sealGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── 1. Rombo exterior sagrado (Geometría Alethi) */}
      <polygon
        points="50,3 97,50 50,97 3,50"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.04"
      />

      {/* ── 2. Marco interior concéntrico con muescas angulares */}
      <polygon
        points="50,9 91,50 50,91 9,50"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="4 3"
        strokeLinejoin="round"
        opacity="0.6"
      />

      {/* ── 3. Rayos cardinales de Luz Tormentosa */}
      <line x1="50" y1="0" x2="50" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="93" x2="50" y2="100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="50" x2="7" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="93" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* ── 4. Alas estilizadas de Corredor del Viento (Laterales) */}
      {/* Ala izquierda */}
      <path
        d="M 12 50 C 14 36, 22 26, 32 20 C 26 28, 24 38, 22 50 C 24 62, 26 72, 32 80 C 22 74, 14 64, 12 50 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M 16 50 C 18 39, 24 30, 30 25 M 16 50 C 18 61, 24 70, 30 75"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        opacity="0.5"
      />

      {/* Ala derecha */}
      <path
        d="M 88 50 C 86 36, 78 26, 68 20 C 74 28, 76 38, 78 50 C 76 62, 74 72, 68 80 C 78 74, 86 64, 88 50 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M 84 50 C 82 39, 76 30, 70 25 M 84 50 C 82 61, 76 70, 70 75"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        opacity="0.5"
      />

      {/* ── 5. Círculo orbital central (Mandala) */}
      <circle
        cx="50"
        cy="50"
        r="24"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <circle
        cx="50"
        cy="50"
        r="21.5"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="1.5 2"
        opacity="0.6"
      />

      {/* ── 6. Gema Corazón superior (Facetada) */}
      <polygon
        points="50,22 53.5,27 50,32 46.5,27"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.6"
      />

      {/* ── 7. Monograma Central BH (Tipografía Ceremonial Cinzel) */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="'Cinzel', 'Cinzel Decorative', serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="2.5px"
        fill="currentColor"
        filter="url(#sealGlow)"
        style={{ userSelect: 'none' }}
      >
        BH
      </text>

      {/* ── 8. Barra de honor y glifo inferior */}
      <line x1="38" y1="64" x2="62" y2="64" stroke="currentColor" strokeWidth="1" />
      <polygon points="50,62.5 52,64 50,65.5 48,64" fill="currentColor" />

      {/* Tríada de orbes inferiores */}
      <circle cx="44" cy="70" r="1.2" fill="currentColor" opacity="0.8" />
      <circle cx="50" cy="71.5" r="1.6" fill="currentColor" />
      <circle cx="56" cy="70" r="1.2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
