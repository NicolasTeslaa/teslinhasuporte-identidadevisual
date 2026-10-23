import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Html5Audio, continueRender, delayRender, cancelRender, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade as fadeTransition} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {audioConfig, brand, timeline, video} from './config';
import * as scenes from './scenes';
import {getAudioTracks} from './audio-mix';

export const sceneComponents = [scenes.Scene01,scenes.Scene02,scenes.Scene03,scenes.Scene04,scenes.Scene05,scenes.Scene06,scenes.Scene07,scenes.Scene08];
export type CommercialProps = {contact:string; effects:boolean; music:string|null; narration:boolean};
export const defaultProps:CommercialProps = {contact:brand.contact,effects:true,music:audioConfig.music,narration:true};

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
export function Commercial({contact=brand.contact,effects=true,music=null,narration=true}:CommercialProps) {
  useAssets();
  return <AbsoluteFill style={{background:'#050B1A'}}>
    <TransitionSeries>{timeline.map((entry,i)=><React.Fragment key={i}>
      {i>0&&(i===3||i===6 ? <TransitionSeries.Transition presentation={wipe({direction:'from-left'})} timing={linearTiming({durationInFrames:video.overlap})}/> : <TransitionSeries.Transition presentation={fadeTransition()} timing={linearTiming({durationInFrames:video.overlap})}/>)}
      <TransitionSeries.Sequence durationInFrames={entry.duration}><SceneStage index={i} contact={contact}/></TransitionSeries.Sequence>
    </React.Fragment>)}</TransitionSeries>
    {getAudioTracks({narration,effects,music},0).map(track=><Html5Audio key={track.role} src={staticFile(track.src)} loop={track.role==='music'} volume={frame=>getAudioTracks({narration,effects,music},frame).find(t=>t.role===track.role)!.volume}/>)}
  </AbsoluteFill>;
}
export function IndependentScene({index,contact=brand.contact}: {index:number;contact?:string}) {
  useAssets();
  return <SceneStage index={index} contact={contact}/>;
}
