import {ui} from '../config';
import React from 'react';
import {Background, Brand, Headline, type SceneProps} from '../components/Primitives';
import {copy, colors} from '../config';
import {completedNodes, ease, enter} from '../animation';
import {Icon} from '../components/Icon';
export function Scene06({frame}: SceneProps) {
  const second=frame>=105;
  const completed=completedNodes(frame);
  return <Background frame={frame} light>
    <Brand frame={frame} light/>
    <Headline key={String(second)} text={copy.flow[second?1:0]} frame={second?frame-105:frame} size={90} accent={1}/>
    <svg width="1080" height="750" viewBox="0 0 1080 750" style={{position:'absolute',top:780}}>
      <path d="M295 120H790Q855 120 855 190V310Q855 380 790 380H295Q225 380 225 450V580H790" stroke="#CEDDF7" strokeWidth="5" fill="none"/>
      <path d="M295 120H790Q855 120 855 190V310Q855 380 790 380H295Q225 380 225 450V580H790" stroke={colors.blue} strokeWidth="5" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ease(frame,22,115)}/>
      {Array.from({length:8},(_,i)=>{const p=((frame/80+i/8)%1);return <circle key={i} cx={295+p*480} cy={120} r="5" fill={colors.blue} opacity={ease(frame,20,20)*0.6}/>;})}
    </svg>
    {ui.flowLabels.map((label,i)=>{
      const active=completed>i;
      return <div key={label} style={{position:'absolute',top:810+i*250,left:i===1?420:84,width:576,height:184,background:active?colors.blue:'white',color:active?'white':colors.ink,borderRadius:20,boxShadow:'0 24px 55px #0D2C5D12',display:'flex',alignItems:'center',gap:27,padding:36,opacity:ease(frame,i*10,20),transform:`translateY(${(1-enter(frame,i*10))*40}px)`}}><div style={{width:68,height:68,borderRadius:16,display:'grid',placeItems:'center',background:active?'#FFFFFF22':colors.light,color:active?'white':colors.blue}}><Icon name={active?'check':(['message','grid','bolt'] as const)[i]} size={36}/></div><div><div style={{fontSize:32,fontWeight:800}}>{label}</div><div style={{fontSize:22,marginTop:9,color:active?'white':colors.muted}}>{ui.flowStates[i]}</div></div></div>;
    })}
    <div style={{position:'absolute',left:84,top:1550,fontSize:27,color:colors.blue,opacity:ease(frame,135,25)}}>{ui.connectedPeople}</div>
  </Background>;
}
