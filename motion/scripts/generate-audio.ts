import {mkdir, writeFile} from 'node:fs/promises';
import {createSoundDesign} from '../src/audio';
await mkdir('public/audio',{recursive:true});
await writeFile('public/audio/sound-design.wav',createSoundDesign());
console.log('Sound design original: public/audio/sound-design.wav (60 s, 48 kHz, PCM mono)');
