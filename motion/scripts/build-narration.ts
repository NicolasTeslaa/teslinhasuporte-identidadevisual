import {RenderInternals} from '@remotion/renderer';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {narrationCues,narrationSettings} from '../src/narration-config';
import {planNarration,placeNarration} from '../src/narration';
import {requireNarrationClip} from './narration-cache';
import {readPcmWav,trimPcmSilence} from './pcm';

const output=resolve('../out/narration');
await mkdir(`${output}/clips`,{recursive:true});
await writeFile(`${output}/script.json`,JSON.stringify({settings:narrationSettings,cues:narrationCues},null,2));
if(process.argv.includes('--synthesize')) {
  const python=process.env.TESLINHA_TTS_PYTHON??'python3';
  const result=spawnSync(python,['scripts/synthesize-narration.py','--script',`${output}/script.json`,'--out',`${output}/clips`],{stdio:'inherit'});
  if(result.error)throw result.error;
  if(result.status!==0)throw new Error('Falha na síntese. Instale requirements-narration.txt no ambiente Python informado.');
}
const ff=(args:string[])=>RenderInternals.callFf({bin:'ffmpeg',args:['-v','error','-y',...args],indent:false,logLevel:'error',binariesDirectory:null,cancelSignal:undefined});
const pcm:Int16Array[]=[];
for(const cue of narrationCues) {
  const input=`${output}/clips/${cue.id}.mp3`,wave=`${output}/clips/${cue.id}.wav`;
  await requireNarrationClip(input,{text:cue.text,voice:narrationSettings.voice,rate:narrationSettings.rate,pitch:narrationSettings.pitch});
  await ff(['-i',input,'-ar','48000','-ac','1','-c:a','pcm_s16le',wave]);
  const decoded=readPcmWav(await readFile(wave));
  pcm.push(trimPcmSilence(decoded.samples,48000));
}
const seconds=pcm.map(samples=>samples.length/48000);
narrationCues.forEach((c,i)=>console.log(`${c.id}: ${seconds[i].toFixed(2)}s / janela ${((c.to-c.from)/30).toFixed(2)}s`));
const plan=planNarration(narrationCues,seconds);
for(let i=0;i<plan.length;i++) {
  if(plan[i].playbackRate===1)continue;
  const source=`${output}/clips/${plan[i].id}-trimmed.pcm`,wave=`${output}/clips/${plan[i].id}-fitted.wav`;
  await writeFile(source,Buffer.from(pcm[i].buffer,pcm[i].byteOffset,pcm[i].byteLength));
  await ff(['-f','s16le','-ar','48000','-ac','1','-i',source,'-af',`atempo=${plan[i].playbackRate}`,'-ar','48000','-c:a','pcm_s16le',wave]);
  pcm[i]=trimPcmSilence(readPcmWav(await readFile(wave)).samples,48000);
}
const assembled=placeNarration(narrationCues,pcm);
const raw=`${output}/narration-60s.pcm`;
await writeFile(raw,Buffer.from(assembled.buffer));
await mkdir('public/audio',{recursive:true});
await ff(['-f','s16le','-ar','48000','-ac','1','-i',raw,'-af','loudnorm=I=-16:LRA=7:TP=-1.5','-ar','48000','-c:a','pcm_s16le',resolve('public',narrationSettings.source)]);
const regions=plan.map((cue,i)=>({...cue,durationInFrames:Math.ceil(pcm[i].length/48000*30),originalSeconds:seconds[i],actualSeconds:pcm[i].length/48000}));
await writeFile('src/narration-manifest.json',JSON.stringify({voice:narrationSettings.voice,rate:narrationSettings.rate,pitch:narrationSettings.pitch,source:narrationSettings.source,regions},null,2)+'\n');
await writeFile(`${output}/narration.srt`,regions.map((r,i)=>{
  const stamp=(frame:number)=>{const ms=Math.round(frame/30*1000);return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`;};
  return `${i+1}\n${stamp(r.from)} --> ${stamp(r.from+r.durationInFrames)}\n${r.text}\n`;
}).join('\n'));
console.log('Narração montada: 60s, PCM mono 48 kHz, -16 LUFS; nenhum trecho truncado.');
