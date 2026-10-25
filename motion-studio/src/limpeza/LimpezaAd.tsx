import React,{useLayoutEffect,useRef,useState} from 'react';
import {AbsoluteFill,Audio,Img,staticFile,useCurrentFrame,delayRender,continueRender} from 'remotion';
import * as T from 'three';
import {createWorld} from './models';
import {captionAt,cuts,ease,sceneAt} from './timeline';
import cues from './captions.json';
import './limpeza.css';

const World:React.FC<{stage:number;t:number}>=({stage,t})=>{
 const ref=useRef<HTMLDivElement>(null);const state=useRef<{renderer:T.WebGLRenderer;world:ReturnType<typeof createWorld>}|null>(null);
 const [handle]=useState(()=>delayRender('Modelos 3D'));
 useLayoutEffect(()=>{const renderer=new T.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(1080,930);renderer.setPixelRatio(1);renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 const world=createWorld(stage);state.current={renderer,world};ref.current!.appendChild(renderer.domElement);
 return()=>{renderer.dispose();world.dispose();renderer.domElement.remove();state.current=null;};},[stage]);
 useLayoutEffect(()=>{const s=state.current;if(s){s.world.animate(t);s.renderer.render(s.world.scene,s.world.camera);continueRender(handle);}},[t,stage,handle]);
 return <div ref={ref} className={`clean-world clean-world-${stage}`}/>;
};
const Arrow=()=> <svg width="42" height="42" viewBox="0 0 40 40" fill="none"><path d="M8 20h23M22 10l10 10-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const Chat=()=> <svg width="43" height="43" viewBox="0 0 40 40" fill="none"><path d="M33 19a13 13 0 0 1-19 12l-8 2 2-8A13 13 0 1 1 33 19Z" stroke="currentColor" strokeWidth="2.6"/><path d="M15 12c-3 2-1 7 2 10s8 5 10 2l-4-3-2 1-4-4 1-2Z" fill="currentColor"/></svg>;
export const LimpezaAd:React.FC=()=>{
 const f=useCurrentFrame(),stage=sceneAt(f),t=(f-cuts[stage])/30;
 const intro=ease(t/.55),light=stage===2||stage===3;
 const caption=captionAt(cues,f/30);
 return <AbsoluteFill className={`clean-ad ${light?'clean-light':'clean-blue'}`}>
  <div className="clean-orbit" style={{transform:`rotate(${-24+f*.012}deg)`}}/>
  {stage<4&&<World key={stage} stage={stage} t={t}/>}
  <div className="clean-editorial" style={{opacity:.35+.65*intro,transform:`translateY(${(1-intro)*28}px)`}}>
   {stage===0&&<><h1 className="clean-hook">QUANDO FOI<br/>A ÚLTIMA<br/><span>LIMPEZA?</span></h1><div className="clean-device-label">COMPUTADOR <span>OU</span> VIDEOGAME</div></>}
   {stage===1&&<><div className="clean-problem"><span className="clean-word" key={Math.floor(t/2)}>{t<2?'POEIRA':t<4?'AQUECIMENTO':'BARULHO'}</span></div><div className="clean-heat"><div className="clean-heat-label">TEMPERATURA <svg width="28" height="28" viewBox="0 0 24 24"><path d="M12 20V4M5 11l7-7 7 7" stroke="currentColor" strokeWidth="2.5" fill="none"/></svg></div><div className="clean-meter"><div style={{width:`${28+ease(t/5.5)*52}%`}}/></div></div></>}
   {stage===2&&<><h2 className="clean-solution">LIMPEZA<br/>PROFISSIONAL</h2><div className="clean-price-card" style={{transform:`translateY(${(1-ease((t-.4)/.6))*45}px)`,opacity:ease((t-.3)/.5)}}><div className="clean-price"><span>R$</span> 200</div><div className="clean-per">POR EQUIPAMENTO</div><div className="clean-equipment">PC OU VIDEOGAME</div></div></>}
   {stage===3&&<><h2 className="clean-delivery">COLETA E ENTREGA</h2><div className="clean-free" style={{transform:`scale(${1+Math.sin(Math.min(1,t/1.1)*Math.PI)*.045})`}}>100% GRÁTIS</div><div className="clean-city">EM VÁRZEA PAULISTA</div><div className="clean-route-label"><span>{t<.8?'NA SUA CASA':t<3?'COLETA':t<4.8?'LIMPEZA PROFISSIONAL':t<7.3?'ENTREGA':'DE VOLTA À SUA CASA'}</span><Arrow/></div></>}
   {stage===4&&<><Img className="clean-logo" src={staticFile('limpeza/logo-original.png')}/><div className="clean-end-price"><div>LIMPEZA POR</div><strong><small>R$</small> 200</strong><span>POR EQUIPAMENTO</span></div><div className="clean-end-delivery">COLETA E ENTREGA<br/><strong>GRÁTIS</strong></div><div className="clean-end-city">VÁRZEA PAULISTA – SP</div><div className="clean-cta" style={{transform:`translateY(${(1-ease((t-.35)/.6))*25}px)`}}><Chat/><span>AGENDAR MINHA LIMPEZA</span><Arrow/></div></>}
  </div>
  {caption&&<div className="clean-caption"><span>{caption}</span></div>}
  {stage>0&&t<.4&&<div className="clean-wipe" style={{transform:`translateX(${ease(t/.4)*220-110}%) rotate(-22deg)`}}/>}
  <Audio src={staticFile('limpeza/narracao.wav')}/>
  <Audio src={staticFile('limpeza/trilha.wav')} volume={1.8}/>
 </AbsoluteFill>;
};
