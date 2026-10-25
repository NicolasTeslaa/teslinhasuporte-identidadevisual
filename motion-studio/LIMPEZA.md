# Comercial — limpeza de computadores e videogames

Composição independente `LimpezaAd`: 30 segundos, 900 quadros, 1080×1920, 30 fps. Roteiro enxuto aprovado em 25/10/2026. Oferta: R$ 200 por equipamento, PC ou videogame, coleta e entrega gratuitas em Várzea Paulista.

## Direção e arquivos

A direção deste anúncio usa #0551DA, #FFFFFF, #4A494D e #C2CEE1 conforme o briefing, preservando as demais peças. Manrope local 600/700/800. Equipamentos, ventoinhas, dissipador, escova, residência, assistência e veículo são geometrias Three.js originais, com movimento determinístico por quadro. Não há imagens geradas nem modelos 3D de terceiros. Logo original copiada sem alteração de `assets/logo/LOGO PNG TRANSPARENTE.png`.

Textos essenciais entre x=94 e x=934. Conteúdo de y=255 até y=1580; áreas superior, inferior e direita reservadas à interface das redes. Isso é uma margem conservadora, não simulação de todas as variantes da interface Meta.

- `src/limpeza/timeline.ts`: cortes, legendas e estados da animação.
- `src/limpeza/models.ts`: geometrias e movimentação.
- `src/limpeza/LimpezaAd.tsx` e `limpeza.css`: composição e textos.
- `src/limpeza/captions.json`: 12 legendas, com tempos revisados a partir de alinhamento local.
- `src/limpeza/voice-manifest.json`: cinco falas e seus intervalos reais.
- `public/limpeza/`: logo, falas separadas, narração montada, trilha e SRT.

## Áudio

Síntese local Qwen3-TTS 0.6B Base, velocidade 1.0. Referência: voz **sintética** pm_alex já existente no projeto, extraída dos primeiros 7,4 segundos de fala em `motion/public/audio/narration-voz-a-v02.wav`. Não representa nem clona uma pessoa identificável. Texto exato da referência: “Quando cada parte da empresa depende de uma ferramenta diferente, acompanhar a operação fica mais difícil.”

As cinco falas finais não passaram por aceleração, alteração de tom ou corte de palavras. Foram posicionadas em 0,5; 5,6; 11,2; 17,4 e 25,8 segundos. Durações: 3,44; 4,08; 5,44; 6,80 e 2,72 segundos. Montagem mono PCM 48 kHz e normalização loudnorm I=-18, TP=-2, LRA=7. A trilha procedural original combina arpejo, baixo, percussão e whooshes; sem samples de terceiros.

A transcrição local Qwen confirmou o conteúdo das falas, com variação de grafia no nome próprio Várzea Paulista. Whisper foi usado como apoio de alinhamento, não como fonte do texto: suas hipóteses incorretas e alucinações em silêncio foram descartadas. Não há certificação de revisão auditiva humana.

## Executar

```sh
cd motion-studio
npm ci
npm test
npm run typecheck
npx tsx scripts/music-limpeza.ts
npx tsx scripts/render-limpeza.ts stills
npx tsx scripts/render-limpeza.ts final
```

Saídas intermediárias em `out/limpeza/`. WAVs finais incluídos permitem renderizar sem modelo TTS. Chromium usa ANGLE para WebGL. O MP4 final inclui legendas visíveis; `public/limpeza/legendas.srt` também permite importação externa.

## Validação

TDD observado: falhas esperadas para seleção de cena, legenda temporal, rejeição de sobreposição, percurso, trilha e cobertura de legendas; em seguida implementações e testes passando. Revisão de dez quadros representativos; metadados e decodificação completa do MP4 verificados na entrega. Contrastes: branco/azul 6,57:1; branco/grafite 8,93:1. Cinza/azul 4,13:1, reservado a título grande e decoração.

A revisão automatizada de áudio não substitui uma avaliação humana de naturalidade e pronúncia. Nada foi publicado nas redes sociais.

## Entrega em 25/10/2026

- MP4: `assets/marketing/2026-10-25_10-42-24_limpeza-computadores-videogames_v01.mp4`
- SRT: `assets/marketing/2026-10-25_10-42-24_limpeza-computadores-videogames_v01.srt`
- Dez testes passaram; TypeScript sem erros. Verificador confirmou vídeo, áudio e contêiner com 30,000 s e decodificação completa.
- Revisão independente: dois ajustes de contraste resolvidos; revisão final aprovou esses ajustes.
- MP4 ajustado com cópia do vídeo e reencodificação AAC para eliminar 16 ms de padding no contêiner.
