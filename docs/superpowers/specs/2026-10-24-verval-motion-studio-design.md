# Verval Motion Studio — Design

## Objetivo

Criar um sistema de produção de vídeos publicitários em Remotion ao lado do projeto `motion/` existente, sem alterar o comercial já aprovado. O primeiro projeto será um anúncio de 24 segundos para Stories e Meta Ads apresentando o app mobile Verval.

## Entrega inicial

- Composição vertical `1080×1920`, `30 fps`, `24 s` (`720 frames`).
- Storyboard executável antes das cenas, com cada beat contendo tempo, objetivo, captura, texto, narração e transição.
- Capturas reais fornecidas em `/Users/tesla/Downloads/IMG_2181.PNG` até `IMG_2189.PNG`, copiadas para a área de assets do novo projeto sem editar o original.
- Quatro blocos narrativos: abertura/dashboard; visão financeira; lançamentos e pagamentos; recorrência/módulos; fechamento com CTA.
- Narração local pelo Qwen3-TTS usando a skill `natural-narrator`, com roteiro contextual que complemente as telas.
- Música original discreta ou arquivo local fornecido pelo usuário, com ducking durante a fala.
- MP4 H.264 com áudio AAC a 48 kHz, mais prévia reduzida e quadros de revisão.

## Arquitetura recomendada

O novo pacote vive em `motion-studio/`, com seu próprio `package.json`, `src/index.ts` e `public/`. O projeto atual `motion/` permanece intacto. O núcleo é separado em camadas:

1. `src/design/`: tokens de cor, tipografia, espaçamento, safe areas de Stories e regras de movimento.
2. `src/components/`: moldura de captura, recortes, etiquetas, headline, CTA, máscara e tratamento de imagem.
3. `src/storyboards/`: dados declarativos de cada projeto, incluindo frames, áudio, copy e asset.
4. `src/scenes/`: cenas puras que consomem um beat do storyboard e não conhecem caminhos fixos.
5. `src/compositions/`: composição principal, versões de revisão e stills.
6. `scripts/`: validação do storyboard, geração/normalização da narração, prévia, render final e inspeção visual.

As telas do Verval serão exibidas como conteúdo real dentro de um enquadramento editorial. O sistema usa movimento de câmera, escala, máscaras e cortes por continuidade; não recria dashboards, adiciona partículas genéricas ou inventa números e funcionalidades além do material fornecido.

## Direção do primeiro vídeo

- Abertura: pergunta curta sobre administrar o negócio pelo celular; dashboard real entra com leve aproximação.
- Meio 1: destaque de saldo, entradas, saídas e lucro previsto; os dados permanecem os da captura e são tratados como demonstração do app.
- Meio 2: passagem por lançamentos e pagamentos com corte por continuidade entre abas e cartões.
- Meio 3: recorrência, módulos, clientes, produtos e serviços em sequência de capturas com movimento vertical controlado.
- Fechamento: frase síntese e CTA para conhecer o Verval Mobile, com marcação visual e área segura para Stories.

## Regras de movimento e áudio

- Usar `spring()`/`interpolate()` e curvas de entrada/saída; nenhum movimento baseado em tempo real ou CSS transition.
- Usar `TransitionSeries` somente para fades, wipes ou pushes curtos e justificados; a transição padrão será `fade` ou `none` quando a continuidade da captura for suficiente.
- Manter textos e CTA dentro de uma safe area de Stories, deixando respiro para controles da plataforma.
- Sincronizar o início dos destaques, cortes e transições com marcadores da narração; música com redução gradual durante a fala.
- Não usar API paga, recurso cloud ou download de asset externo sem aprovação explícita.

## Revisão e critérios de aceitação

- Storyboard validado como JSON/TypeScript antes da implementação visual.
- Testes automatizados verificam duração, frames sem sobreposição, assets existentes, safe area e presença de CTA.
- `npm run stills` gera quadros de abertura, cada corte e fechamento.
- `npm run preview` gera uma prévia menor para revisão rápida.
- `npm run render` gera MP4 final em 1080×1920, H.264 e AAC.
- `npm run verify` inspeciona metadados, decodifica o vídeo completo e verifica se o áudio cobre todos os beats.
- A revisão visual deve registrar cortes de texto, captura ampliada demais, transição agressiva, dessíncrono entre fala e imagem e qualquer uso indevido de dado demonstrativo.

## Fora do escopo da primeira composição

- Alterar ou substituir o projeto `motion/` existente.
- Recriar funcionalidades do Verval em React.
- Criar imagens artificiais de pessoas, escritórios ou dispositivos.
- Publicar automaticamente o anúncio no Meta Ads.
