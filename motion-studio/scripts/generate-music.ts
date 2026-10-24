import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const sampleRate = 48000; const seconds = 24; const samples = sampleRate * seconds;
const frequency = (note: number) => 440 * 2 ** ((note - 69) / 12);
const chords = [[48, 55, 59, 64], [45, 52, 55, 60], [41, 48, 52, 57], [43, 50, 55, 60]];
const pcm = new Int16Array(samples);
for (let i = 0; i < samples; i++) {
  const t = i / sampleRate; const chord = chords[Math.floor(t / 6) % chords.length]; let value = 0;
  for (const note of chord) value += Math.sin(2 * Math.PI * frequency(note) * t) * 0.018;
  const pulse = t % 1.25; value += Math.sin(2 * Math.PI * 72 * pulse) * Math.exp(-pulse * 8) * 0.014;
  const fade = Math.min(1, t / 1.2) * Math.min(1, (seconds - t) / 1.5);
  const duck = (t % 6 < 4.8) ? 0.72 : 0.95;
  pcm[i] = Math.max(-32768, Math.min(32767, Math.round(value * fade * duck * 32767)));
}
const header = Buffer.alloc(44); header.write('RIFF', 0); header.writeUInt32LE(36 + pcm.byteLength, 4); header.write('WAVE', 8); header.write('fmt ', 12); header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(1, 22); header.writeUInt32LE(sampleRate, 24); header.writeUInt32LE(sampleRate * 2, 28); header.writeUInt16LE(2, 32); header.writeUInt16LE(16, 34); header.write('data', 36); header.writeUInt32LE(pcm.byteLength, 40);
mkdirSync(join(process.cwd(), 'public/audio'), { recursive: true }); writeFileSync(join(process.cwd(), 'public/audio/verval-music.wav'), Buffer.concat([header, Buffer.from(pcm.buffer)]));
