import {bundle} from '@remotion/bundler';
import {openBrowser, selectComposition, getCompositions, renderMedia, renderStill} from '@remotion/renderer';
import {mkdir, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
import {createSoundDesign} from '../src/audio';
import {defaultProps} from '../src/Commercial';

const mode=process.argv[2]??'video';
if(!['video','preview','stills'].includes(mode))throw new Error('Use video, preview ou stills.');
await mkdir('../out/stills',{recursive:true});
if(!existsSync('public/audio/sound-design.wav')) {
  await mkdir('public/audio',{recursive:true});
  await writeFile('public/audio/sound-design.wav',createSoundDesign());
}
console.log('Preparando bundle e navegador…');
const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});
const browser=await openBrowser('chrome',{logLevel:'error'});
try {
  const compositions=await getCompositions(serveUrl,{puppeteerInstance:browser,inputProps:defaultProps});
  assert.equal(compositions.length,9,'Registrar comercial e oito cenas independentes.');
  const composition=await selectComposition({serveUrl,id:'TeslinhaCommercial',puppeteerInstance:browser,inputProps:defaultProps});
  assert.equal(composition.durationInFrames,1800,'Timeline real deve durar 1800 frames.');
  if(mode==='stills') {
    const frames=[60,190,340,530,645,800,940,1080,1225,1345,1450,1605,1765];
    const cuts=[246,486,696,876,1296,1506,1686];
    for(const frame of [...frames,...cuts]) {
      const output=resolve(`../out/stills/frame-${String(frame).padStart(4,'0')}.png`);
      await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output,imageFormat:'png',inputProps:defaultProps,logLevel:'error'});
      console.log(`Quadro ${frame} (${(frame/30).toFixed(2)} s)`);
    }
    await writeFile('../out/stills/manifest.json',JSON.stringify({frames,cuts,composition},null,2));
  } else {
    let last=-1;
    const outputLocation=resolve(mode==='preview'?'../out/teslinha-preview.mp4':'../out/teslinha-commercial.mp4');
    await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation,codec:'h264',pixelFormat:'yuv420p',crf:mode==='preview'?23:18,scale:mode==='preview'?0.5:1,concurrency:4,imageFormat:'jpeg',jpegQuality:95,audioCodec:'aac',audioBitrate:'192k',inputProps:defaultProps,logLevel:'error',onProgress:({progress})=>{const pct=Math.floor(progress*20)*5;if(pct!==last){last=pct;console.log(`Render ${pct}%`);}}});
    console.log(`Vídeo: ${outputLocation}`);
  }
} finally {await browser.close({silent:true});}
