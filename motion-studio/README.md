# Verval Motion Studio

Sistema paralelo ao projeto `motion/` para anúncios verticais do Verval Mobile. A composição `VervalMobileAd` trabalha em 1080×1920, 30 fps e 24 segundos, usando captures reais do app como fonte visual.

## Fluxo local

```bash
npm install
npm run storyboard:validate
npm run narration   # Qwen3-TTS via MLX, local no Apple Silicon
npm run music
npm run stills
npm run preview
npm run render
npm run verify
```

Os renders ficam em `out/`. A narração é exportada em WAV pelo Qwen; o MP4 final usa H.264 + AAC. Para MP3, converta qualquer WAV local com `ffmpeg -i arquivo.wav -codec:a libmp3lame arquivo.mp3`.

Novos anúncios devem começar em `src/storyboards/`, reaproveitar os componentes em `src/components/` e manter os textos dentro da safe area definida em `src/storyboards/verval-mobile.ts`.
