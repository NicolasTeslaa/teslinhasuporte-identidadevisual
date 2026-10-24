import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Storyboard } from './types';

export function validateStoryboard(storyboard: Storyboard, assetRoot = join(process.cwd(), 'public/assets/verval')): string[] {
  const errors: string[] = [];
  let cursor = 0;
  for (const beat of storyboard.beats) {
    if (beat.from !== cursor) errors.push(`${beat.id}: timeline gap or overlap at ${cursor}`);
    if (beat.to <= beat.from) errors.push(`${beat.id}: invalid frame range`);
    if (beat.to > storyboard.durationInFrames) errors.push(`${beat.id}: exceeds duration`);
    if (!existsSync(join(assetRoot, beat.asset))) errors.push(`${beat.id}: missing asset ${beat.asset}`);
    cursor = beat.to;
  }
  if (cursor !== storyboard.durationInFrames) errors.push(`timeline ends at ${cursor}, expected ${storyboard.durationInFrames}`);
  return errors;
}
