import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {openBrowser} from '@remotion/renderer';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Scene05} from '../src/scenes';
import {colors} from '../src/config';

test('interfaces completas cabem na janela e textos finais ficam na área segura', async()=>{
  const browser=await openBrowser('chrome',{logLevel:'error'});
  try {
    const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
    await page.setViewport({width:1080,height:1920,deviceScaleFactor:1});
    const css=(await readFile('src/style.css','utf8')).replace(/@import[^;]+;/g,'');
    let fonts='';
    for(const weight of [400,600,700,800]){
      const data=await readFile(`node_modules/@fontsource/manrope/files/manrope-latin-${weight}-normal.woff2`);
      fonts+=`@font-face{font-family:Manrope;font-style:normal;font-weight:${weight};src:url(data:font/woff2;base64,${data.toString('base64')}) format('woff2');}`;
    }
    const overflows:string[]=[];
    for(const frame of [65,70,200,210,345,350]){
      const html=`<head><style>${fonts}${css}</style></head><body>${renderToStaticMarkup(<Scene05 frame={frame}/>)}</body>`;
      await page.evaluate((markup:string)=>{document.documentElement.innerHTML=markup;},html);
      await page.evaluate('document.fonts.ready');
      const bounds=await page.evaluate(`(()=>{const w=document.querySelector('.window');const n=document.querySelector('.notification');const d=document.querySelector('.demo-label');return {visible:w.clientHeight,content:w.scrollHeight,notificationBottom:n.getBoundingClientRect().bottom,disclaimerBottom:d.getBoundingClientRect().bottom,disclaimerTop:d.getBoundingClientRect().top};})()`);
      if(bounds.content>bounds.visible)overflows.push(`frame ${frame}: conteúdo ${bounds.content}px excede janela ${bounds.visible}px`);
      assert.ok(bounds.notificationBottom<=1620);
      assert.ok(bounds.disclaimerBottom<=1620);
      assert.ok(bounds.notificationBottom+8<=bounds.disclaimerTop,`frame ${frame}: notificação invade a legenda de demonstração`);
    }
    assert.deepEqual(overflows,[]);
  } finally {await browser.close({silent:true});}
});

test('pares de texto e fundo mantêm contraste de leitura',()=>{
  const lum=(hex:string)=>{const c=hex.slice(1).match(/../g)!.map(x=>parseInt(x,16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;};
  for(const [fg,bg] of [[colors.white,colors.blue],[colors.blue,colors.white],[colors.ink,colors.light],[colors.sky,colors.navy],[colors.muted,colors.light]]){
    const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
    assert.ok(ratio>=4.5,`${fg} sobre ${bg}: ${ratio.toFixed(2)}`);
  }
});
