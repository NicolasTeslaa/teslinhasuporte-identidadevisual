# Teslinha Suporte — comercial vertical

Projeto completo React + TypeScript + Remotion com oito cenas independentes e comercial de **60 segundos, 1080×1920, 30 FPS**. Roteiro e identidade aprovados em 23/10/2026. Logos oficiais locais; interfaces e animações originais em HTML/CSS/SVG.

## Executar

Node.js 22 ou superior e npm. Na pasta `motion/`:

```bash
npm ci
npm run audio
npm run studio
```

No Studio, selecione `TeslinhaCommercial` ou `Cenas / Cena01` … `Cena08`. O Studio oferece reprodução, navegação por frame e renderização. O navegador de renderização do Remotion é baixado automaticamente na primeira execução; fonte, logo e efeitos ficam locais. Depois desse preparo, o render não depende de serviços externos.

```bash
npm run validate   # testes de comportamento, layout no Chromium, contraste e TypeScript
npm run stills     # 13 quadros de cenas e 7 de transições em ../out/stills/
npm run preview    # MP4 540×960 para revisão rápida
npm run render     # ../out/teslinha-commercial.mp4, H.264 yuv420p, CRF 18
npm run verify     # ffprobe + decodificação completa FFmpeg
```

Os scripts de render geram o WAV automaticamente caso ele não exista. A primeira execução de `validate` também pode baixar o Chromium. Artefatos em `out/`, áudio gerado e dependências não são versionados. `package-lock.json` fixa as versões do projeto.

## Configurar

- `src/config.ts`: mensagens principais, paleta, marca, contato, dados demonstrativos, duração e áudio.
- `src/scenes/Scene01.tsx` … `Scene08.tsx`: oito cenas originais.
- `src/components/Software.tsx`: interfaces demonstrativas de clientes/vendas, gestão e automações.
- `src/animation.ts`: progressão e modelos determinísticos; não há `Math.random`, relógio ou CSS animations.
- `src/timeline.ts`: sobreposição de 12 frames sem encurtar os 1800 frames contratados.
- `public/brand/teslinha-logo.png`: cópia da logo oficial de `assets/logo/LOGO PNG TRANSPARENTE.png`.
- `src/style.css`: tipografia Manrope local e estilos das interfaces.

Para alterar o WhatsApp padrão, edite `brand.contact`. O input prop `contact` também permite trocar o contato no Studio ou no CLI:

```bash
npx remotion render src/index.ts TeslinhaCommercial ../out/teslinha-contato.mp4 --props='{"contact":"seu contato","effects":true,"music":null}'
```

O render do CLI acima exige gerar os efeitos antes com `npm run audio`.

## Áudio e direitos

Esta entrega usa **sound design sintético original** de transições, cliques e revelação de marca, gerado deterministicamente por `src/audio.ts`. Não contém música nem locução, nem áudio extraído da referência. O arquivo pode ser substituído em `public/audio/sound-design.wav`.

Para adicionar música cuja licença você possui, coloque o arquivo em `public/audio/music.mp3` e altere `audioConfig.music` para `audio/music.mp3` em `src/config.ts`. O volume é configurável e o componente aplica entrada/saída gradual. Também pode passar `music` nos input props. `effects: false` exporta sem os efeitos.

A fonte Manrope é distribuída sob SIL Open Font License 1.1; a licença está em `licenses/manrope-OFL.txt`. Logo e identidade foram fornecidas pelo usuário. A referência nunca integra o bundle nem o vídeo final. O uso do Remotion obedece à [licença do fornecedor](https://www.remotion.dev/license); este projeto não inclui chave de licença.

## Qualidade e limites

Margens principais: 84 px laterais, 220 px superiores e 300 px inferiores. A interface do Instagram pode variar; os quadros foram verificados nessa área conservadora. Dados de CRM e gestão são fictícios e identificados como demonstração; não representam clientes, faturamento ou resultados da Teslinha.

Veja `REFERENCE.md` para análise da referência e `QA.md` para evidências dos testes, inspeção e render final.
