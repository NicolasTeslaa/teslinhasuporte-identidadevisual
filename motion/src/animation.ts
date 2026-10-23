import {interpolate, spring} from 'remotion';
import {progress} from './timeline';
export const ease = (frame: number, start = 0, duration = 30) => {
  const p = progress(frame, start, start + duration);
  return 1 - Math.pow(1 - p, 4);
};
export const enter = (frame: number, delay = 0) => spring({frame: frame - delay, fps: 30, config: {damping: 22, stiffness: 110, mass: 0.8}});
export function tilePosition(index: number, frame: number) {
  const p = ease(frame, 95, 50);
  const x0 = (index % 14) * 57;
  const y0 = Math.floor(index / 14) * 34;
  const group = index % 4;
  const within = Math.floor(index / 4);
  const x1 = (group % 2) * 430 + (within % 7) * 44;
  const y1 = Math.floor(group / 2) * 190 + Math.floor(within / 7) * 22;
  return {x: x0 + (x1 - x0) * p, y: y0 + (y1 - y0) * p};
}
export const completedNodes = (frame: number) => Math.max(0, Math.min(3, Math.floor((frame - 15) / 40)));
export const drift = (frame: number, seed: number, amount = 8) => Math.sin(frame / 45 + seed * 1.8) * amount;
export const fade = (frame: number, start: number, end: number) => interpolate(frame, [start, end], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
