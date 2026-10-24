import { bundle } from '@remotion/bundler';
import { openBrowser, selectComposition, renderMedia, renderStill } from '@remotion/renderer';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const mode = process.argv[2] ?? 'video';
if (!['video', 'preview', 'stills'].includes(mode)) throw new Error('Use video, preview ou stills.');
await mkdir('out/stills', { recursive: true });
const serveUrl = await bundle({ entryPoint: resolve('src/index.tsx'), webpackOverride: (config) => config });
const browser = await openBrowser('chrome', { logLevel: 'error' });
try {
  const composition = await selectComposition({ serveUrl, id: 'VervalMobileAd', puppeteerInstance: browser });
  if (mode === 'stills') {
    const frames = [30, 150, 270, 360, 450, 600, 750, 870];
    for (const frame of frames) await renderStill({ serveUrl, composition, puppeteerInstance: browser, frame, output: resolve(`out/stills/frame-${String(frame).padStart(4, '0')}.png`), imageFormat: 'png', logLevel: 'error' });
    console.log(`Stills renderizados: ${frames.length}`);
  } else {
    const outputLocation = resolve(`out/verval-mobile-${mode}.mp4`);
    await renderMedia({ serveUrl, composition, puppeteerInstance: browser, outputLocation, codec: 'h264', pixelFormat: 'yuv420p', crf: mode === 'preview' ? 23 : 18, scale: mode === 'preview' ? 0.5 : 1, concurrency: 2, imageFormat: 'jpeg', jpegQuality: 95, audioCodec: 'aac', audioBitrate: '192k', logLevel: 'error', onProgress: ({ progress }) => { if (Math.round(progress * 100) % 10 === 0) process.stdout.write(`\rRender ${Math.round(progress * 100)}%`); } });
    console.log(`\nVídeo: ${outputLocation}`);
  }
} finally { await browser.close({ silent: true }); }
