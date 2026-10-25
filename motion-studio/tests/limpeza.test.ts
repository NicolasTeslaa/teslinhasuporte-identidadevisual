import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as timeline from '../src/limpeza/timeline';
import cues from '../src/limpeza/captions.json';
import voice from '../src/limpeza/voice-manifest.json';

test('a cena muda exatamente no corte, sem quadro vazio ou extra', () => {
  const sceneAt = (timeline as any).sceneAt;
  assert.equal(typeof sceneAt, 'function', 'seleção de cenas ainda não implementada');
  for (const [frame, expected] of [[0,0],[149,0],[150,1],[329,1],[330,2],[509,2],[510,3],[749,3],[750,4],[899,4],[900,-1],[-1,-1]]) {
    assert.equal(sceneAt(frame), expected);
  }
});

test('legenda aparece só durante a fala, inclusive no limite entre duas frases', () => {
  const captionAt = (timeline as any).captionAt;
  assert.equal(typeof captionAt, 'function', 'legendas temporizadas ainda não implementadas');
  const cues = [{start:1,end:2,text:'Primeira fala'},{start:2,end:3,text:'Segunda fala'}];
  assert.equal(captionAt(cues,0.9),'');
  assert.equal(captionAt(cues,1),'Primeira fala');
  assert.equal(captionAt(cues,2),'Segunda fala');
  assert.equal(captionAt(cues,3),'');
});

test('montagem rejeita locução que ultrapasse cena e legendas sobrepostas', () => {
  const validate = (timeline as any).validateCues;
  assert.equal(typeof validate, 'function', 'validação da montagem ainda não implementada');
  assert.throws(() => validate([{start:4,end:5.2,text:'Longa'}],0,5), /fora/);
  assert.throws(() => validate([{start:1,end:3,text:'A'},{start:2,end:4,text:'B'}],0,5), /sobrepo/);
  assert.throws(() => validate([{start:1,end:1,text:'A'}],0,5), /duração/);
  assert.doesNotThrow(() => validate([{start:0.2,end:4.8,text:'Fala válida'}],0,5));
});

test('limpeza remove poeira gradualmente e logística completa ida e volta', () => {
  const motion = (timeline as any).motionState;
  assert.equal(typeof motion,'function','estados animados ainda não implementados');
  assert.equal(motion(2,0).dust,1);
  assert.equal(motion(2,5).dust,0);
  assert.ok(motion(2,2).dust > motion(2,3).dust);
  assert.equal(motion(3,0).vehicle,0);
  assert.equal(motion(3,3).vehicle,1);
  assert.equal(motion(3,7.5).vehicle,0);
  assert.equal(motion(3,4).service,true);
});

test('cada fala final tem legendas sincronizadas que permanecem dentro da sua cena',()=>{
  for(const clip of voice){
    const matched=cues.filter(c=>c.start>=clip.start && c.start<clip.end);
    assert.ok(matched.length>0,`cena ${clip.scene} sem legenda`);
    timeline.validateCues(matched,clip.start,clip.end);
    assert.ok(matched[0].start-clip.start<.4,'legenda não deve atrasar o início da fala');
    assert.ok(clip.end-matched.at(-1)!.end<.6,'final da fala deve estar legendado');
    for(const cue of matched)assert.ok(cue.text.length<=70,'limite de leitura de duas linhas');
  }
});
