import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import type { StoryboardBeat } from '../storyboards/types';
import { CaptureFrame } from './CaptureFrame';
import { EditorialText } from './EditorialText';
export const BeatScene: React.FC<{ beat: StoryboardBeat }> = ({ beat }) => {
  const fade = interpolate(useCurrentFrame(), [0, 12, 48, 72], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill className="beat-scene" style={{ opacity: fade }}><CaptureFrame asset={beat.asset} focalPoint={beat.focalPoint} /><div className="capture-scrim" /><EditorialText beat={beat} /><div className="beat-index">{beat.id.toUpperCase()}</div></AbsoluteFill>;
};
