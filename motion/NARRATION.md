# Narração contextual — voz A e trilha original

Usuário aprovou o roteiro contextual e escolheu a voz A em 23/10/2026. A narração explica o problema, o levantamento da operação, a construção sob medida e os benefícios esperados. O nome da empresa aparece somente no encerramento. Não houve alteração visual.

## Voz e sincronização

Voz A: `pm_alex`, Kokoro v1.0, português brasileiro (`pt-br`), velocidade nativa 1.0, sem alteração de pitch. Mesmos parâmetros da amostra escolhida: pausa entre frases de 0,32 s e entre orações de 0,12 s. Síntese local com kokoro-onnx. Oito parágrafos, um por cena, com pausas naturais; nenhum trecho desta versão foi acelerado ou truncado.

WAV: `public/audio/narration-voz-a-v02.wav`, PCM mono, 48 kHz, exatamente 60 segundos, alvo -16 LUFS. Manifesto de duração e janelas em `src/narration-manifest.json`.

| Início | Fim da fala | Texto |
|---|---|---|
| 0.33 s | 7.17 s | Quando cada parte da empresa depende de uma ferramenta diferente, acompanhar a operação fica mais difícil. |
| 8.27 s | 15.03 s | A equipe perde tempo procurando informações, repetindo cadastros e conferindo o que já deveria estar organizado. |
| 16.30 s | 21.53 s | Para resolver isso, começamos entendendo como você trabalha e o que precisa melhorar. |
| 23.30 s | 27.30 s | Esse entendimento orienta a construção de um sistema sob medida. |
| 29.30 s | 41.23 s | Podemos reunir o histórico dos clientes, facilitar o acompanhamento da operação e conectar tarefas que hoje dependem de atualizações manuais. Cada recurso é definido a partir da sua necessidade. |
| 43.30 s | 48.70 s | Assim, sua equipe pode dedicar mais atenção ao atendimento e às decisões do negócio. |
| 50.27 s | 54.77 s | E, conforme surgem novas demandas, podemos evoluir a solução com você. |
| 56.23 s | 58.97 s | Conte seu desafio para a Teslinha Suporte. |

## Trilha de fundo

Composição instrumental original em `src/music.ts`: 96 BPM, acordes suaves Cmaj7/Am7/Fmaj7/Gsus, notas dedilhadas e pulsação leve, sem voz e sem samples externos. O arquivo `public/audio/music-original-v01.wav` é gerado por `npm run music`. A faixa tem entrada de 2 s e saída de 3 s.

A mixagem mantém a voz em volume 1, música em 0,12 durante a fala e até 0,20 nas pausas, e efeitos em 0,18 durante a fala. Reduções e recuperações são graduais. Música sem narração usa o volume configurável em `audioConfig.musicVolume`. `music: null` desliga a trilha.

## Reprodução e direitos

O render usa apenas os arquivos locais incluídos; não precisa baixar modelo nem instalar Python para gerar o MP4. Os WAVs anteriores e os vídeos anteriores são preservados. A nova saída é `out/teslinha-commercial-voz-a-musica-v02.mp4`.

Para regenerar a voz, siga `README.md`. Modelo Kokoro v1.0 sob Apache 2.0, runtime kokoro-onnx sob MIT; cópias das licenças em `licenses/`. Não há clonagem de pessoa específica. O modelo e suas vozes não são distribuídos neste repositório, apenas o áudio gerado. Fontes: [Kokoro](https://huggingface.co/hexgrad/Kokoro-82M), [vozes pt-BR](https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md), [runtime e downloads](https://github.com/thewh1teagle/kokoro-onnx).

A checagem do MP4 compara cada região com a forma de onda da voz original (correlação mínima 0,7, tolerância de atraso de 20 ms), além da energia. Música sozinha não satisfaz esse teste. Não é transcrição nem avaliação subjetiva da naturalidade. A escolha subjetiva da voz foi feita pelo usuário ouvindo as amostras.


SHA-256 dos arquivos do modelo usados para gerar esta versão:

- `kokoro-v1.0.onnx`: `beb0d1848dee9a49da392cc3df26958d46cfa35d321edf434f52949153f0df3a`
- `voices-v1.0.bin`: `bca610b8308e8d99f32e6fe4197e7ec01679264efed0cac9140fe9c29f1fbf7d`
