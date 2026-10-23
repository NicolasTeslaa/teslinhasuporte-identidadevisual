# Teslinha Commercial Implementation Plan

> Execução nesta conversa, após aprovação explícita do roteiro, usando Superpowers TDD e verificação antes de conclusão. Sem criar worktree nem alterar os arquivos alheios à tarefa.

**Goal:** entregar projeto Remotion executável e comercial vertical final da Teslinha Suporte.

**Architecture:** configuração e modelos determinísticos separados dos componentes visuais. Oito cenas independentes compõem uma timeline com transições sobrepostas. Scripts de Node geram sound design, quadros, previews e MP4 e verificam o arquivo final.

**Tech Stack:** React, TypeScript, Remotion, @remotion/transitions, SVG/CSS, Node test runner + tsx.

**Spec:** `docs/superpowers/specs/2026-10-23-teslinha-commercial-design.md`.

## Global constraints

- 1080×1920, 30 FPS, 1800 frames, H.264.
- Paleta e logo oficiais existentes; roteiro aprovado na spec.
- `out/teslinha-commercial.mp4`; nada de conteúdo da referência no render final.
- Dados reconhecíveis como exemplos; sem resultados comerciais inventados.
- Render sem rede, fontes locais, áudio original/substituível.

## 1. Timeline e modelo de animação

- [x] Escrever `motion/tests/timeline.test.ts`: testar cobertura sem lacunas, transições de 12 frames, limites inválidos e frames representativos.
- [x] Executar `npx tsx --test tests/timeline.test.ts` e confirmar RED pela ausência das funções.
- [x] Criar `src/config.ts` e `src/timeline.ts` com os inícios 0, 240, 480, 690, 870, 1290, 1500 e 1680; implementar seleção por frame e progressão com clamp.
- [x] Confirmar GREEN e registrar direção em documentação do projeto.

## 2. Cenas e composição

- [x] Escrever `tests/scenes.test.tsx`, renderizando componentes reais para verificar primeira/segunda mensagem, demonstrações rotuladas, transformação de tarefas e CTA configurável; confirmar RED.
- [x] Criar componentes comuns em `src/components/`, oito arquivos em `src/scenes/`, modelos em `src/animation.ts`, `src/Commercial.tsx`, `src/Root.tsx`, `src/index.ts`, `src/style.css`.
- [x] Registrar composição principal e oito composições independentes. Usar `TransitionSeries`, `spring`, `interpolate` e `useCurrentFrame`.
- [x] Confirmar GREEN, executar `npm run typecheck` e renderizar quadros.

## 3. Áudio e renderização

- [x] Escrever testes de WAV (duração, saturação, silêncio/energia) e contrato de mídia (rejeitar dimensões, codec e duração incorretos); confirmar RED.
- [x] Implementar `src/audio.ts`, `scripts/generate-audio.ts`, `scripts/render.ts`, `scripts/verify.ts`; áudio determinístico de efeitos sem música emprestada.
- [x] Extrair metadados e quadros da referência com as ferramentas FFmpeg do Remotion, registrar análise em `motion/REFERENCE.md`.
- [x] Executar `npm run audio`, `npm run validate`, `npm run stills`, `npm run preview`; inspecionar quadros e movimento.

## 4. Entrega verificada

- [x] Renderizar MP4 final com `npm run render`; verificar com `npm run verify` e decodificar com FFmpeg.
- [x] Atualizar `motion/README.md`, README raiz, licenças de fonte e instruções de áudio/configuração.
- [x] Executar regressão Python e validações Node, revisar diff e pedir revisão independente de código.
- [x] Inspecionar `.github/workflows/`; sem Actions, stage apenas os arquivos da tarefa, commit e push no remoto configurado. Relatar hash e resultado real.
