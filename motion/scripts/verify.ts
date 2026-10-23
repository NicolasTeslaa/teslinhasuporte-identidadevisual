import {RenderInternals} from '@remotion/renderer';
import {writeFile,readFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parseVerificationArgs} from './verify-options';
import {readPcmWav} from './pcm';
import {verifyNarrationAudibility} from '../src/narration';
import manifest from '../src/narration-manifest.json';
import {assertCommercialMetadata, assertDecodeLog, type Probe} from '../src/media-contract';
const options=parseVerificationArgs(process.argv.slice(2));
const file=resolve(options.file);
const run=(bin:'ffmpeg'|'ffprobe',args:string[])=>RenderInternals.callFf({bin,args,indent:false,logLevel:'error',binariesDirectory:null,cancelSignal:undefined});
const result=await run('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file]);
const probe=JSON.parse(result.stdout) as Probe;
assertCommercialMetadata(probe);
const decoded=await run('ffmpeg',['-xerror','-v','error','-i',file,'-c:v','rawvideo','-c:a','pcm_s16le','-f','null','-']);
assertDecodeLog(decoded.stderr);
let narration:ReturnType<typeof verifyNarrationAudibility>|null=null;
if(options.narration) {
  await mkdir('../out/narration',{recursive:true});
  const wave=resolve('../out/narration/final-audio.wav');
  await run('ffmpeg',['-xerror','-v','error','-y','-i',file,'-vn','-ar','48000','-ac','1','-c:a','pcm_s16le',wave]);
  narration=verifyNarrationAudibility(readPcmWav(await readFile(wave)).samples,manifest.regions);
  console.log(`PASS — ${narration.length} falas com áudio audível na mixagem final.`);
}
await writeFile(options.narration?'../out/verification-narrado.json':'../out/verification.json',JSON.stringify({file,verified:new Date().toISOString(),decode:'passed',narration,...probe},null,2));
console.log('PASS — H.264 yuv420p, 1080×1920, 30 FPS, 1800 frames, 60 s, AAC 48 kHz. Decodificação completa sem erros.');
