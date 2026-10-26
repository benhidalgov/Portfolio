// src/utils/sound.js
//
// Sonido de interfaz de las páginas internas. Apagado por defecto: es
// decorativo y suena en cada clic, así que se activa a mano desde el sidebar.
// Usa Web Audio API para generar un acorde cristalino arpegiado.

const KEY = 'sound';

let enabled = false;
try {
  enabled = localStorage.getItem(KEY) === 'on';
} catch {
  // storage bloqueado: se queda apagado
}

export const isSoundEnabled = () => enabled;

export const toggleSound = () => {
  enabled = !enabled;
  try {
    localStorage.setItem(KEY, enabled ? 'on' : 'off');
  } catch {
    // storage bloqueado: el cambio dura lo que dure la pestaña
  }
  return enabled;
};

// AudioContext se crea de forma lazy en el primer uso para evitar bloqueos del browser
let audioContext = null;
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

export const playTerminalBip = () => {
  if (!enabled) return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const now = ctx.currentTime;

  // Nodo de ganancia maestro para atenuar y desvanecer el acorde de forma global
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.04, now); // Volumen de salida bajo (4%)
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5); // Desvanecimiento suave en 500ms
  masterGain.connect(ctx.destination);

  // Notas armónicas cristalinas en acorde de Mi Mayor (E5, G#5, B5, E6)
  const frequencies = [659.25, 830.61, 987.77, 1318.51];

  frequencies.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'sine';
    // Arpegio ultra-rápido: cada nota entra con un delay de 25ms
    const startDelay = index * 0.025;
    osc.frequency.setValueAtTime(freq, now + startDelay);

    // Micro-vibrato al decaer
    osc.frequency.linearRampToValueAtTime(freq * 1.002, now + startDelay + 0.15);

    // Volumen decreciente según la frecuencia para evitar estridencia en agudos
    const volume = 0.5 - index * 0.1;
    oscGain.gain.setValueAtTime(volume, now + startDelay);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + startDelay + 0.4);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    osc.start(now + startDelay);
    osc.stop(now + 0.5);
  });
};
