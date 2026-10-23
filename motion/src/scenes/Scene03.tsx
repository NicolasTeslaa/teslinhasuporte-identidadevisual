import {ui} from '../config';
import React from 'react';
import {Background, Brand, Headline, type SceneProps} from '../components/Primitives';
import {copy, colors} from '../config';
import {drift, ease} from '../animation';
export function Scene03({frame}: SceneProps) {
  const second = frame >= 85;
  const p = ease(frame, 25, 75);
  return <Background frame={frame}>
    <Brand frame={frame}/>
    <Headline key={String(second)} text={copy.unique[second?1:0]} frame={second ? frame-85 : frame} size={second ? 72 : 90} accent={second ? 2 : 1}/>
    <svg width="1080" height="650" viewBox="0 0 1080 650" style={{position: 'absolute', top: 870, overflow:'visible'}}>
      <defs><linearGradient id="cubeFace" x2="1" y2="1"><stop stopColor="#14346B"/><stop offset="1" stopColor="#0B1630"/></linearGradient></defs>
      {Array.from({length:30}, (_,i)=>{
        const x=130+(i%6)*160; const y=100+Math.floor(i/6)*103;
        return <g key={i} transform={`translate(${x} ${y + drift(frame,i,3)})`} opacity={(i===14?0:0.4)*ease(frame,i%6*3,25)}><path d="M0 0 62-23 124 0 62 24Z" fill="#1B2C51" stroke="#526A91"/><path d="M0 0v45l62 24V24Z" fill="#0B1630" stroke="#526A91"/><path d="m62 24 62-24v45l-62 24Z" fill="url(#cubeFace)" stroke="#526A91"/></g>;
      })}
      <g transform={`translate(${540+drift(frame,3,18)} ${335-p*75}) rotate(${-8+p*8})`} opacity={ease(frame,12,25)}>
        <ellipse cy="100" rx="190" ry="40" fill="#075BFF" opacity="0.13"/>
        <path d="M-175-85C-150-155-70-110-15-145S90-130 135-80 195-5 155 55 55 90-5 125-130 115-155 45-200-15-175-85Z" fill={colors.blue} stroke={colors.sky} strokeWidth="3"/>
        <text x="0" y="-6" textAnchor="middle" fill="white" fontSize="36" fontWeight="800">{ui.yourRoutine}</text><text x="0" y="42" textAnchor="middle" fill="white" fontSize="25">{ui.yourRules}</text>
      </g>
      <path d="M310 520Q540 660 800 480" fill="none" stroke={colors.sky} strokeWidth="2" strokeDasharray="5 10" opacity={ease(frame,80,25)}/>
    </svg>
    <div style={{position:'absolute', top:1530,left:84,fontSize:27,color:colors.sky,opacity:ease(frame,140,25)}}>{ui.adaptSystem}</div>
  </Background>;
}
