import React from 'react';
import { Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
type Props = { asset: string; focalPoint?: { x: number; y: number } };
export const CaptureFrame: React.FC<Props> = ({ asset, focalPoint = { x: 0.5, y: 0.4 } }) => {
  const frame = useCurrentFrame(); const { durationInFrames } = useVideoConfig(); const progress = frame / Math.max(1, durationInFrames);
  const scale = interpolate(progress, [0, 1], [1.015, 1.045], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const translateX = interpolate(progress, [0, 1], [0, focalPoint.x < 0.5 ? 14 : -14]); const translateY = interpolate(progress, [0, 1], [0, focalPoint.y < 0.5 ? 10 : -10]);
  return <div className="capture-frame" style={{ transform: `translate(${translateX}px, ${translateY}px) scale(${scale})` }}><div className="phone-shell"><div className="phone-island" /><Img src={staticFile(`assets/verval/${asset}`)} className="capture-image" /></div></div>;
};
