import React, {type CSSProperties} from 'react';
import {AbsoluteFill, staticFile} from 'remotion';
import {brand, colors, copy} from '../config';
import {drift, ease, enter} from '../animation';

export type SceneProps = {frame: number; contact?: string};
export function Background({frame, light = false, children}: React.PropsWithChildren<{frame: number; light?: boolean}>) {
  return <AbsoluteFill className={`scene ${light ? 'light' : 'dark'}`}>
    <div className="ambient" style={{background: light ? 'radial-gradient(ellipse at 75% 50%, #DCE8FF 0%, transparent 65%)' : 'radial-gradient(ellipse at 65% 55%, #0A2053 0%, transparent 63%)', transform: `translate(${drift(frame, 1, 20)}px, ${drift(frame, 2, 30)}px)`}}/>
    <svg className="background-arc" viewBox="0 0 1080 1920"><path d="M1300 500C-100 450-230 1650 1250 1780" stroke={light ? '#075BFF' : '#55B8FF'} strokeWidth="1.2" fill="none" opacity={light ? 0.12 : 0.1}/><path d="M1330 550C-30 500-150 1600 1280 1730" stroke={light ? '#075BFF' : '#55B8FF'} strokeWidth="0.7" fill="none" opacity="0.08"/></svg>
    {children}
  </AbsoluteFill>;
}
export function Brand({frame = 40, light = false, style = {}}: {frame?: number; light?: boolean; style?: CSSProperties}) {
  return <div className="brand" style={{opacity: ease(frame, 0, 20), ...style}}>
    <div className="brand-symbol"><img alt="Logo oficial da Teslinha Suporte" src={staticFile(brand.logo)} style={{width: 65, height: 65, objectFit: 'contain'}}/></div>
    <div><div className="brand-name" style={{color: light ? colors.ink : colors.white}}>{brand.name}</div><div className="brand-descriptor" style={{color: light ? colors.blue : colors.sky}}>{brand.descriptor}</div></div>
  </div>;
}
export function Headline({text, frame, delay = 0, top = 390, size = 82, accent = -1, style = {}}: {text: string; frame: number; delay?: number; top?: number; size?: number; accent?: number; style?: CSSProperties}) {
  return <div className="headline" style={{top, fontSize: size, ...style}}>{text.split('\n').map((line, i) => {
    const p = enter(frame, delay + i * 5);
    return <div key={i} style={{overflow: 'hidden', paddingBottom: 8}}><div style={{transform: `translateY(${(1 - p) * 115}%)`, opacity: ease(frame, delay + i * 5, 15), color: i === accent ? 'var(--accent)' : undefined}}>{line}</div></div>;
  })}</div>;
}
export function SmallText({children, top, light = false, style = {}}: React.PropsWithChildren<{top: number; light?: boolean; style?: CSSProperties}>) {
  return <div className="small-text" style={{top, color: light ? colors.muted : colors.sky, ...style}}>{children}</div>;
}
export function DemoLabel({top = 1570}: {top?: number}) {
  return <div className="demo-label" style={{top}}>{copy.disclaimer}</div>;
}
export function LogoHero({frame, top = 600, size = 260}: {frame: number; top?: number; size?: number}) {
  const p = enter(frame, 12);
  return <div style={{position: 'absolute', top, left: 540 - size / 2, width: size, height: size, background: colors.navy, borderRadius: size * 0.24, display: 'grid', placeItems: 'center', transform: `translateY(${(1-p)*80}px) scale(${0.82+0.18*p}) rotate(${(1-p)*-8}deg)`, opacity: ease(frame, 4, 15), boxShadow: '0 32px 70px #07142B25'}}><img alt="Logo oficial da Teslinha Suporte" src={staticFile(brand.logo)} style={{width: '78%', height: '78%', objectFit: 'contain'}}/></div>;
}
export function Tag({children, light = false}: React.PropsWithChildren<{light?: boolean}>) {
  return <div className="tag" style={{color: light ? colors.blue : colors.sky, background: light ? colors.pale : '#55B8FF18'}}>{children}</div>;
}
