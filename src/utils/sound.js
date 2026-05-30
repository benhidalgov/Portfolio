// src/utils/sound.js

// Usa Web Audio API para generar un acorde cristalino arpegiado — resonancia pura de Roshar
// AudioContext se crea de forma lazy en el primer uso para evitar bloqueos del browser
let audioContext = null;
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

export const playTerminalBip = () => {
  const audioContext = getAudioContext();
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const now = audioContext.currentTime;

  // Nodo de ganancia maestro para atenuar y desvanecer el acorde de forma global
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.04, now); // Volumen de salida bajo (4%)
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5); // Desvanecimiento suave en 500ms
  masterGain.connect(audioContext.destination);

  // Notas armónicas cristalinas en acorde de Mi Mayor (E5, G#5, B5, E6)
  const frequencies = [659.25, 830.61, 987.77, 1318.51];

  frequencies.forEach((freq, index) => {
    const osc = audioContext.createOscillator();
    const oscGain = audioContext.createGain();

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
