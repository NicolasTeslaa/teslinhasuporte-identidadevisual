# Verval Motion Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar ao lado de `motion/` um sistema Remotion reutilizável e entregar o primeiro anúncio vertical de 24 segundos do Verval Mobile para Stories e Meta Ads.

**Architecture:** `motion-studio/` será um pacote Remotion independente. Um storyboard declarativo define beats, assets, copy, áudio e transições; cenas puras consomem esses beats por props; componentes de design tratam captura real, safe area, tipografia e movimento. Scripts locais geram narração pelo Qwen3-TTS, prévias, stills, MP4 e diagnósticos.

**Tech Stack:** React 19.3.1, TypeScript 7.0.2, Remotion 4.0.538, `@remotion/transitions` 4.0.538, Manrope local, FFmpeg, Qwen3-TTS MLX via `natural-narrator`, Node test runner/tsx.

**Spec:** `docs/superpowers/specs/2026-10-24-verval-motion-studio-design.md`

## Global Constraints

- O projeto `motion/` existente permanece intocado.
- A composição Verval é `1080×1920`, `30 fps`, `720 frames`.
- Capturas reais são a fonte visual principal; não recriar telas nem usar imagens artificiais genéricas.
- O storyboard precisa ser validado antes de cenas e render.
- Movimento usa `spring()`/`interpolate()`; transições são curtas e justificadas.
- Narração é local pelo Qwen3-TTS, sem APIs pagas; música e efeitos são locais.
- Texto, logo e CTA ficam dentro da safe area de Stories.
- Toda afirmação sobre o app deve vir do briefing fornecido ou ser identificada como demonstração.

---

### Task 1: Criar o pacote independente e importar as capturas reais

**Files:**
- Create: `motion-studio/package.json`
- Create: `motion-studio/tsconfig.json`
- Create: `motion-studio/remotion.config.ts`
- Create: `motion-studio/src/index.ts`
- Create: `motion-studio/public/assets/verval/IMG_2181.PNG` through `IMG_2189.PNG`
- Create: `motion-studio/public/audio/.gitkeep`
- Test: `motion-studio/tests/assets.test.ts`

**Interfaces:**
- Produces a standalone Remotion package with `npm run studio`, `npm run test`, `npm run typecheck`, `npm run stills`, `npm run preview`, `npm run render`, and `npm run verify` scripts.
- Asset paths are project-relative and resolved through `staticFile('assets/verval/<file>')`.

- [ ] **Step 1: Write the failing asset contract test**

```ts
import {existsSync} from 'node:fs';
import {join} from 'node:path';
import {test} from 'node:test';
import assert from 'node:assert/strict';

test('all Verval reference captures are copied into the studio assets', () => {
  for (const name of ['IMG_2181.PNG', 'IMG_2184.PNG', 'IMG_2185.PNG', 'IMG_2186.PNG', 'IMG_2187.PNG', 'IMG_2188.PNG', 'IMG_2189.PNG']) {
    assert.equal(existsSync(join(process.cwd(), 'public/assets/verval', name)), true, name);
  }
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `cd motion-studio && npm test -- tests/assets.test.ts`
Expected: FAIL because `motion-studio/` and its copied assets do not exist.

- [ ] **Step 3: Scaffold the package and copy the user-provided files**

Use exact Remotion versions already used by `motion/` and copy the seven PNG files from `/Users/tesla/Downloads/` without modifying pixels or overwriting the originals.

- [ ] **Step 4: Run the asset test and typecheck**

Run: `cd motion-studio && npm test -- tests/assets.test.ts && npm run typecheck`
Expected: PASS and no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add motion-studio/package.json motion-studio/tsconfig.json motion-studio/remotion.config.ts motion-studio/src/index.ts motion-studio/public/assets/verval motion-studio/tests/assets.test.ts
git commit -m "feat: scaffold Verval motion studio"
```

### Task 2: Define and validate the Verval storyboard

**Files:**
- Create: `motion-studio/src/storyboards/types.ts`
- Create: `motion-studio/src/storyboards/verval-mobile.ts`
- Create: `motion-studio/src/design/tokens.ts`
- Create: `motion-studio/src/design/safe-area.ts`
- Create: `motion-studio/scripts/validate-storyboard.ts`
- Test: `motion-studio/tests/storyboard.test.ts`

**Interfaces:**
- `StoryboardBeat = {id: string; from: number; to: number; asset: string; goal: string; onScreen?: string; narration: string; transition: 'none' | 'fade' | 'push'; focalPoint?: {x: number; y: number}}`.
- `vervalMobileStoryboard` exports `fps`, `width`, `height`, `durationInFrames`, `beats` and `safeArea`.
- `validateStoryboard(storyboard)` throws when beats overlap, leave gaps, reference missing assets, exceed duration, or place text outside the safe area.

- [ ] **Step 1: Write failing behavior tests**

```ts
test('Verval storyboard covers exactly 720 frames with no overlap', () => {
  assert.equal(vervalMobileStoryboard.durationInFrames, 720);
  assert.equal(vervalMobileStoryboard.beats[0].from, 0);
  assert.equal(vervalMobileStoryboard.beats.at(-1)?.to, 720);
  assert.doesNotThrow(() => validateStoryboard(vervalMobileStoryboard));
});

test('storyboard rejects overlapping beats', () => {
  const broken = {...vervalMobileStoryboard, beats: [{...vervalMobileStoryboard.beats[0], to: 100}, {...vervalMobileStoryboard.beats[1], from: 90}]};
  assert.throws(() => validateStoryboard(broken));
});
```

- [ ] **Step 2: Run the tests and verify the intended failure**

Run: `cd motion-studio && npm test -- tests/storyboard.test.ts`
Expected: FAIL because the storyboard types, data, and validator are absent.

- [ ] **Step 3: Implement the storyboard and validator**

Use the approved beats: opening/dashboard `0–90`, finance `90–240`, launches/payments `240–390`, recurrence/modules `390–570`, synthesis/CTA `570–720`. Keep copy contextual and label financial numbers as app demonstration data.

- [ ] **Step 4: Run tests and the standalone validator**

Run: `cd motion-studio && npm test -- tests/storyboard.test.ts && npm run storyboard:validate`
Expected: PASS and a concise JSON report with 5 beats, 720 frames, valid assets, and safe-area coordinates.

- [ ] **Step 5: Commit**

```bash
git add motion-studio/src/storyboards motion-studio/src/design motion-studio/scripts/validate-storyboard.ts motion-studio/tests/storyboard.test.ts
git commit -m "feat: add Verval storyboard contract"
```

### Task 3: Build the reusable visual system and scenes

**Files:**
- Create: `motion-studio/src/components/CaptureFrame.tsx`
- Create: `motion-studio/src/components/EditorialText.tsx`
- Create: `motion-studio/src/components/StorySafeArea.tsx`
- Create: `motion-studio/src/components/BeatTransition.tsx`
- Create: `motion-studio/src/scenes/BeatScene.tsx`
- Create: `motion-studio/src/compositions/VervalMobileAd.tsx`
- Create: `motion-studio/src/style.css`
- Modify: `motion-studio/src/index.ts`
- Test: `motion-studio/tests/layout.test.tsx`

**Interfaces:**
- `CaptureFrame({src, focalPoint, scale, pan, radius, shadow})` renders a real capture with deterministic camera movement.
- `EditorialText({eyebrow, headline, body, align})` renders safe-area copy using the design tokens.
- `BeatScene({beat})` renders one storyboard beat without hardcoded asset paths.
- `VervalMobileAd` maps beats to `TransitionSeries.Sequence` and uses `fade()`/`none()` with `springTiming()` only where declared by the storyboard.

- [ ] **Step 1: Write failing layout tests**

```tsx
test('composition keeps the Stories safe area and real capture asset', () => {
  const html = renderToStaticMarkup(<VervalMobileAd />);
  assert.match(html, /1080/);
  assert.match(html, /IMG_2181\.PNG|assets\/verval/);
  assert.doesNotMatch(html, /particle|neon|glow-grid/i);
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `cd motion-studio && npm test -- tests/layout.test.tsx`
Expected: FAIL because the components and composition do not exist.

- [ ] **Step 3: Implement tokens, components and scenes**

Use the existing approved Teslinha motion tokens only for framing and typography; use the Verval screenshots as the product visual. Apply scale/pan using frame-driven `interpolate()` and easing. Keep overlays sparse: one headline, one short support line, and the final CTA.

- [ ] **Step 4: Run layout tests and typecheck**

Run: `cd motion-studio && npm test -- tests/layout.test.tsx && npm run typecheck`
Expected: PASS with no CSS transition warnings and no type errors.

- [ ] **Step 5: Commit**

```bash
git add motion-studio/src/components motion-studio/src/scenes motion-studio/src/compositions motion-studio/src/style.css motion-studio/src/index.ts motion-studio/tests/layout.test.tsx
git commit -m "feat: add reusable Verval motion scenes"
```

### Task 4: Add local narration, music ducking and timeline markers

**Files:**
- Create: `motion-studio/src/audio/audio-config.ts`
- Create: `motion-studio/src/audio/AudioTracks.tsx`
- Create: `motion-studio/src/narration/verval-script.ts`
- Create: `motion-studio/scripts/generate-narration.ts`
- Create: `motion-studio/scripts/mix-audio.ts`
- Create: `motion-studio/public/audio/.gitkeep`
- Test: `motion-studio/tests/audio-timeline.test.ts`

**Interfaces:**
- `vervalNarrationScript` exports one contextual paragraph per storyboard beat and never repeats the on-screen headline verbatim.
- `AudioCue = {id; from; to; text; file}` links each narration clip to a beat.
- `AudioTracks` mixes narration, local music and optional transition SFX with deterministic ducking.

- [ ] **Step 1: Write failing audio timeline tests**

```ts
test('audio cues align with storyboard beats and include a final CTA', () => {
  assert.equal(vervalNarrationScript.length, vervalMobileStoryboard.beats.length);
  assert.match(vervalNarrationScript.at(-1)!.text, /Verval/i);
  assert.notEqual(vervalNarrationScript[0].text, vervalMobileStoryboard.beats[0].onScreen);
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `cd motion-studio && npm test -- tests/audio-timeline.test.ts`
Expected: FAIL because the script and audio timeline do not exist.

- [ ] **Step 3: Implement the local audio pipeline**

Invoke the installed `natural-narrator` CLI with the approved local Qwen3-TTS model, generate WAV at 48 kHz, normalize with FFmpeg, and create an original low-volume music bed in code or reuse an explicitly local asset. Do not call remote APIs. The script must fail with a clear message when the local runtime is unavailable.

- [ ] **Step 4: Run tests and generate the narration**

Run: `cd motion-studio && npm test -- tests/audio-timeline.test.ts && npm run narration`
Expected: PASS and one WAV per cue plus a mixed WAV with deterministic durations.

- [ ] **Step 5: Commit**

```bash
git add motion-studio/src/audio motion-studio/src/narration motion-studio/scripts/generate-narration.ts motion-studio/scripts/mix-audio.ts motion-studio/tests/audio-timeline.test.ts
git commit -m "feat: add local Verval narration timeline"
```

### Task 5: Add previews, stills, final render and verification

**Files:**
- Create: `motion-studio/scripts/render.ts`
- Create: `motion-studio/scripts/verify.ts`
- Create: `motion-studio/scripts/review-stills.ts`
- Create: `motion-studio/tests/render-contract.test.ts`
- Create: `motion-studio/QA.md`

**Interfaces:**
- `npm run stills` emits `out/verval-motion/stills/` at opening, every beat boundary, and CTA.
- `npm run preview` emits a smaller MP4 for quick review.
- `npm run render` emits `out/verval-motion/verval-mobile-story.mp4`.
- `verify.ts` exits nonzero for wrong dimensions/fps/duration/codecs, incomplete decode, missing audio, unsafe text markers, or beat/audio misalignment.

- [ ] **Step 1: Write failing render-contract tests**

```ts
test('render contract targets vertical Stories output', () => {
  assert.deepEqual(renderContract, {width: 1080, height: 1920, fps: 30, durationInFrames: 720, videoCodec: 'h264', audioCodec: 'aac'});
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `cd motion-studio && npm test -- tests/render-contract.test.ts`
Expected: FAIL because the render scripts and contract are absent.

- [ ] **Step 3: Implement render, preview, stills and verification commands**

Use Remotion’s local rendering APIs/CLI, `--timeout` high enough for local audio assets, and FFmpeg inspection. Generate contact-sheet style stills for visual review, but do not use external cloud rendering.

- [ ] **Step 4: Run the complete verification**

Run:

```bash
cd motion-studio
npm test
npm run typecheck
npm run storyboard:validate
npm run stills
npm run preview
npm run render
npm run verify
```

Expected: all tests pass; final MP4 is 1080×1920, 30 fps, 24 s, H.264 with AAC 48 kHz; stills exist for all five beats and the CTA.

- [ ] **Step 5: Review visual output and fix one bounded batch**

Inspect the stills and preview for text cropping, unsafe CTA, excessive zoom, unreadable captures, abrupt transitions, and audio drift. Apply fixes as one bounded batch, rerun `npm run stills`, `npm run preview`, and `npm run verify`, then stop.

- [ ] **Step 6: Commit and push**

```bash
git add motion-studio
git commit -m "feat: add Verval professional video production studio"
git push origin main
```

No user-provided untracked media outside `motion-studio` may be staged.

## Self-review

- Covers all spec requirements: independent package, real Verval captures, 24-second Stories format, storyboard-first workflow, reusable components, local Qwen3-TTS, music ducking, MP4 output, previews, stills, verification, and visual QA.
- No placeholder task language or unresolved decisions remain in the plan.
- File interfaces are explicit and later tasks consume only outputs named by earlier tasks.
