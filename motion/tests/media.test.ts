import test from 'node:test';
import assert from 'node:assert/strict';
const audio = await import('../src/audio').catch(() => null);
const media = await import('../src/media-contract').catch(() => null);

test('sound design produz WAV PCM de 60 segundos, sem saturação e com cauda silenciosa', () => {
  assert.ok(audio, 'gerador de efeitos ainda não implementado');
  const result=audio.createSoundDesign(60,8000);
  assert.equal(result.toString('ascii',0,4),'RIFF');
  assert.equal(result.toString('ascii',8,12),'WAVE');
  assert.equal(result.readUInt32LE(24),8000);
  assert.equal(result.readUInt32LE(40),60*8000*2);
  let peak=0,energy=0;
  for(let i=44;i<result.length;i+=2){const x=result.readInt16LE(i);peak=Math.max(peak,Math.abs(x));energy+=x*x;}
  assert.ok(peak>1000 && peak<30000);
  assert.ok(energy>0);
  assert.equal(result.subarray(-1000).every(x=>x===0),true);
  assert.deepEqual(result,audio.createSoundDesign(60,8000));
});

const good = {
  streams: [{codec_type:'video',codec_name:'h264',width:1080,height:1920,r_frame_rate:'30/1',nb_frames:'1800',pix_fmt:'yuv420p'}, {codec_type:'audio',codec_name:'aac',sample_rate:'48000'}],
  format:{duration:'60.000000'},
};
test('validação aceita somente o vídeo final completo no formato contratado', () => {
  assert.ok(media, 'contrato de mídia ainda não implementado');
  assert.doesNotThrow(()=>media.assertCommercialMetadata(good));
  for(const change of [{width:720},{height:1080},{codec_name:'vp9'},{r_frame_rate:'24/1'},{nb_frames:'1799'},{pix_fmt:'yuv444p'}]) {
    assert.throws(()=>media.assertCommercialMetadata({...good,streams:[{...good.streams[0],...change},good.streams[1]]}));
  }
  assert.throws(()=>media.assertCommercialMetadata({...good,format:{duration:'59.5'}}));
  assert.throws(()=>media.assertCommercialMetadata({...good,streams:[]}));
});

test('validação rejeita erros recuperáveis mesmo quando FFmpeg retorna código zero', () => {
  assert.ok(media);
  assert.ok(media.assertDecodeLog, 'mensagens de erro ainda não são verificadas');
  assert.doesNotThrow(()=>media.assertDecodeLog(' \n'));
  assert.throws(()=>media.assertDecodeLog('[h264] error while decoding MB 12 8\n'));
});
