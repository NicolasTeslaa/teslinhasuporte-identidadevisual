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


## Atualização — versão com narração masculina

Usuário solicitou voz masculina em português brasileiro, natural, confiante e comercial, acompanhando as animações. A nova saída é `out/teslinha-commercial-narrado.mp4`; a versão anterior permanece disponível.

- `npm run validate`: **24 testes Node + 1 teste Python de cache passaram; TypeScript passou**.
- Regressão da raiz: **15 testes existentes passaram**. Total: **40 testes**.
- `npm run verify`: decodificação completa sem erros; H.264 yuv420p, 1080×1920, 30 FPS, 1800 frames, AAC 48 kHz; todas as 16 regiões de fala com energia audível.
- `npm run verify -- --no-narration`: versão anterior também verificada, sem erros.
- Novos testes escritos e executados em RED antes da implementação de planejamento, montagem, mixagem, leitura de PCM, detecção de trecho inaudível, cache e parsing de argumentos; depois GREEN.
- Revisão independente apontou risco de cache antigo no caminho sem síntese e interpretação da flag isolada como arquivo. Ambos corrigidos com testes; rechecagem confirmou validação completa, sem achados pendentes nesse escopo.

Veja `NARRATION.md` para voz, texto completo, tempos e regeneração. A energia por trecho valida presença/volume, sem alegar transcrição automática ou avaliação subjetiva da voz. A narração é sintética e usa uma voz padrão; não é clonagem de pessoa real específica. O WAV final fica versionado para render local reproduzível.


## Atualização — voz A contextual e trilha (v02)

Usuário escolheu a voz A (Kokoro `pm_alex`) entre duas amostras e aprovou narração contextual, com a marca apenas na última frase, e música discreta. Oito parágrafos em vez de ler os títulos das telas. Nenhum parágrafo foi acelerado ou truncado. Identidade e vídeo visual permanecem iguais.

- `npm run validate`: **29 testes Node + 1 Python**, TypeScript passou.
- Regressão da raiz: **15 testes**, todos passaram. Total: **45 testes**.
- `npm run render`: gerou `out/teslinha-commercial-voz-a-musica-v02.mp4`.
- `npm run verify`: H.264 yuv420p, 1080×1920, 30 FPS, 1800 frames, 60 segundos, AAC 48 kHz; decodificação completa sem erros. Oito falas conferidas por correlação com o WAV original da voz A.
- TDD: observado RED e GREEN para regra editorial de menção da marca, trilha determinística sem clipping, e volume musical reduzido durante a voz. Testes de integração conferem manifesto, texto e durações reais.
- A revisão independente encontrou que energia total do áudio poderia aceitar música sozinha como voz. Novo teste com os WAVs reais reproduziu a ausência da validação por referência. A implementação passou a exigir correlação de forma de onda por região (mínimo 0,7, tolerância de atraso de 20 ms), além da energia. Música sem voz é rejeitada; voz com música é aceita.

Música instrumental original gerada em `src/music.ts`, 96 BPM, sem samples externos, com fades e ducking. Narração local a velocidade nativa, sem alteração de pitch; oito WAVs intermediários foram montados nas janelas aprovadas. Arquivos finais incluídos no repositório e no ZIP para render offline, após instalação das dependências e Chromium.

A verificação de forma de onda confirma presença e posição da voz gerada, sem alegar análise semântica nem avaliação subjetiva da interpretação. A voz foi escolhida pelo usuário ouvindo as amostras. Licenças do modelo Apache 2.0 e runtime MIT incluídas. Modelos não são distribuídos no ZIP.

Medição final da mixagem AAC: loudness integrado **-17,42 LUFS**, true peak **-4,19 dBTP**, LRA **4,2 LU**, sem clipping. Correlação mínima da voz no vídeo: **0,9967**. Rechecagem independente confirmou 29 testes Node + 1 Python e TypeScript, sem achados pendentes no escopo revisado.
