import {ui} from '../config';
import React from 'react';
import {Background, Brand, Headline, DemoLabel, type SceneProps} from '../components/Primitives';
import {CRM, Dashboard, Automation, WindowBar} from '../components/Software';
import {copy, colors} from '../config';
import {drift, ease, enter} from '../animation';
import {Icon} from '../components/Icon';

export function Scene05({frame}: SceneProps) {
  const index=Math.min(2,Math.floor(Math.max(0,frame)/140));
  const local=frame-index*140;
  const exit=local>124 ? ease(local,124,16) : 0;
  const p=enter(local,8);
  const App=[CRM,Dashboard,Automation][index];
  return <Background frame={frame} light>
    <Brand frame={frame} light/>
    <Headline key={index} text={copy.demoSub[index]} frame={local} size={80} top={380} accent={1}/>
    <div style={{position:'absolute',top:650,left:84,display:'flex',gap:10}}>{[0,1,2].map(i=><div key={i} style={{height:5,width:i===index?88:28,borderRadius:4,background:i===index?colors.blue:'#B8CAE8'}}/>)}</div>
    <div style={{position:'absolute',left:84,top:735,fontSize:30,fontWeight:800,color:colors.blue,opacity:ease(local,6,20),display:'flex',gap:14,alignItems:'center'}}><Icon name={(['users','chart','bolt'] as const)[index]} size={32}/>{copy.demos[index]}</div>
    <div key={`app-${index}`} className="window" style={{position:'absolute',top:800+drift(frame,1,5),left:84,width:912,height:670,transform:`perspective(1800px) rotateY(${(1-p)*-7}deg) rotateX(${(1-p)*4}deg) translateX(${-exit*110}px) translateY(${(1-p)*65}px) scale(${0.97+0.03*p})`,opacity:ease(local,3,15)*(1-exit)}}>
      <WindowBar title={ui.softwareTitles[index]}/><App frame={local}/>
    </div>
    <div className="notification" style={{position:'absolute',top:1475,left:290,width:660,padding:'16px 23px',lineHeight:1.2,opacity:ease(local,65,18)*(1-exit),transform:`translateY(${(1-enter(local,65))*12}px)`}}><Icon name="check" size={31}/><div><div style={{fontSize:23,fontWeight:800}}>{ui.notifications[index]}</div><div style={{fontSize:19,marginTop:4,color:'#FFFFFF'}}>{ui.example}</div></div></div>
    <DemoLabel top={1590}/>
  </Background>;
}
