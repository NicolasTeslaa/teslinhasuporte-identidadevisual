import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { vervalMobileStoryboard } from '../src/storyboards/verval-mobile';
import { validateStoryboard } from '../src/storyboards/validate';

describe('Verval Mobile storyboard', () => {
  it('covers the 30-second vertical timeline without gaps or overlaps', () => {
    assert.equal(vervalMobileStoryboard.fps, 30);
    assert.equal(vervalMobileStoryboard.width, 1080);
    assert.equal(vervalMobileStoryboard.height, 1920);
    assert.equal(vervalMobileStoryboard.durationInFrames, 900);
    assert.deepEqual(
      vervalMobileStoryboard.beats.map(({ from, to }) => [from, to]),
      [[0, 120], [120, 240], [240, 330], [330, 420], [420, 570], [570, 720], [720, 810], [810, 900]],
    );
    assert.deepEqual(validateStoryboard(vervalMobileStoryboard), []);
  });

  it('keeps copy inside the composition safe area', () => {
    for (const beat of vervalMobileStoryboard.beats) {
      assert.ok(beat.onScreen);
      assert.ok(beat.onScreen!.y >= vervalMobileStoryboard.safeArea.top);
      assert.ok(beat.onScreen!.y + beat.onScreen!.height <= vervalMobileStoryboard.safeArea.bottom);
    }
  });
});
