import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as music from '../src/limpeza/music';
test('trilha cabe em 30 segundos e inicia e termina sem corte audível',()=>{
 const generate=(music as any).generateMusic;
 assert.equal(typeof generate,'function','geração de trilha ainda ausente');
 const pcm:Float32Array=generate(48000);
 assert.equal(pcm.length,1440000);
 assert.ok(pcm.slice(48000,96000).some(x=>Math.abs(x)>.01));
 assert.ok(pcm.every(x=>Number.isFinite(x)&&Math.abs(x)<.4),'trilha deve reservar headroom para voz');
 assert.ok(Math.abs(pcm[0])<.001);
 assert.ok(Math.abs(pcm.at(-1)!)<.001);
});
