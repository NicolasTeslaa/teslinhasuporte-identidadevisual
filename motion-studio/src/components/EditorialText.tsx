import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import type { StoryboardBeat } from '../storyboards/types';
export const EditorialText: React.FC<{ beat: StoryboardBeat }> = ({ beat }) => {
  const reveal = interpolate(useCurrentFrame(), [0, 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div className="editorial-text" style={{ top: beat.onScreen?.y, opacity: reveal, transform: `translateY(${(1 - reveal) * 18}px)` }}>{beat.onScreen?.eyebrow ? <div className="eyebrow">{beat.onScreen.eyebrow}</div> : null}<h1>{beat.onScreen?.title}</h1>{beat.onScreen?.body ? <p>{beat.onScreen.body}</p> : null}</div>;
};
