import test from 'node:test';
import assert from 'node:assert/strict';
const editorial=await import('../src/narration-editorial').catch(()=>null);
const music=await import('../src/music').catch(()=>null);
const mix=await import('../src/audio-mix');

test('roteiro só aceita a marca uma vez, na última fala',()=>{
  assert.ok(editorial,'validação editorial ainda não implementada');
  assert.doesNotThrow(()=>editorial.validateBrandMention(['Entendemos sua rotina.','Converse com a Teslinha Suporte.']));
  assert.throws(()=>editorial.validateBrandMention(['A Teslinha ajuda.','Fale com a Teslinha Suporte.']));
  assert.throws(()=>editorial.validateBrandMention(['Teslinha Suporte conhece sua operação.','Vamos conversar.']));
  assert.throws(()=>editorial.validateBrandMention(['Sem marca.']));
});

test('trilha original é determinística, audível, sem clipping e tem entrada e saída suaves',()=>{
  assert.ok(music,'trilha instrumental ainda não implementada');
  const a=music.createMusicBed(60,8000),b=music.createMusicBed(60,8000);
  assert.equal(a.length,480000);
  assert.deepEqual(a,b);
  let energy=0,peak=0;
  for(const x of a){energy+=x*x;peak=Math.max(peak,Math.abs(x));}
  assert.ok(Math.sqrt(energy/a.length)>0.06);
  assert.ok(peak<0.9);
  assert.equal(a[0],0);
  assert.ok(Math.abs(a[a.length-1])<0.0001);
});

test('música recua durante a fala e sobe discretamente nas pausas',()=>{
  const options={narration:true,effects:false,music:'audio/music-original-v01.wav'};
  const speaking=mix.getAudioTracks(options,60).find(x=>x.role==='music')!;
  const pause=mix.getAudioTracks(options,238).find(x=>x.role==='music')!;
  assert.ok(speaking.volume<pause.volume,'música ainda mantém volume fixo durante fala e pausa');
  assert.ok(speaking.volume<=0.13 && pause.volume<=0.21);
});
