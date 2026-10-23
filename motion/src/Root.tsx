import React from 'react';
import {Composition, Folder} from 'remotion';
import {Commercial, IndependentScene, defaultProps} from './Commercial';
import {timeline, video, brand} from './config';
export function Root() {
  return <>
    <Composition id="TeslinhaCommercial" component={Commercial} width={video.width} height={video.height} fps={video.fps} durationInFrames={video.frames} defaultProps={defaultProps}/>
    <Folder name="Cenas">{timeline.map((entry,i)=><Composition key={i} id={`Cena${String(i+1).padStart(2,'0')}`} component={IndependentScene} width={video.width} height={video.height} fps={video.fps} durationInFrames={entry.nominal} defaultProps={{index:i,contact:brand.contact}}/>)}</Folder>
  </>;
}
