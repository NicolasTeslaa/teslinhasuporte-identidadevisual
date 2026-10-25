import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderMedia,renderStill} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
const mode=process.argv[2]??'stills';
await mkdir('out/limpeza/stills',{recursive:true});
const serveUrl=await bundle({entryPoint:resolve('src/index.tsx')});
const browser=await openBrowser('chrome',{logLevel:'error',chromiumOptions:{gl:'angle'}});
try{
 const composition=await selectComposition({serveUrl,id:'LimpezaAd',puppeteerInstance:browser});
 if(mode==='stills'){
  for(const frame of [75,195,270,375,465,555,630,705,840,899]){
   await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:resolve(`out/limpeza/stills/${frame}.png`),imageFormat:'png',logLevel:'error'});
   console.log(`Quadro ${frame}`);
  }
 }else{
 let last=-1;
 await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation:resolve(`out/limpeza/${mode}-raw.mp4`),codec:'h264',pixelFormat:'yuv420p',crf:mode==='preview'?23:17,scale:mode==='preview'?.5:1,concurrency:2,imageFormat:'jpeg',jpegQuality:98,audioCodec:'aac',audioBitrate:'256k',logLevel:'error',onProgress:({progress})=>{const p=Math.floor(progress*10);if(p!==last){console.log(`${p*10}%`);last=p;}}});
  execFileSync('ffmpeg',['-y','-v','error','-i',resolve(`out/limpeza/${mode}-raw.mp4`),'-t','30','-c:v','copy','-c:a','aac','-b:a','256k','-ar','48000','-movflags','+faststart',resolve(`out/limpeza/${mode}.mp4`)]);
 }
}finally{await browser.close({silent:true});}
