import {ui} from '../config';
import React from 'react';
import {Background, Headline, LogoHero, type SceneProps} from '../components/Primitives';
import {brand, copy, colors} from '../config';
import {ease, enter} from '../animation';
import {Icon} from '../components/Icon';
export function Scene08({frame,contact=brand.contact}: SceneProps) {
  return <Background frame={frame}>
    <LogoHero frame={frame+10} top={345} size={250}/>
    <div style={{position:'absolute',top:650,width:'100%',textAlign:'center',fontSize:68,fontWeight:800,letterSpacing:-2,opacity:ease(frame,0,20)}}>{ui.wordmark}<span style={{color:colors.sky}}>{ui.wordmarkSuffix}</span></div>
    <Headline text={copy.ending} frame={frame} delay={8} top={880} size={71} style={{textAlign:'center'}}/>
    <div style={{position:'absolute',top:1230,left:84,width:912,padding:'30px 24px',display:'flex',alignItems:'center',justifyContent:'center',gap:18,fontSize:32,fontWeight:800,background:colors.blue,borderRadius:18,opacity:ease(frame,20,20),transform:`translateY(${(1-enter(frame,20))*30}px)`}}>{copy.cta}<Icon name="arrow" size={34}/></div>
    <div style={{position:'absolute',top:1380,width:'100%',textAlign:'center',fontSize:43,fontWeight:700,color:colors.sky,opacity:ease(frame,32,20),fontVariantNumeric:'tabular-nums'}}>{contact}</div>
    <div style={{position:'absolute',top:1510,width:'100%',textAlign:'center',fontSize:25,color:'#B7D5FF',opacity:ease(frame,42,20)}}>{ui.closingServices}</div>
  </Background>;
}
