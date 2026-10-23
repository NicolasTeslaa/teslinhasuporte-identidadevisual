import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Html5Audio, continueRender, delayRender, cancelRender, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade as fadeTransition} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {audioConfig, brand, timeline, video} from './config';
import * as scenes from './scenes';

export const sceneComponents = [scenes.Scene01,scenes.Scene02,scenes.Scene03,scenes.Scene04,scenes.Scene05,scenes.Scene06,scenes.Scene07,scenes.Scene08];
export type CommercialProps = {contact:string; effects:boolean; music:string|null};
export const defaultProps:CommercialProps = {contact:brand.contact,effects:true,music:audioConfig.music};

function useAssets() {
  const [handle]=useState(()=>delayRender('Carregando logo e fontes locais'));
  useEffect(()=>{
    const image=new Image();image.src=staticFile(brand.logo);
    Promise.all([image.decode(),...[400,600,700,800].map(w=>document.fonts.load(`${w} 80px Manrope`))]).then(()=>continueRender(handle)).catch(cancelRender);
  },[handle]);
}
export function SceneStage({index,contact=brand.contact}: {index:number;contact?:string}) {
  const frame=useCurrentFrame();
  const Scene=sceneComponents[index];
  return <Scene frame={frame} contact={contact}/>;
}
export function Commercial({contact=brand.contact,effects=true,music=null}:CommercialProps) {
  useAssets();
  return <AbsoluteFill style={{background:'#050B1A'}}>
    <TransitionSeries>{timeline.map((entry,i)=><React.Fragment key={i}>
      {i>0&&(i===3||i===6 ? <TransitionSeries.Transition presentation={wipe({direction:'from-left'})} timing={linearTiming({durationInFrames:video.overlap})}/> : <TransitionSeries.Transition presentation={fadeTransition()} timing={linearTiming({durationInFrames:video.overlap})}/>)}
      <TransitionSeries.Sequence durationInFrames={entry.duration}><SceneStage index={i} contact={contact}/></TransitionSeries.Sequence>
    </React.Fragment>)}</TransitionSeries>
    {effects&&<Html5Audio src={staticFile(audioConfig.effects)} volume={0.8}/>}
    {music&&<Html5Audio src={staticFile(music)} loop volume={frame=>audioConfig.musicVolume*Math.min(1,frame/30,(video.frames-frame)/45)}/>}
  </AbsoluteFill>;
}
export function IndependentScene({index,contact=brand.contact}: {index:number;contact?:string}) {
  useAssets();
  return <SceneStage index={index} contact={contact}/>;
}
