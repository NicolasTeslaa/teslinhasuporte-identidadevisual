import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { vervalMobileStoryboard } from './storyboards/verval-mobile';
import { BeatScene } from './components/BeatScene';
export const VervalMobileAd: React.FC = () => <AbsoluteFill className="verval-root">{vervalMobileStoryboard.beats.map((beat) => <Sequence key={beat.id} from={beat.from} durationInFrames={beat.to - beat.from}><BeatScene beat={beat} /></Sequence>)}<Audio src={staticFile('audio/verval-narration.wav')} volume={1} /><Audio src={staticFile('audio/verval-music.wav')} volume={(f) => f < 330 ? 0.08 : 0.13} /></AbsoluteFill>;
