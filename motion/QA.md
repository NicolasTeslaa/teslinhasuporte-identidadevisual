# Validação — 23/10/2026

## Resultado

`out/teslinha-commercial.mp4`: 60 segundos, 1800 frames, 1080×1920, 30 FPS, H.264 yuv420p e AAC a 48 kHz. `npm run verify` aprovou os metadados com ffprobe e decodificou todo o vídeo com FFmpeg (`-xerror -v error`), sem mensagens de erro. Relatório local: `out/verification.json`.

## Testes e TDD

- `npm run validate`: **13 testes passaram**, TypeScript estrito passou.
- `python3 -m unittest discover -s tests -v`, na raiz: **15 testes existentes passaram**.
- `npm audit` durante instalação: **0 vulnerabilidades**.
- Detector Impeccable sobre `motion/src`: nenhuma ocorrência retornada.

Os testes foram escritos e executados antes das implementações de timeline, cenas/modelos e áudio/contrato de mídia. RED foi observado por ausência das funções/componentes, seguido de GREEN. Um teste real no Chromium reproduziu o corte nas janelas de CRM e gestão; o layout foi corrigido e o teste passou. A revisão independente encontrou um risco no verificador aceitar erros recuperáveis; novo teste falhou antes de `assertDecodeLog`, passou após a implementação, e o verificador recebeu `-xerror` e inspeção de stderr.

## Inspeção visual

Renderizados 13 quadros de conteúdo e 7 de transições, na resolução final: frames 60, 190, 340, 530, 645, 800, 940, 1080, 1225, 1345, 1450, 1605 e 1765; transições 246, 486, 696, 876, 1296, 1506 e 1686. Arquivos em `out/stills/`. Prévia MP4 de 60 segundos também gerada para revisão.

Inspeção de logo, hierarquia, mensagens, demonstrações, CTA, diagramas e trocas de fundo. Corrigido o conteúdo inicialmente cortado nas janelas de CRM e gestão; a janela final tem 670 px e o gráfico foi compactado preservando os rótulos. Notificação e identificação de dados ilustrativos ficam na margem segura. O teste de layout carrega a fonte real e mede scrollHeight/clientHeight e limites dos elementos no Chromium. A conferência final também identificou uma sobreposição transitória entre a notificação e a legenda; o teste foi ampliado para seis frames de entrada e passou após reduzir o deslocamento e reservar espaço entre os dois elementos.

Pares verificados com contraste mínimo 4,5:1: branco/azul, azul/branco, marinho/fundo claro, azul claro/marinho e texto secundário/fundo claro. Essa checagem cobre esses pares de texto, não significa certificação de acessibilidade de todo o vídeo ou garantia sobre sobreposições variáveis do Instagram.

## Revisão independente

Revisão de código, timeline, determinismo, áudio, scripts e testes. Único achado relevante: risco no verificador de decodificação, corrigido. Rechecagem confirmou 13/13 testes e TypeScript, sem achados pendentes no escopo revisado.

## Direitos e limites

Logo fornecida pelo usuário; Manrope com licença OFL incluída. Efeitos procedurais originais. Sem música licenciada externa nem locução. Vídeo de referência usado apenas em análise; nenhum quadro, música, CTA ou marca de terceiros integra o comercial. Números das telas são exemplos identificados. O WhatsApp é o informado no perfil institucional.
