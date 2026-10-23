import test from 'node:test';
import assert from 'node:assert/strict';
const voice = await import('../src/narration').catch(()=>null);

test('encaixa falas nas janelas de animação sem acelerar além do limite natural',()=>{
  assert.ok(voice, 'sincronização de narração ainda não implementada');
  const cues=[{id:'a',from:15,to:120,text:'Uma frase.'},{id:'b',from:150,to:240,text:'Outra frase.'}];
  const plan=voice.planNarration(cues,[3,3.2]);
  assert.equal(plan[0].from,15);
  assert.equal(plan[0].playbackRate,1);
  assert.ok(plan[1].playbackRate>1 && plan[1].playbackRate<=1.12);
  assert.ok(plan[1].from+plan[1].durationInFrames<=240);
  assert.throws(()=>voice.planNarration(cues,[3,4.5]),/longa/);
});

test('rejeita falas sobrepostas, duração inválida e material ausente',()=>{
  assert.ok(voice);
  const cue={id:'a',from:15,to:120,text:'Teste.'};
  assert.throws(()=>voice.planNarration([cue,{...cue,id:'b',from:100,to:160}],[1,1]));
  assert.throws(()=>voice.planNarration([cue],[]));
  assert.throws(()=>voice.planNarration([cue],[NaN]));
  assert.throws(()=>voice.planNarration([{...cue,to:1900}],[1]));
});

test('montagem mantém pausas e todas as amostras da fala, sem truncar conteúdo',()=>{
  assert.ok(voice);
  const cues=[{id:'a',from:30,to:90,text:'A'},{id:'b',from:120,to:150,text:'B'}];
  const pcm=voice.placeNarration(cues,[new Int16Array([100,200,300]),new Int16Array([400,500])],10);
  assert.equal(pcm.length,600);
  assert.deepEqual(Array.from(pcm.slice(9,15)),[0,100,200,300,0,0]);
  assert.deepEqual(Array.from(pcm.slice(39,43)),[0,400,500,0]);
  assert.throws(()=>voice.placeNarration(cues,[new Int16Array(21),new Int16Array(2)],10),/excede/);
});

test('efeitos baixam suavemente durante a narração e recuperam volume nas pausas',()=>{
  assert.ok(voice);
  const regions=[{from:30,durationInFrames:60}];
  assert.equal(voice.effectsVolume(0,regions),0.8);
  assert.ok(Math.abs(voice.effectsVolume(60,regions)-0.18)<1e-10);
  assert.ok(voice.effectsVolume(27,regions)<0.8 && voice.effectsVolume(27,regions)>0.18);
  assert.equal(voice.effectsVolume(105,regions),0.8);
});

test('leitura PCM respeita chunks RIFF e limpeza remove apenas o silêncio das extremidades', async()=>{
  const pcm=await import('../scripts/pcm').catch(()=>null);
  assert.ok(pcm, 'leitura de PCM ainda não implementada');
  const {createSoundDesign}=await import('../src/audio');
  const parsed=pcm.readPcmWav(createSoundDesign(1,8000));
  assert.equal(parsed.sampleRate,8000);
  assert.equal(parsed.samples.length,8000);
  const input=new Int16Array(100);
  input.fill(1000,30,41);
  const trimmed=pcm.trimPcmSilence(input,100);
  assert.equal(trimmed.length,23);
  assert.equal(trimmed.filter(x=>x===1000).length,11);
  assert.equal(trimmed[6],1000);
  assert.throws(()=>pcm.readPcmWav(Buffer.from('not a wav')));
});

test('verificação da exportação detecta uma fala ausente ou sem volume audível',()=>{
  assert.ok(voice);
  assert.ok(voice.verifyNarrationAudibility,'checagem de voz no áudio final ainda não implementada');
  const regions=[{id:'fala',from:30,durationInFrames:60}];
  const pcm=new Int16Array(600);pcm.fill(1000,10,30);
  assert.deepEqual(voice.verifyNarrationAudibility(pcm,regions,10),[{id:'fala',rms:1000}]);
  assert.throws(()=>voice.verifyNarrationAudibility(new Int16Array(600),regions,10),/inaudível/);
  assert.throws(()=>voice.verifyNarrationAudibility(new Int16Array(15),regions,10),/incompleto/);
});
