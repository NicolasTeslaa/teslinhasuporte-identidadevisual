import {ui} from '../config';
import React from 'react';
import {Background, Brand, Headline, SmallText, type SceneProps} from '../components/Primitives';
import {colors, copy} from '../config';
import {ease, enter, tilePosition} from '../animation';
import {Icon} from '../components/Icon';
export function Scene01({frame}: SceneProps) {
  const focus = frame >= 115;
  const p = ease(frame, 95, 50);
  const count = Math.round(168 - 164 * p);
  return <Background frame={frame}>
    <Brand frame={frame}/>
    <Headline key={focus ? 'focus' : 'complexity'} text={copy.opening[focus ? 1 : 0]} frame={focus ? frame - 115 : frame} size={80} accent={1}/>
    <div style={{position: 'absolute', top: 715, left: 84, right: 84, display: 'flex', alignItems: 'baseline', gap: 25, opacity: ease(frame, 12, 20)}}>
      <span style={{fontSize: 160, lineHeight: 1, fontWeight: 800, letterSpacing: -9, color: focus ? colors.sky : colors.white, fontVariantNumeric: 'tabular-nums'}}>{count}</span>
      <span style={{fontSize: 25, color: colors.sky, maxWidth: 300, lineHeight: 1.4}}>{ui.counterLabels[focus?1:0]}</span>
    </div>
    <svg style={{position: 'absolute', left: 110, top: 1030, overflow: 'visible'}} width="880" height="440" viewBox="0 0 880 440">
      {Array.from({length: 168}, (_, i) => {
        const pt = tilePosition(i, frame);
        return <g key={i} transform={`translate(${pt.x} ${pt.y})`} opacity={ease(frame, (i % 14) * 1.2, 24) * (1-p*0.85)}><rect width="46" height="25" rx="4" fill={i % 7 === 0 ? colors.blue : '#1B2C51'} stroke="#55B8FF" strokeOpacity="0.16"/><text x="6" y="17" fill="#A5C3EC" fontSize="9">{String((i * 37 + Math.floor(frame / 5)) % 999).padStart(3, '0')}</text></g>;
      })}
    </svg>
    {copy.areas.map((label, i) => <div key={label} style={{position: 'absolute', top: 985 + Math.floor(i/2)*205, left: 84+(i%2)*470, width: 442, height: 176, background: i === 3 ? colors.blue : colors.surface, borderRadius: 18, display: 'flex', alignItems: 'center', gap: 24, padding: 32, fontSize: 33, fontWeight: 800, transform: `translateY(${(1-enter(frame, 125+i*5))*45}px)`, opacity: ease(frame, 125+i*5, 22)}}><Icon name={(['chart','grid','users','bolt'] as const)[i]} size={44} color={i===3 ? colors.white : colors.sky}/>{label}</div>)}
    <SmallText top={1510} style={{fontSize: 25, opacity: ease(frame, 170, 20)}}>{ui.connectedOperation}</SmallText>
  </Background>;
}
