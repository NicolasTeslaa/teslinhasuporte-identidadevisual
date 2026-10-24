import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { StoryboardBeat } from '../storyboards/types';
import { CaptureFrame } from './CaptureFrame';
import { EditorialText } from './EditorialText';
export const BeatScene: React.FC<{ beat: StoryboardBeat }> = ({ beat }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const fade = interpolate(frame, [0, 12, Math.max(12, durationInFrames - 12), durationInFrames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill className={`beat-scene beat-${beat.id}`} style={{ opacity: fade }}><div className="ambient-grid" /><CaptureFrame asset={beat.asset} focalPoint={beat.focalPoint} /><div className="capture-scrim" />{beat.id.startsWith('chaos-') ? <div className="chaos-cards"><span>R$ 440,00</span><span>Vencido</span><span>Estoque?</span></div> : null}<EditorialText beat={beat} /><div className="beat-index">{beat.id.toUpperCase()}</div></AbsoluteFill>;
};
