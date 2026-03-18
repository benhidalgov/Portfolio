// src/utils/sound.js

// Usa Web Audio API para generar un sonido "mecánico" sutil sin necesitar archivos .mp3 externos
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const playTerminalBip = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  // Configuración para el sonido NERV Terminal (onda cuadrada, corto, agudo)
  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Tono inicial
  oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.05); // Pequeño sweep agudo

  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime); // Volumen muy bajo (5%)
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1); // Decay rápido

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
};
