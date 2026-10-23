import {ui} from '../config';
import React from 'react';
import {Background, Brand, Headline, type SceneProps} from '../components/Primitives';
import {colors, copy} from '../config';
import {ease, drift} from '../animation';
export function Scene07({frame}: SceneProps) {
  const gather=ease(frame,12,100);
  return <Background frame={frame}>
    <Brand frame={frame}/>
    <svg width="1080" height="950" viewBox="0 0 1080 950" style={{position:'absolute',top:300,overflow:'visible'}}>
      <defs><radialGradient id="core"><stop stopColor="#FFFFFF"/><stop offset="0.12" stopColor="#55B8FF"/><stop offset="0.4" stopColor="#075BFF" stopOpacity="0.25"/><stop offset="1" stopColor="#075BFF" stopOpacity="0"/></radialGradient></defs>
      <circle cx="540" cy="480" r={175+gather*50} fill="url(#core)"/>
      {[180,280,390].map((r,i)=><ellipse key={r} cx="540" cy="480" rx={r} ry={r*0.52} fill="none" stroke={colors.sky} strokeWidth="1" opacity={0.1+i*0.05} transform={`rotate(${-25+i*38+frame*0.06} 540 480)`}/>)}
      {Array.from({length:24},(_,i)=>{const angle=i/24*Math.PI*2+frame*0.002;const rad=(390+(i%4)*30)*(1-gather*0.7);const x=540+Math.cos(angle)*rad;const y=480+Math.sin(angle)*rad*0.85;return <g key={i}><line x1="540" y1="480" x2={x} y2={y} stroke={colors.sky} strokeWidth="1" opacity={0.08+gather*0.1}/><rect x={x-8} y={y-8+drift(frame,i,4)} width={16+i%3*4} height={16+i%3*4} rx="4" fill={i%3===0?colors.sky:colors.blue} opacity={0.3+gather*0.7} transform={`rotate(${i*15+frame*0.3} ${x} ${y})`}/></g>;})}
      <circle cx="540" cy="480" r={9+gather*10} fill="white"/>
    </svg>
    <Headline text={copy.growth} frame={frame} delay={20} top={1225} size={77} accent={1}/>
    <div style={{position:'absolute',left:84,top:1500,fontSize:29,color:colors.sky,opacity:ease(frame,80,30)}}>{ui.growOperation}</div>
  </Background>;
}
