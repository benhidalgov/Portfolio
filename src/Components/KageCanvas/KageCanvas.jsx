import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../Context/ThemeContext.jsx';
import './KageCanvas.css';

// Section camera & lighting settings
const SCENE_CONFIGS_DARK = [
  { cameraZ: 5.4, glyphOpacity: 0.35, glyphScale: 1.0, particleOpacity: 0.8 },
  { cameraZ: 4.8, glyphOpacity: 0.28, glyphScale: 0.95, particleOpacity: 0.65 },
  { cameraZ: 4.3, glyphOpacity: 0.25, glyphScale: 0.9, particleOpacity: 0.6 },
  { cameraZ: 3.8, glyphOpacity: 0.22, glyphScale: 0.85, particleOpacity: 0.55 },
  { cameraZ: 5.2, glyphOpacity: 0.42, glyphScale: 1.05, particleOpacity: 0.85 },
];

const SCENE_CONFIGS_LIGHT = [
  { cameraZ: 5.4, glyphOpacity: 0.45, glyphScale: 1.0, particleOpacity: 0.75 },
  { cameraZ: 4.8, glyphOpacity: 0.38, glyphScale: 0.95, particleOpacity: 0.60 },
  { cameraZ: 4.3, glyphOpacity: 0.35, glyphScale: 0.9, particleOpacity: 0.55 },
  { cameraZ: 3.8, glyphOpacity: 0.32, glyphScale: 0.85, particleOpacity: 0.50 },
  { cameraZ: 5.2, glyphOpacity: 0.50, glyphScale: 1.05, particleOpacity: 0.80 },
];

/**
 * Generates a high-res canvas texture of the Radiant Crest:
 * - Windrunner (Corredores del Viento) for Dark Theme
 * - Lightweaver (Tejedores de Luz) for Light Theme
 */
function createRadiantGlyphTexture(isLight = false) {
  const S = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, S, S);
  const cx = S / 2;
  const cy = S / 2;

  const ringColor = isLight ? 'rgba(140, 101, 10, 0.45)' : 'rgba(0, 212, 255, 0.45)';
  const dashedColor = isLight ? 'rgba(140, 101, 10, 0.25)' : 'rgba(0, 212, 255, 0.25)';
  const innerColor = isLight ? 'rgba(180, 130, 20, 0.4)' : 'rgba(102, 229, 255, 0.4)';
  const pointFill = isLight ? 'rgba(140, 101, 10, 0.75)' : 'rgba(0, 212, 255, 0.75)';
  const glyphFill = isLight ? 'rgba(140, 101, 10, 0.12)' : 'rgba(0, 212, 255, 0.08)';
  const strokeColor = isLight ? 'rgba(140, 101, 10, 0.92)' : 'rgba(102, 229, 255, 0.88)';
  const glowColor = isLight ? '#8c650a' : '#00d4ff';

  // 1. Concentric Alethi Mandala geometry (Outer sacred rings)
  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 390, 0, Math.PI * 2);
  ctx.stroke();

  // Dashed orbital ring
  ctx.setLineDash([8, 16]);
  ctx.strokeStyle = dashedColor;
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.arc(cx, cy, 350, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Inner ring
  ctx.strokeStyle = innerColor;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 270, 0, Math.PI * 2);
  ctx.stroke();

  // 8 Diamond Points
  for (let a = 0; a < 8; a++) {
    const angle = (a * Math.PI) / 4;
    const r = 390;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle + Math.PI / 4);
    ctx.fillStyle = pointFill;
    ctx.fillRect(-6, -6, 12, 12);
    ctx.restore();
  }

  // 2. Vector SVG Paths for each order
  ctx.save();

  if (!isLight) {
    // ── DARK: WINDRUNNER GLYPH (Corredores del Viento) ──
    // Viewbox ~470 x 560, scale and center
    const scale = 0.95;
    ctx.translate(cx - (470.7 * scale) / 2, cy - (561.5 * scale) / 2);
    ctx.scale(scale, scale);

    const windrunnerPaths = [
      "m 261.71338,0 c -6.99,25.05 -6.67,50.6 -3.26,76.17 4.38,33.89 13.42,65.68 12.54,100.14 -4.52,-1.75 -8.54,-3.54 -13.53,-2.49 -12.38,2.61 -18.73,20.22 -9.92,29.67 1.9,-0.73 3,-1.68 3.44,-3.73 0.79,-4.44 0.29,-9.18 0.32,-13.68 3.78,0.45 7.15,0.41 10.09,3.22 4.25,4.08 4.55,10.38 3.61,15.85 -0.64,3.13 -1.9,6.94 -4.46,9.02 -4.67,3.11 -11.16,3.74 -16.21,1.17 -4.11,-1.97 -7.38,-5.38 -10.69,-8.46 -3.44,3.3 -7.12,7.03 -11.6,8.85 -4.95,2.12 -11.07,1.29 -15.5,-1.67 -2.37,-2.13 -3.55,-5.79 -4.23,-8.82 -1.13,-5.31 -0.6,-11.81 3.5,-15.78 2.81,-2.83 6.49,-2.99 10.19,-3.72 -0.04,4.43 -0.54,9.12 0.22,13.48 0.33,1.97 1.6,3.12 2.81,4.57 1.89,-2.56 3.72,-4.85 4.34,-8.08 1,-5.19 -0.33,-10.85 -3.05,-15.33 -2.51,-3.85 -5.92,-7.17 -10.81,-7.21 -4.46,0.12 -8.84,1.88 -13.27,2.5 -1,-44.26 14.77,-88.92 13.95,-133.5 0.12,-14.28 -2.17,-28.26 -5.4,-42.12 4.83,3.87 10.42,7.73 14.29,12.58 4.11,5.08 5.45,12.27 6.19,18.59 1.32,10.17 0.2,20 -0.62,30.17 -3.74,32.94 -10.11,65.78 -15.55,98.48 5.8,0.38 12.44,0.69 17.83,3.01 2.8,1.16 4.64,3.21 6.66,5.36 4.47,-3.25 8.5,-6.37 13.97,-7.78 3.52,-0.98 6.84,-0.6 10.43,-0.38 -5.34,-28.82 -13.87,-57.83 -17.04,-86.88 -1.14,-8.54 -1.24,-17.4 -1.17,-26.03 0.15,-8.47 0.28,-16.43 3.25,-24.49 3.49,-9.27 10.88,-16.83 18.68,-22.68 z",
      "m 129.41338,91.28 c 21.78,36.67 31.38,79.41 29.61,121.89 -1.06,24.49 -6.04,49.67 -16.59,71.92 -3.52,7.6 -8.14,14.44 -12.8,21.38 0.28,-6.9 1.22,-13.4 0.34,-20.32 -1.6,-14.06 -7.78,-25.73 -11.87,-38.88 -1.79,-5.63 -2.62,-11.15 -2.62,-17.05 4.81,0.62 9.29,1.64 13.02,4.95 4.81,4.31 6.47,10.23 8.07,16.25 4.15,-15.13 6.54,-30.58 7.22,-46.25 0.41,-14.64 -0.41,-29.6 -4.25,-43.8 -4.21,-16.3 -10.85,-32.28 -11.72,-49.2 -0.47,-7.09 0.63,-13.91 1.59,-20.89 z",
      "m 342.27338,92.44 c -4.54,25.7 -11.1,51.68 -14.85,77.73 -4.19,28.33 -5.13,56.33 2.3,84.26 2.31,-6.06 3.75,-14.01 8.3,-18.76 3.73,-3.94 8.53,-4.85 13.71,-5.36 0.32,6.73 -0.3,13.39 -2.24,19.86 -3.31,11.18 -7.82,21.24 -9.62,32.98 -1.22,7.23 -0.93,14.36 -0.85,21.65 -6.29,-7.8 -11.86,-16.03 -15.9,-25.23 -10.5,-23.28 -14.31,-50.05 -14.87,-75.4 -0.17,-23.08 2.36,-46.92 9.16,-69.05 2.89,-9.4 6.74,-18.73 11.95,-27.1 3.62,-5.86 8.16,-10.63 12.91,-15.58 z",
      "m 112.40338,160.4 c -3.31,5.38 -6.51,10.25 -7.23,16.72 -1.94,15.28 7.86,31.24 5.43,46.07 -0.94,6.61 -4.85,11.48 -9.82,15.64 10.11,8.09 16.22,20.54 17.38,33.34 0.61,7.53 -0.7,15.21 -5.33,21.35 -2.27,3.08 -5.21,5.09 -8.29,7.26 -5.299995,-6.7 -9.419995,-15.44 -16.109995,-20.52 -4.54,-3.53 -9.95,-4.92 -15.63,-5.01 0.02,2.91 0.01,5.65 1.32,8.33 2.06,4.34 3.96,8.57 4.67,13.38 -5.81,-0.07 -11.13,-0.41 -15.83,-4.23 -5.94,-4.8 -7,-13.1 -3.61,-19.74 4.99,-10.2 17.76,-13.84 28.13,-10.59 6.24,2.02 10.18,6.53 15.469995,10.22 -0.46,-3.83 -1.06,-7.52 -2.999995,-10.92 -3.8,-6.94 -10.36,-11.64 -15.6,-17.39 -2.52,-2.68 -4.5,-5.71 -6.43,-8.82 2.65,-2.12 5.24,-3.92 7.04,-6.88 2.45,-4.14 3.1,-8.7 3.15,-13.44 0.1,-10.11 -2.02,-19.81 -1.15,-30.02 0.47,-6.82 3.19,-13.54 8.74,-17.78 5.049995,-3.94 10.679995,-5.25 16.699995,-6.97 z",
      "m 356.63338,160.39 c 1.15,0.32 2.31,0.65 3.47,0.99 4.78,1.38 9.26,2.85 13.24,5.97 4.13,3.18 6.81,7.8 8,12.84 3.04,13.8 -2.16,28.57 0.31,41.96 1.03,5.94 4.66,9.97 9.45,13.31 -5.28,10.33 -15.27,15.58 -21.32,25.06 -2.44,3.76 -3.19,7.92 -3.69,12.29 4.16,-3.23 8.11,-6.95 12.87,-9.2 6.74,-3.3 15.13,-3.06 21.78,0.35 6.19,3.12 10.46,9.35 10.96,16.27 0.23,5.81 -2.91,11.35 -8.01,14.13 -4.26,2.43 -8.62,2.47 -13.38,2.57 0.67,-4.78 2.55,-8.96 4.58,-13.27 1.36,-2.73 1.48,-5.46 1.34,-8.45 -5.92,0.16 -11.55,1.69 -16.18,5.49 -6.34,5.16 -10.4,13.57 -15.53,20.05 -3.75,-2.51 -7.22,-5.09 -9.55,-9.06 -4.37,-7.04 -4.77,-14.97 -3.67,-23 1.97,-11.59 7.72,-22.42 16.93,-29.84 -5.27,-4.44 -9.18,-9.73 -10.01,-16.78 -1.62,-14.2 7.13,-29.32 5.73,-43.94 -0.39,-5.44 -2.6,-10.24 -5.49,-14.77 -0.61,-1 -1.22,-1.98 -1.83,-2.97 z",
      "m 181.91338,169.57 c 2.68,-0.68 4.92,1.89 6.58,3.61 3.8,4.46 7.37,9.05 11.7,13.03 -1.49,4.26 -2.88,8.5 -3.49,13 -1.11,6.81 0.12,13.76 2.73,20.1 5.88,14.21 18.15,25.05 23.22,39.67 2.48,6.89 2.7,13.88 1.26,21.03 -8.57,-1.91 -16.44,-5.93 -25,-7.7 -4.54,-0.98 -8.97,-0.62 -13.55,-0.23 0.68,2.01 1.44,3.99 2.29,5.94 5.95,13.16 10.55,27.69 11.57,42.16 0.62,9.39 -0.38,19.23 -5.19,27.51 -3.28,5.73 -8.43,9.4 -13.56,13.32 1.46,-5.39 3.41,-10.26 4.06,-15.87 0.98,-8.33 -0.4,-16.48 -2.97,-24.4 -4.96,-15.35 -14.28,-29.96 -19.14,-45.4 -2.07,-6.72 -3.6,-14.1 -3.11,-21.16 0.34,-5.49 2.08,-11.16 3.36,-16.53 1.17,3.2 2.16,6.58 3.74,9.6 2.01,3.77 6.1,6.46 9.86,8.28 7.73,3.71 16.34,4.53 24.73,2.87 -5.03,-8.1 -10.23,-15.94 -13.91,-24.79 -8.16,-18.7 -11.69,-38.99 -8.09,-59.24 0.51,-1.91 0.56,-4.28 2.91,-4.8 z",
      "m 286.31338,169.54 c 1.53,0.13 2.29,1.7 2.61,3.02 3.69,16.91 1.63,34.81 -3.85,51.1 -4.09,12.52 -10.51,23.85 -17.87,34.72 10.83,2.21 22.83,0.11 31.42,-7.09 4.24,-3.55 5.12,-8.63 7,-13.6 2.25,8.14 4.24,15.99 3.16,24.53 -2.68,23.8 -19.85,44.13 -24.35,67.5 -0.85,4.75 -1.06,9.64 -0.69,14.45 0.36,5.76 2.63,11.41 4.22,17.03 -4.6,-3.77 -9.31,-6.81 -12.63,-11.87 -5.57,-8.36 -6.77,-18.33 -6.28,-28.16 0.95,-16.76 6.91,-33.7 14.2,-48.71 -3.92,-0.69 -7.81,-1.13 -11.79,-0.5 -9.47,1.42 -17.65,6.03 -27.12,8.04 -0.87,-6.1 -1.28,-12.08 0.44,-18.09 4.74,-18.09 21.89,-30.74 26.2,-48.96 2.39,-9.3 0.34,-17.92 -2.8,-26.71 4.09,-3.78 7.48,-8.12 11.04,-12.38 1.83,-1.96 4.04,-4.9 7.09,-4.32 z",
      "m 13.193385,226.87 c 0.82,6.56 0.48,13.04 1.8,19.54 1.89,10.79 5.85,21.12 12.31,30.02 8.83,12.45 21.99,21.22 35.95,26.98 18.18,7.49 38.719995,10.39 58.259995,11.15 9.86,0.08 19.87,0.43 29.67,-0.71 -1.88,-4.3 -4.12,-8.64 -5.4,-13.16 -0.9,-3.38 -1.03,-7.11 1.25,-9.99 2.62,-3.39 7.14,-4.17 11.02,-5.27 2.5,12.67 9.35,24.09 12.54,36.67 1.7,6.43 3.12,14.8 -0.02,20.96 -3.36,6.68 -11.19,9 -18.16,7.91 -1.49,-0.22 -2.13,-2 -2.95,-3.1 2.63,-2.63 6.58,-5.42 5.88,-9.67 -1.13,-4.92 -5.61,-8.89 -10.21,-10.62 -6.96,-2.71 -15.24,-2.95 -22.62,-2.96 -12.04,0.06 -23.699995,0.67 -35.799995,-0.24 -20.09,-1.97 -40.67,-7.71 -57.82,-18.59 -10.83,-6.89 -20.8200001,-16.28 -25.7400001,-28.37 -3.99999998,-9.6 -4.10999998,-20.41 -0.81,-30.23 2.41,-7.58 6.6,-13.71 10.8500001,-20.32 z",
      "m 457.22338,226.64 c 5.5,8.23 10.56,16.12 12.51,26.02 2.19,9.48 0.56,19.34 -3.73,27.98 -5.86,11.65 -16.07,20.32 -27.12,26.89 -16.66,9.77 -36.15,15.07 -55.3,16.85 -12.81,1 -26.31,0.12 -39.07,0.27 -6.63,0.12 -14.05,0.67 -20.17,3.39 -4.39,1.93 -8.64,6.23 -9.25,11.14 0.27,3.75 3.59,6.18 5.97,8.72 -0.48,0.96 -0.95,1.93 -1.43,2.9 -2.93,0.23 -6.01,0.43 -8.92,-0.02 -5.01,-1.02 -9.83,-4.57 -11.46,-9.54 -2.02,-5.99 -0.84,-12.91 0.69,-18.88 3.14,-12.64 10.18,-24.15 12.51,-36.9 5.13,1.29 10.79,2.35 12.6,8.12 1.67,6.67 -3.21,14.2 -5.58,20.29 10.61,1.09 21.39,0.82 32.04,0.62 22.98,-1.22 47.3,-5.28 67.55,-16.77 14.36,-8.08 26.12,-20.32 32.19,-35.78 4.66,-11.35 5.73,-23.16 5.97,-35.3 z",
      "m 194.53338,275.35 c 1.02,0.62 2.04,1.24 3.06,1.87 4.28,2.67 8.36,5.3 11.84,9.02 7.06,7.45 11.21,17.13 13.88,26.93 4.94,18.12 5.79,37.58 10.12,55.99 4.22,-21.69 5,-44.4 10.86,-66.25 2.23,-7.6 5.69,-15.9 12.5,-20.48 4.28,-2.99 8.93,-3.59 13.97,-4.32 -9.99,21.72 -15.04,44.51 -18.64,68.02 -10.27,70.49 -7.81,144.44 -15.99,215.44 -1.65,0.01 -3.3,0.01 -4.95,0.01 -6.93,-53.93 -7.71,-110.01 -12,-164.4 -2.56,-31.17 -6.21,-63.67 -14.71,-93.84 -2.51,-8.35 -4.81,-16.69 -8.51,-24.62 -0.48,-1.12 -0.96,-2.24 -1.43,-3.37 z",
      "m 40.053385,314.85 c 7.47,2.02 12.19,7.32 16.32,13.54 -3.39,3.4 -6.64,6.72 -11.91,6.05 -5.8,-1.09 -10.88,-5.02 -16.52,-6.92 -1.83,2.38 -3.51,4.44 -3.12,7.67 0.29,4.36 2.88,6.99 6.25,9.36 1.79,-1.4 3.6,-3.13 5.69,-4.05 2.52,-0.91 5.73,-0.22 8.35,0 -3.42,12.67 -3.1,26.4 -0.33,39.15 2.85,14.33 8.27,29.07 9.42,43.52 0.85,9.95 -0.94,19.98 -6.08,28.61 -4.34,7.47 -10.26,12.75 -16.38,18.66 2.61,-9.34 5.19,-18.48 5.35,-28.27 0.88,-28.48 -11.13,-52.58 -10.78,-81.16 -6.12,-1.22 -11.76,-2.72 -16.08,-7.56 -3.5600001,-4.11 -4.8400001,-9.99 -3.4500001,-15.24 2.17,-9.4 9.3000001,-17.75 18.0300001,-21.76 4.76,-2.29 10.1,-2.6 15.24,-1.6 z",
      "m 449.83338,318.9 c 7.04,4.8 12.81,12.67 14,21.22 0.75,5.55 -1.11,11.24 -5.37,14.94 -4.27,3.66 -9.25,4.88 -14.62,5.98 0.86,27.1 -11.7,53.04 -10.66,81.13 0.16,9.73 2.67,18.86 5.33,28.13 -6.77,-6.36 -13.19,-12.19 -17.52,-20.6 -5.2,-9.88 -6.01,-20.86 -4.33,-31.76 2.37,-16.74 9.63,-34.56 10.76,-51.78 0.87,-8.68 -0.19,-17.26 -2.28,-25.69 2.39,-0.2 4.96,-0.64 7.34,-0.28 2.46,0.52 4.63,2.78 6.53,4.31 3.62,-2.09 6.12,-4.98 6.43,-9.3 0.36,-3.14 -1.27,-5.18 -2.83,-7.66 -5.65,1.71 -10.49,5.42 -16.17,6.81 -5.63,1.04 -8.96,-2.4 -12.61,-5.99 3.12,-4.35 6.03,-8.43 10.79,-11.15 7.83,-4.76 17.88,-3.41 25.21,1.69 z",
      "m 86.913385,329.84 c 7.22,0.03 14.609995,1.88 21.589995,3.66 6.45,1.83 13.23,4.13 18.85,7.85 3.02,2.1 6.07,4.94 6.5,8.81 0.2,3.41 -2.32,6.46 -4.92,8.37 -4.17,3.05 -9.4,4.97 -14.11,7.06 2.27,-3.37 4.32,-6.82 5.93,-10.56 -5.65,-5.77 -15.97,-6.41 -23.539995,-8.03 -6.68,21.87 -8.31,46.49 -11.32,69.17 -0.63,4.13 -1.03,8.28 -1.48,12.43 -9.57,-12.86 -11.33,-27.84 -11.07,-43.44 0.69,-15.54 3.36,-31.47 8.99,-46.02 1.31,-3.14 2.56,-6.54 4.58,-9.3 z",
      "m 382.89338,329.58 c 2.86,5.24 5.16,10.63 6.9,16.34 4.41,14.28 6.68,29.29 6.59,44.25 -0.16,8.61 -1.14,17.66 -4.13,25.79 -1.66,4.62 -4.21,8.56 -6.83,12.68 -0.79,-7.43 -2.03,-14.8 -2.76,-22.24 -2.46,-20.25 -4.29,-39.66 -10.06,-59.35 -6.23,1.02 -12.77,2.06 -18.64,4.44 -1.93,0.93 -4.58,2.07 -4.37,4.64 1.09,3.38 3.47,6.4 5.21,9.48 -5.53,-2.66 -12.95,-5.01 -16.88,-9.88 -2.21,-2.64 -2.66,-6.04 -0.86,-9.05 2.51,-4.22 7.66,-7.01 12.02,-8.94 10.63,-4.59 22.33,-7.05 33.81,-8.16 z"
    ];

    windrunnerPaths.forEach(d => {
      const p = new Path2D(d);
      ctx.fillStyle = glyphFill;
      ctx.fill(p);
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 14;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3.0;
      ctx.stroke(p);
    });

    // Central Gem Core
    ctx.beginPath();
    ctx.moveTo(235, 250);
    ctx.lineTo(250, 270);
    ctx.lineTo(235, 290);
    ctx.lineTo(220, 270);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ffffff';
    ctx.fill();

  } else {
    // ── LIGHT: LIGHTWEAVER GLYPH (Tejedores de Luz) ──
    // Viewbox ~512 x 542, scale and center
    const scale = 0.98;
    ctx.translate(cx - (511.88 * scale) / 2, cy - (541.83 * scale) / 2);
    ctx.scale(scale, scale);

    const lightweaverPath = new Path2D(
      "m 302.38595,0 c -3.04,3.21 -3.94906,5.92984 -4.03906,10.33984 -0.12,36.75 0.36906,73.25883 -0.21094,110.04883 0.45,35.82 2.97008,70.95977 10.83008,106.00977 1.7,8.27 3.78953,16.31054 7.76953,23.81054 14.32,-7.25 23.83125,-18.08976 35.53125,-28.75976 27.2,-25.18 52.3593,-52.19071 69.7793,-85.2207 19.37,23.50999 31.6007,52.75132 37.9707,82.36132 -31.4,16.09 -64.50039,28.07891 -98.65039,36.87891 -1.43,0.34 -2.87984,0.58961 -4.33984,0.84961 5.74,-6.74 13.16953,-9.82891 18.26953,-16.87891 1.77,-2.38 2.65102,-5.03054 3.54101,-7.81054 -25.65,9.4 -50.42109,24.00086 -67.62109,45.63085 18.4,1.42001 37.25047,-0.95039 54.98047,-5.90039 27.24,-7.5 53.44055,-21.22117 80.81055,-27.70117 -2.33,8.46 -6.4011,16.05039 -11.1211,23.40039 -7.45,11.53 -16.44031,22.35 -23.57031,34 -16.04,-1.73 -31.94914,-3.21976 -48.11914,-3.25976 -18.76,-0.31 -37.33078,0.5307 -55.80078,3.9707 -3.92,0.81 -7.76828,1.81867 -11.73828,2.38867 0.41,-1.34 0.82976,-2.66976 1.25976,-4.00976 4.27,-2.14 8.74914,-2.40852 13.36914,-3.22852 -9.45,-25.21 -5.67961,-55.90125 -14.09961,-81.78125 -1.7,1.21 -3.36117,2.08133 -4.20117,4.11133 -2.31,4.97 -1.17867,11.72914 -1.38867,17.11914 -0.5,16.43 1.11891,32.80039 4.37891,48.90039 -4.74,4.42 -9.58024,7.63008 -11.74024,14.08008 -2.54,7.66 -2.76976,16.1589 -3.75976,24.12891 -0.85,-11.42001 -3.02844,-22.79985 -4.89844,-34.08985 -6.26,-35.46 -13.94125,-70.01945 -17.28125,-105.93945 -0.73,-6.09 -0.74039,-12.19953 -1.65039,-18.26953 -2.27,1.2 -1.56016,2.98945 -1.91016,5.18945 -3.37,52.5 -16.46961,99.74063 -23.59961,152.39062 -0.64,-7.94999 -0.88008,-17.09007 -3.83007,-24.58007 -2.20001,-5.64 -7.37899,-8.9 -11.45899,-13.25 3.87,-16.46 4.95008,-33.69055 4.58008,-50.56055 -0.07,-4.69 0.63898,-10.52086 -1.29102,-14.88086 -0.87,-2.1 -2.54953,-3.07867 -4.26953,-4.38867 -4.37,13 -5.46898,27.6793 -6.70898,41.2793 -1.55,14 -2.36024,27.18929 -7.49024,40.52929 3.95,0.84 8.58852,0.92024 12.22852,2.74024 1.97,1.05 1.79055,2.7914 2.31055,4.6914 -20.69,-5.22 -41.72977,-6.76031 -63.00977,-6.57031 -17.58,-0.12 -35.06977,1.33031 -52.509769,3.32031 -8.11,-13.27 -18.58046,-25.35047 -26.48046,-38.73047 -3.48,-5.89 -6.39071,-12.10093 -8.22071,-18.71093 27.49,6.62 52.240709,19.62039 79.720709,27.40039 18.05,5.14 37.32031,7.70992 56.07031,6.16992 -17.33,-21.65 -41.85961,-36.08984 -67.59961,-45.58984 0.99,3.12 1.98891,6.11039 4.12891,8.65039 5.17,6.57 12.61085,9.88929 17.88085,16.27929 -35.61,-8.63 -70.210929,-21.25875 -102.960929,-37.71875 0.79,-6.67 2.96054,-13.24164 4.81054,-19.68164 6.96,-22.54 17.79024,-44.78922 32.99024,-62.94922 18.269999,35.23 46.109839,63.69 75.089839,90.25 9.48,9.07 18.28094,17.85977 30.21094,23.75977 3.15,-6.29 5.32883,-12.93055 6.79883,-19.81055 5.16,-22.38 8.45023,-45.15836 9.99023,-68.06836 2.06,-23.32 1.6893,-46.5907 1.5293,-69.9707 -0.12,-27.02 0.0716,-54.01906 0.10156,-81.03906 -0.12,-3.97 -0.6,-8.86047 -4.5,-10.98047 -3.07,20.18 -4.50125,40.61953 -4.78125,61.01953 0.11,5.68 -0.58953,11.32 -0.51953,17 -0.21,31.24 0.11914,61.82047 -2.88086,92.98047 -2,19.07 -5.43898,39.46953 -13.45898,57.01953 -31.48,-22.3 -56.13922,-51.62945 -75.69922,-84.68945 -5.72,-9.81 -11.21164,-19.80086 -15.931639,-30.13086 -4.91,-11.72 -8.73977,-24.43969 -9.50977,-37.17969 -0.67,-8.24 -1.59883,-16.01055 -6.29883,-23.06055 -5.26,10.66 -6.93007,23.30032 -6.58008,35.07032 0.01,7.82 1.56001,15.50984 4.25,22.83984 -22.43,27.91 -38.61101,63.02 -54.04101,95.25 -3.02,-1.21 -5.2893,-2.79992 -7.5293,-5.16992 -6.6099996,-6.86 -9.8796796,-16.28922 -15.42968964,-23.94922 -2.54999996,11.25 1.04993004,23.07875 6.41993004,32.96875 8.1199996,14.85 20.8694496,28.32078 31.1894496,41.80078 13.18,17.19 27.43086,34.65008 38.38086,53.33008 -5.66,0.96 -11.56047,2.58031 -15.48047,7.07031 -2.65,3.03 -3.41969,6.61875 -4.17969,10.46875 7.92,0.32 13.99993,-3.21828 21.16992,-5.73828 4.67001,-1.62 9.53899,-1.82055 13.70899,1.18945 7.3,5.07 13.330229,12.25961 19.240229,18.84961 10.58,12.08 23.5111,22.16992 33.8711,34.41992 -6.81,4.06 -12.71094,9.07969 -16.46094,16.17969 -2.07,4.01 -2.94969,8.53141 -1.67969,12.94141 0.84,2.75 2.48039,4.76883 4.15039,7.04883 7.8,-3.9 10.47922,-10.69008 14.94922,-17.58008 2.76,-4.21 6.53031,-8.79063 12.07031,-8.64063 3.9,-0.23 6.80977,1.70094 9.75977,3.96094 7.99,6.43 14.83039,16.09961 23.65039,21.34961 3.16,2.01 6.62055,2.72055 10.31055,3.06055 -0.54,-5.7 -2.14078,-11.10938 -5.80078,-15.60938 -6.69,-8.26 -15.48008,-11.74101 -23.58008,-19.29101 12.19,-4.07 22.75914,-10.47907 34.11914,-16.28907 6.46,-3.22 12.87023,-6.16078 19.99023,-7.55078 -3.37,9.03 -5.08875,19.34992 -3.46875,28.91992 1.03,5.73 3.35891,11.48055 8.37891,14.81055 2.85,1.94 5.91094,2.36031 9.21094,3.07031 2.38,-16.07 2.22859,-32.55093 3.80859,-48.71093 0.34,-3.79 1.81008,-7.06071 3.83008,-10.22071 0.71,16.8 0.15148,34.34172 -3.72852,50.76172 -2.9,11.83 -7.79062,23.02867 -16.64062,31.63867 2.84,8.44 7.22031,15.62961 4.32031,24.84961 -2.12,-7.23 -4.41133,-13.83984 -10.11133,-19.08984 -3.64,-3.44 -8.08984,-5.37 -12.83984,-6.75 13.66,36.84 20.23078,73.41984 30.30078,111.33984 1,3.52 1.39937,6.87188 3.60938,9.92188 2.38999,-6.7 2.18093,-14.53032 2.96093,-21.57032 1.22,-18.57999 1.1893,-37.29992 1.7793,-55.91992 0.68,-7.67 0.37047,-15.26109 1.73047,-22.87109 1.96,5.82 4.03906,11.61008 6.28906,17.33008 2.07,-5.77 4.03109,-11.52922 6.37109,-17.19922 3.24,32.99 0.60055,67.05945 5.56055,99.68945 1.32,-0.32 2.15953,-1.28086 2.51953,-2.88086 10.78,-38.63 17.89992,-80.43929 32.16992,-117.77929 -5.93,1.44 -11.24968,4.33031 -15.17968,9.07031 -4.14,4.86 -6.41961,10.71969 -7.59961,16.92969 -3.27,-9.06 1.03945,-16.76954 4.18945,-25.01954 -10.06,-9.54 -15.09953,-22.88093 -17.76953,-36.21093 -3.07,-15.33 -3.19094,-30.64899 -2.71094,-46.20899 1.96,3.14 3.49985,6.40063 3.83985,10.14063 1.23,16.24 1.78101,32.49945 3.54101,48.68945 3.75,-0.64 7.18875,-1.08961 10.21875,-3.59961 5.1,-4.02 7.05016,-9.85031 7.91016,-16.07031 1.18,-9 -0.68977,-18.60008 -3.75977,-27.08008 12.01,2.45 23.77086,9.69883 34.63086,15.29883 6.29,3.36 12.73922,6.19133 19.44922,8.61133 -7.28,6.77 -16.7307,11.11851 -22.9707,18.47851 -3.99,4.64 -5.95852,10.30086 -6.22852,16.38086 3.69,-0.4 7.20867,-1.2107 10.38867,-3.2207 7.05,-4.31 12.98086,-11.37891 18.88086,-17.12891 2.8,-2.69 5.98985,-5.7 9.58985,-7.25 4.32,-1.65 9.19976,-0.78047 12.50976,2.51953 7.25,7.09 9.32063,18.59086 19.39063,22.88086 2.98,-4.15 5.35945,-8.17148 4.43945,-13.52148 -1.88,-10.15 -10.22016,-17.57969 -18.66016,-22.67969 9.2,-10.92 20.01008,-19.45031 29.83008,-29.82031 6.16,-6.79 12.16,-13.94859 19,-20.0586 3.41,-2.89 6.83008,-5.7614 11.58008,-5.6914 7.77,0.14 15.03945,5.81062 22.93945,6.64062 1.57,0.13 3.15024,0.21977 4.74024,0.25977 -0.84,-3.98 -1.62953,-7.65875 -4.51953,-10.71875 -4.11,-4.43 -9.41086,-5.73078 -15.13086,-6.80078 11.04,-19.11 25.54164,-36.58914 38.93164,-54.11914 11.5,-15.03 26.69945,-30.55086 33.93945,-48.13086 3.53,-8.26 4.48055,-16.32047 3.31055,-25.23047 -2.92,2.39 -4.06188,5.50969 -5.92188,8.67969 -4.35,7.89 -8.6382,15.9307 -17.1582,19.9707 -15.72,-32.53 -31.47039,-67.06063 -54.15039,-95.39062 4.14,-11.17 5.00953,-23.05985 3.76953,-34.83985 -0.63,-7.96 -2.67953,-15.76953 -6.01953,-23.01953 -5.34,7.48 -5.84125,16.14 -6.53125,25 -1.53,15.71 -6.80899,31.18984 -14.20899,45.08984 -16.01,31.36 -36.29007,60.67079 -62.08007,84.80078 -7.85,7.15 -16.07039,14.1486 -24.90039,20.0586 -9.14,-21.26 -12.09915,-43.03844 -14.11915,-65.89844 -2.51999,-36.74 -1.74117,-74.21984 -2.70117,-111.08984 -1.01,-17.03 -1.64,-34.58008 -5,-51.33008 z"
    );

    ctx.fillStyle = glyphFill;
    ctx.fill(lightweaverPath);
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 14;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.8;
    ctx.stroke(lightweaverPath);
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function KageCanvas({ activeSection = 0 }) {
  const { theme } = useTheme();
  const isLight = theme === 'LIGHT';

  const canvasRef = useRef(null);
  const stateRef = useRef({
    scene: null, camera: null, renderer: null,
    particles: null,
    glyphPlane: null,
    glyphMat: null,
    skyMat: null,
    particleMat: null,
    rafId: null,
    mouse: { x: 0, y: 0 },
    targetSection: 0,
    time: 0,
    isLight: false,
  });

  useEffect(() => {
    stateRef.current.isLight = isLight;
  }, [isLight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const s = stateRef.current;
    const currentIsLight = theme === 'LIGHT';

    // — Scene setup
    s.scene = new THREE.Scene();
    const clearColorHex = currentIsLight ? 0xeae6df : 0x0a0e1a;
    s.scene.fog = new THREE.FogExp2(clearColorHex, 0.035);

    s.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    s.camera.position.z = 5.4;

    s.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    s.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    s.renderer.setSize(window.innerWidth, window.innerHeight);
    s.renderer.setClearColor(clearColorHex, 1);

    // — 1. DEEP SKY GRADIENT PLANE
    const skyGeo = new THREE.PlaneGeometry(32, 22);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: { 
        uTime: { value: 0 },
        uIsLight: { value: currentIsLight ? 1.0 : 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uIsLight;
        void main() {
          vec2 p = vUv - 0.5;
          float dist = length(p);

          // Dark mode gradient (Deep sky & stormlight cyan)
          vec3 darkBase = vec3(0.039, 0.055, 0.102);
          vec3 darkGlow = vec3(0.0, 0.38, 0.58);
          vec3 darkAbyss = vec3(0.02, 0.03, 0.06);

          // Light mode gradient (Rosharan parchment & warm bronze radiance)
          vec3 lightBase = vec3(0.918, 0.902, 0.875);
          vec3 lightGlow = vec3(0.95, 0.85, 0.65);
          vec3 lightEdge = vec3(0.85, 0.82, 0.78);

          float wave = sin(p.x * 2.0 + uTime * 0.15) * 0.08 + cos(p.y * 2.0 + uTime * 0.12) * 0.08;
          float glow = smoothstep(0.75, 0.0, dist + wave) * 0.18;

          vec3 darkCol = mix(darkBase, darkGlow, glow);
          darkCol = mix(darkAbyss, darkCol, smoothstep(1.0, 0.25, dist));

          vec3 lightCol = mix(lightBase, lightGlow, glow * 1.5);
          lightCol = mix(lightEdge, lightCol, smoothstep(1.0, 0.25, dist));

          vec3 finalCol = mix(darkCol, lightCol, uIsLight);
          gl_FragColor = vec4(finalCol, 1.0);
        }
      `,
      depthWrite: false,
    });
    s.skyMat = skyMat;
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.position.z = -10;
    s.scene.add(skyMesh);

    // — 2. 3D HOLOGRAPHIC RADIANT GLYPH CREST
    const glyphTexture = createRadiantGlyphTexture(currentIsLight);
    const glyphGeo = new THREE.PlaneGeometry(6.4, 6.4);

    const glyphMat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: glyphTexture },
        uTime: { value: 0 },
        uOpacity: { value: currentIsLight ? 0.45 : 0.35 },
        uIsLight: { value: currentIsLight ? 1.0 : 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uOpacity;
        uniform float uIsLight;
        varying vec2 vUv;

        void main() {
          vec4 texColor = texture2D(uTexture, vUv);
          if (texColor.a < 0.01) discard;

          float scanline = sin(vUv.y * 180.0 - uTime * 3.5) * 0.08 + 0.92;
          float energyWave = sin(vUv.y * 4.0 - uTime * 1.8) * 0.15 + 0.85;

          vec3 holoColor = texColor.rgb;
          float finalAlpha = texColor.a * scanline * energyWave * uOpacity;
          gl_FragColor = vec4(holoColor, finalAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: currentIsLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    s.glyphMat = glyphMat;

    const glyphPlane = new THREE.Mesh(glyphGeo, glyphMat);
    glyphPlane.position.set(0, 0.2, -2.5);
    s.scene.add(glyphPlane);
    s.glyphPlane = glyphPlane;

    // — 3. STORMLIGHT DUST PARTICLES
    const COUNT = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const baseColor = new THREE.Color(currentIsLight ? 0x8c650a : 0x00d4ff);
    for (let i = 0; i < COUNT; i++) {
      const r = 3.5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 0.8 + Math.random() * 2.0;

      const hsl = {};
      baseColor.getHSL(hsl);
      const c = new THREE.Color().setHSL(
        hsl.h + (Math.random() - 0.5) * 0.08,
        hsl.s * (0.8 + Math.random() * 0.2),
        hsl.l * (currentIsLight ? (0.35 + Math.random() * 0.3) : (0.5 + Math.random() * 0.4))
      );
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.8 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vColor = color;
          float dist = length(position);
          vAlpha = smoothstep(14.0, 2.5, dist);
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (110.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.15, d);
          gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: currentIsLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      vertexColors: true,
    });
    s.particleMat = particleMat;

    s.particles = new THREE.Points(geometry, particleMat);
    s.scene.add(s.particles);

    // — Ambient light
    s.scene.add(new THREE.AmbientLight(clearColorHex, 0.8));

    // — Mouse parallax
    const handleMouse = (e) => {
      s.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      s.mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);

    // — Resize
    const handleResize = () => {
      s.camera.aspect = window.innerWidth / window.innerHeight;
      s.camera.updateProjectionMatrix();
      s.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // — Animation loop
    let lastTime = 0;
    function animate(ts) {
      s.rafId = requestAnimationFrame(animate);
      const dt = Math.min((ts - lastTime) / 1000, 0.05);
      lastTime = ts;
      s.time += dt;

      const t = s.time;
      particleMat.uniforms.uTime.value = t;
      skyMat.uniforms.uTime.value = t;
      glyphMat.uniforms.uTime.value = t;

      if (s.particles) {
        s.particles.rotation.y = t * 0.012;
        s.particles.rotation.x = Math.sin(t * 0.006) * 0.04;
      }

      const activeConfigs = s.isLight ? SCENE_CONFIGS_LIGHT : SCENE_CONFIGS_DARK;
      const cfg = activeConfigs[Math.min(s.targetSection, activeConfigs.length - 1)];
      const targetZ = cfg.cameraZ;
      s.camera.position.z += (targetZ - s.camera.position.z) * 0.035;
      s.camera.position.x += (s.mouse.x * 0.35 - s.camera.position.x) * 0.04;
      s.camera.position.y += (s.mouse.y * 0.22 - s.camera.position.y) * 0.04;

      if (s.glyphPlane) {
        s.glyphPlane.rotation.y = Math.sin(t * 0.3) * 0.08 + (s.mouse.x * 0.06);
        s.glyphPlane.rotation.x = Math.cos(t * 0.25) * 0.05 - (s.mouse.y * 0.05);
        s.glyphPlane.rotation.z = Math.sin(t * 0.15) * 0.02;

        const targetScale = cfg.glyphScale || 1.0;
        s.glyphPlane.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.04);

        const pulse = Math.sin(t * 1.6) * 0.05 + 0.95;
        glyphMat.uniforms.uOpacity.value +=
          ((cfg.glyphOpacity * pulse) - glyphMat.uniforms.uOpacity.value) * 0.04;
      }

      particleMat.uniforms.uOpacity.value +=
        (cfg.particleOpacity - particleMat.uniforms.uOpacity.value) * 0.04;

      s.renderer.render(s.scene, s.camera);
    }
    animate(0);

    return () => {
      cancelAnimationFrame(s.rafId);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      particleMat.dispose();
      glyphGeo.dispose();
      glyphMat.dispose();
      glyphTexture.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      s.renderer.dispose();
    };
  }, [theme]);

  // Update active section
  useEffect(() => {
    stateRef.current.targetSection = activeSection;
  }, [activeSection]);

  return <canvas ref={canvasRef} id="kage-gl" aria-hidden="true" />;
}
