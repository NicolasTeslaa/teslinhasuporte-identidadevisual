import {mkdir,writeFile} from 'node:fs/promises';
import {createMusicBed} from '../src/music';
const samples=createMusicBed();
const wav=Buffer.alloc(44+samples.length*2);
wav.write('RIFF',0);wav.writeUInt32LE(wav.length-8,4);wav.write('WAVE',8);wav.write('fmt ',12);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(1,22);wav.writeUInt32LE(48000,24);wav.writeUInt32LE(96000,28);wav.writeUInt16LE(2,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(samples.length*2,40);
for(let i=0;i<samples.length;i++)wav.writeInt16LE(Math.round(samples[i]*32767),44+i*2);
await mkdir('public/audio',{recursive:true});await writeFile('public/audio/music-original-v01.wav',wav);
console.log('Trilha instrumental original, 60s, 96 BPM, sem samples externos.');
