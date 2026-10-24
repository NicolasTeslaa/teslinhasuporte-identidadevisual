export type BeatTransition = 'none' | 'fade' | 'push';

export type StoryboardBeat = {
  id: string;
  from: number;
  to: number;
  asset: string;
  goal: string;
  onScreen?: { eyebrow?: string; title: string; body?: string; y: number; height: number };
  narration: string;
  transition: BeatTransition;
  focalPoint?: { x: number; y: number };
};

export type Storyboard = {
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  safeArea: { left: number; right: number; top: number; bottom: number };
  beats: StoryboardBeat[];
};
