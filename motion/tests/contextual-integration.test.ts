import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {narrationCues,narrationSettings} from '../src/narration-config';
import {validateBrandMention} from '../src/narration-editorial';
import {planNarration} from '../src/narration';
import {readPcmWav} from '../scripts/pcm';
import manifest from '../src/narration-manifest.json';

test('projeto usa o roteiro contextual escolhido e todos os trechos reais cabem nas cenas',async()=>{
  validateBrandMention(narrationCues.map(c=>c.text));
  assert.equal(manifest.regions.length,narrationCues.length);
  const plan=planNarration(narrationCues,manifest.regions.map(r=>r.actualSeconds));
  assert.ok(plan.every(p=>p.playbackRate===1));
  for(let i=0;i<narrationCues.length;i++) {
    assert.equal(manifest.regions[i].text,narrationCues[i].text);
    assert.equal(manifest.regions[i].from,narrationCues[i].from);
    assert.ok(manifest.regions[i].from+manifest.regions[i].durationInFrames<=narrationCues[i].to);
  }
  const wave=readPcmWav(await readFile(`public/${narrationSettings.source}`));
  assert.equal(wave.sampleRate,48000);
  assert.equal(wave.samples.length,2880000);
});

test('música sozinha não pode ser confundida com narração presente na exportação',async()=>{
  const voice=await import('../src/narration');
  assert.ok(voice.verifyNarrationReference,'comparação com voz original ainda não implementada');
  const reference=readPcmWav(await readFile(`public/${narrationSettings.source}`)).samples;
  const music=readPcmWav(await readFile('public/audio/music-original-v01.wav')).samples;
  const {getAudioTracks}=await import('../src/audio-mix');
  const onlyMusic=new Int16Array(music.length);
  for(let i=0;i<music.length;i++) {
    const gain=getAudioTracks({narration:true,effects:false,music:'audio/music-original-v01.wav'},Math.floor(i/1600)).find(t=>t.role==='music')!.volume;
    onlyMusic[i]=Math.round(music[i]*gain);
  }
  assert.throws(()=>voice.verifyNarrationReference(onlyMusic,reference,manifest.regions),/não corresponde/);
  const correct=new Int16Array(reference.length);
  for(let i=0;i<correct.length;i++)correct[i]=Math.max(-32768,Math.min(32767,reference[i]+onlyMusic[i]));
  const checked=voice.verifyNarrationReference(correct,reference,manifest.regions);
  assert.equal(checked.length,8);
  assert.ok(checked.every(r=>r.correlation>0.9));
});
