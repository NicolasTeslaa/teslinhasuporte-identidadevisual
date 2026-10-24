import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { vervalMobileStoryboard } from '../src/storyboards/verval-mobile';
import { validateStoryboard } from '../src/storyboards/validate';

describe('Verval Mobile storyboard', () => {
  it('covers the 24-second vertical timeline without gaps or overlaps', () => {
    assert.equal(vervalMobileStoryboard.fps, 30);
    assert.equal(vervalMobileStoryboard.width, 1080);
    assert.equal(vervalMobileStoryboard.height, 1920);
    assert.equal(vervalMobileStoryboard.durationInFrames, 720);
    assert.deepEqual(
      vervalMobileStoryboard.beats.map(({ from, to }) => [from, to]),
      [[0, 90], [90, 240], [240, 390], [390, 570], [570, 630], [630, 720]],
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
