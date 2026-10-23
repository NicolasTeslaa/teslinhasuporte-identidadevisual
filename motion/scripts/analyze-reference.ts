import {RenderInternals} from '@remotion/renderer';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const input=resolve('../assets/referencias/video motion referencia.mp4');
await mkdir('../out/reference',{recursive:true});
const run=(bin:'ffmpeg'|'ffprobe',args:string[])=>RenderInternals.callFf({bin,args,indent:false,logLevel:'error',binariesDirectory:null,cancelSignal:undefined});
const metadata=await run('ffprobe',['-v','error','-show_streams','-show_format','-of','json',input]);
await writeFile('../out/reference/metadata.json',metadata.stdout);
for(const second of [0,2,4,6,8,10,14,18,22,24,26,29,33,37,41,44,48,52,56]) {
  await run('ffmpeg',['-v','error','-y','-ss',String(second),'-i',input,'-frames:v','1','-vf','scale=432:768',resolve(`../out/reference/second-${String(second).padStart(2,'0')}.png`)]);
}
console.log('Metadados ffprobe e 19 quadros FFmpeg em out/reference/.');
