import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
const cache=await import('../scripts/narration-cache').catch(()=>null);
const cli=await import('../scripts/verify-options').catch(()=>null);

test('montagem rejeita cache antigo mesmo quando não solicita nova síntese',async()=>{
  assert.ok(cache,'validação do cache na montagem ainda não implementada');
  const dir=await mkdtemp(join(tmpdir(),'teslinha-cache-'));
  try {
    const audio=join(dir,'cue.mp3');
    const expected={text:'Texto aprovado.',voice:'voz A',rate:'-3%',pitch:'-2Hz'};
    await writeFile(audio,Buffer.alloc(2048));
    await writeFile(join(dir,'cue.json'),JSON.stringify(expected));
    await assert.doesNotReject(()=>cache.requireNarrationClip(audio,expected));
    for(const [key,value] of [['text','Texto novo.'],['voice','voz B'],['rate','+10%'],['pitch','+2Hz']]) {
      await assert.rejects(()=>cache.requireNarrationClip(audio,{...expected,[key]:value}),/desatualizado/);
    }
    await rm(join(dir,'cue.json'));
    await assert.rejects(()=>cache.requireNarrationClip(audio,expected),/desatualizado/);
  } finally {await rm(dir,{recursive:true,force:true});}
});

test('flag isolada sem narração escolhe o vídeo anterior, não um caminho chamado flag',()=>{
  assert.ok(cli,'parser da verificação ainda não implementado');
  assert.deepEqual(cli.parseVerificationArgs(['--no-narration']),{narration:false,file:'../out/teslinha-commercial.mp4'});
  assert.deepEqual(cli.parseVerificationArgs([]),{narration:true,file:'../out/teslinha-commercial-narrado.mp4'});
  assert.deepEqual(cli.parseVerificationArgs(['other.mp4','--no-narration']),{narration:false,file:'other.mp4'});
  assert.throws(()=>cli.parseVerificationArgs(['--unknown']));
});
