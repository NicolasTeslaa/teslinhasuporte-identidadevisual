import { vervalMobileStoryboard } from '../src/storyboards/verval-mobile';
import { validateStoryboard } from '../src/storyboards/validate';
const errors = validateStoryboard(vervalMobileStoryboard);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Storyboard validado: ${vervalMobileStoryboard.beats.length} beats, ${vervalMobileStoryboard.durationInFrames} frames.`);
