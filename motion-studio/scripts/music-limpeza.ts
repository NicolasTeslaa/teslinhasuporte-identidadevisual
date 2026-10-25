import {writeFileSync} from 'node:fs';
import {generateMusic} from '../src/limpeza/music';
const samples=generateMusic(48000),pcm=new Int16Array(samples.length);
for(let i=0;i<samples.length;i++)pcm[i]=Math.round(samples[i]*32767);
const h=Buffer.alloc(44);h.write('RIFF');h.writeUInt32LE(36+pcm.byteLength,4);h.write('WAVE',8);h.write('fmt ',12);h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(1,22);h.writeUInt32LE(48000,24);h.writeUInt32LE(96000,28);h.writeUInt16LE(2,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(pcm.byteLength,40);
writeFileSync('public/limpeza/trilha.wav',Buffer.concat([h,Buffer.from(pcm.buffer)]));
