import test from 'node:test';
import assert from 'node:assert/strict';
const mix=await import('../src/audio-mix').catch(()=>null);

test('exportação narrada inclui voz local e deixa os efeitos abaixo da fala',()=>{
  assert.ok(mix,'integração da voz ainda não implementada');
  const tracks=mix.getAudioTracks({narration:true,effects:true,music:null},60);
  const voice=tracks.find(t=>t.role==='narration');
  const effects=tracks.find(t=>t.role==='effects');
  assert.ok(voice);
  assert.ok(voice.src.endsWith('.wav'));
  assert.equal(voice.volume,1);
  assert.ok(effects && effects.volume<0.3);
  assert.equal(tracks.length,2);
});

test('desativar narração restaura a mixagem anterior e permite exportação sem áudio',()=>{
  assert.ok(mix);
  const tracks=mix.getAudioTracks({narration:false,effects:true,music:null},60);
  assert.deepEqual(tracks.map(t=>t.role),['effects']);
  assert.equal(tracks[0].volume,0.8);
  assert.deepEqual(mix.getAudioTracks({narration:false,effects:false,music:null},60),[]);
});

test('trilha opcional fica em segundo plano e mantém fades de início e fim',()=>{
  assert.ok(mix);
  const options={narration:true,effects:false,music:'audio/music.mp3'};
  const middle=mix.getAudioTracks(options,60).find(t=>t.role==='music');
  const start=mix.getAudioTracks(options,0).find(t=>t.role==='music');
  const ending=mix.getAudioTracks(options,1799).find(t=>t.role==='music');
  assert.ok(middle && middle.volume<=0.13);
  assert.equal(start?.volume,0);
  assert.ok(ending && ending.volume<middle.volume);
});
