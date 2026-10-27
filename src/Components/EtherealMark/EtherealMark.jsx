import React from 'react';

/** Marca Etérea: un umbral/orbe, sin heráldica. */
export default function EtherealMark({ size = 38, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ethereal-mark ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="0.9" opacity="0.35" />
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="0.6" opacity="0.2" strokeDasharray="1.5 4" />
      <path
        d="M21 48 V30 A11 11 0 0 1 43 30 V48"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.06"
      />
      <circle cx="32" cy="35" r="5.2" fill="currentColor" fillOpacity="0.9" />
      <ellipse cx="32" cy="32" rx="20" ry="7.5" stroke="currentColor" strokeWidth="0.7" opacity="0.28" transform="rotate(-18 32 32)" />
      <path d="M32 2v5M32 57v5M2 32h5M57 32h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}
