import {ui} from '../config';
import React from 'react';
import {Background, Brand, Headline, LogoHero, SmallText, type SceneProps} from '../components/Primitives';
import {copy, colors} from '../config';
import {ease} from '../animation';
export function Scene04({frame}: SceneProps) {
  const p = ease(frame, 8, 60);
  return <Background frame={frame} light>
    <Brand frame={frame} light/>
    <svg width="1080" height="900" viewBox="0 0 1080 900" style={{position:'absolute',top:300,overflow:'visible'}}><path d="M-250-50C-350 500 250 900 1250 280" stroke={colors.blue} strokeWidth="32" fill="none" strokeDasharray="2300" strokeDashoffset={2300*(1-p)} opacity="0.13"/><path d="M-250-50C-350 500 250 900 1250 280" stroke={colors.blue} strokeWidth="3" fill="none" strokeDasharray="2300" strokeDashoffset={2300*(1-p)}/></svg>
    <LogoHero frame={frame} top={510} size={280}/>
    <div style={{position:'absolute',top:840,width:'100%',textAlign:'center',fontSize:60,fontWeight:800,letterSpacing:-2,opacity:ease(frame,30,20)}}>{ui.wordmark}<span style={{color:colors.blue}}>{ui.wordmarkSuffix}</span></div>
    <Headline text={copy.reveal} frame={frame} delay={37} top={1040} size={84} accent={1}/>
    <SmallText top={1350} light style={{fontSize:35,whiteSpace:'pre-line',opacity:ease(frame,65,25)}}>{copy.revealSub}</SmallText>
  </Background>;
}
