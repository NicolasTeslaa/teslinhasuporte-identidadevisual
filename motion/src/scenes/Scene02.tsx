import {ui} from '../config';
import React from 'react';
import {Background, Brand, Headline, type SceneProps} from '../components/Primitives';
import {copy, colors} from '../config';
import {drift, ease, enter} from '../animation';
import {Icon} from '../components/Icon';
export function Scene02({frame}: SceneProps) {
  return <Background frame={frame}>
    <Brand frame={frame}/>
    <Headline text={copy.fragmented} frame={frame} size={77} accent={1}/>
    <svg style={{position: 'absolute', left: 0, top: 760}} width="1080" height="800"><path d="M130 180H950V650H160V320H800" fill="none" stroke={colors.sky} strokeWidth="2" strokeDasharray="9 12" strokeDashoffset={-frame*2} opacity="0.45"/></svg>
    <div className="window" style={{position: 'absolute', top: 810 + drift(frame, 1), left: 90, width: 865, height: 480, transform: `perspective(1400px) rotateY(-8deg) rotateZ(-4deg) translateY(${(1-enter(frame, 12))*100}px)`, opacity: ease(frame, 10, 20)}}>
      <div className="window-bar" style={{background: '#EAF1FF'}}><Icon name="grid" size={25} color={colors.blue}/><span className="window-bar-title">{ui.sheetFile}</span></div>
      <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 22, textAlign: 'left'}}><thead style={{background: '#075BFF', color: 'white'}}><tr>{ui.sheetColumns.map(s=><th key={s} style={{padding: '19px 22px'}}>{s}</th>)}</tr></thead><tbody>{ui.sheetClients.map((s,i)=><tr key={s} style={{background: i%2 ? '#F2F6FF' : 'white'}}><td style={{padding: '17px 22px'}}>{s}</td><td>00{142+i}</td><td style={{color: i===3 ? '#A22D39' : '#52617D'}}>{ui.sheetStatuses[i===3?1:0]}</td><td>{ui.sheetAssignees[i%2]}</td></tr>)}</tbody></table>
    </div>
    <div className="window dark-window" style={{position: 'absolute', top: 1120 + drift(frame, 3), left: 215, width: 780, height: 365, transform: `rotate(3deg) translateX(${(1-enter(frame, 35))*140}px)`, opacity: ease(frame, 30, 20)}}>
      <div className="window-bar" style={{borderColor: '#55B8FF25'}}><Icon name="clock" size={25} color={colors.sky}/><span className="window-bar-title">{ui.manualUpdate}</span></div>
      <div style={{padding: '30px 35px', fontSize: 24, color: '#B7D5FF'}}>{ui.copyData}<div style={{marginTop: 22, padding: 23, background: '#050B1A', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 18}}><span style={{color: colors.sky}}><Icon name="link"/></span>{ui.notSynced}</div><div style={{fontSize: 22, marginTop: 22, opacity: ease(frame, 85, 25)}}>{ui.latestVersion}</div></div>
    </div>
    <div style={{position: 'absolute', top: 1530, left: 84, fontSize: 25, color: colors.sky, opacity: ease(frame, 120, 20)}}>{ui.repeatWork}</div>
  </Background>;
}
