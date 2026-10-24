import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('Verval composition renders the editorial shell and real capture references', () => {
  const source = readFileSync(resolve('src/VervalMobileAd.tsx'), 'utf8');
  if (!source.includes('Sequence')) throw new Error('missing timeline sequences');
  if (!source.includes('verval-narration.wav')) throw new Error('missing narration track');
  if (!source.includes('verval-music.wav')) throw new Error('missing music track');
});
