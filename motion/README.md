# Teslinha Suporte — comercial com voz A e música

React + TypeScript + Remotion. **60 segundos, 1080×1920, 30 FPS**, oito cenas independentes, identidade e logo oficiais. Roteiro contextual aprovado; voz masculina A escolhida pelo usuário. A narração complementa os textos visuais e cita a marca apenas na última frase. Trilha instrumental original discreta, com redução de volume durante a voz.

## Executar

Node.js 22+, npm e Python 3 somente para o teste de cache. Render e Studio usam os WAVs incluídos, sem necessidade de modelo, conta, API ou rede após instalar dependências e Chromium.

```bash
npm ci
npm run studio
npm run render
npm run verify
```

O Studio oferece `TeslinhaCommercial` e `Cenas / Cena01` … `Cena08`. A composição principal inclui narração e música; as cenas individuais servem à inspeção visual.

```bash
npm run validate  # testes Node, cache Python e TypeScript
npm run stills    # 20 quadros de conteúdo e transições
npm run preview   # 540×960, voz A e música
npm run render    # ../out/teslinha-commercial-voz-a-musica-v02.mp4
npm run verify    # metadados, decodificação completa e comparação das oito falas com a voz de referência
npm run audio     # regenerar efeitos originais
npm run music     # regenerar trilha original determinística
```

O render baixa Chromium na primeira execução. Depois disso, fonte, logo, narração e música são locais. Arquivos em `out/` não são versionados. Os áudios finais de voz e música ficam versionados; efeitos são gerados automaticamente se ausentes.

## Configuração

- `src/config.ts`: identidade, dados demonstrativos, contato e música padrão.
- `src/narration-config.ts`: roteiro contextual e janela de cada parágrafo.
- `src/narration-manifest.json`: posições e durações reais, gerado pelo montador.
- `src/audio-mix.ts`: redução gradual de música e efeitos durante a voz.
- `src/music.ts`: trilha instrumental original, sem samples externos.
- `src/scenes/` e `src/components/`: cenas e interfaces originais HTML/CSS/SVG.

Input props: `contact` (texto), `narration` (booleano), `effects` (booleano), `music` (caminho relativo a public/ ou null). Alterar o contato não muda o áudio: o número não é falado.

Exemplo de exportação só com voz, sem música ou efeitos:

```bash
npx remotion render src/index.ts TeslinhaCommercial ../out/teslinha-so-voz.mp4 --props='{"contact":"(11) 91024-6542","narration":true,"effects":false,"music":null}'
```

## Regenerar a voz escolhida

O WAV já incluído é suficiente para renderizar. Estes passos opcionais reproduzem a síntese local com o mesmo modelo e a mesma voz A. Requerem Python 3.12 e cerca de 340 MB para modelo/vozes, além do runtime.

```bash
python3.12 -m venv .venv-narration
.venv-narration/bin/pip install -r requirements-narration.txt
mkdir -p .models/kokoro
curl -fL -o .models/kokoro/kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/kokoro-v1.0.onnx
curl -fL -o .models/kokoro/voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/voices-v1.0.bin
TESLINHA_TTS_PYTHON="$PWD/.venv-narration/bin/python3" TESLINHA_KOKORO_MODELS="$PWD/.models/kokoro" npm run narration -- --synthesize
npm run render
npm run verify
```

A síntese usa `scripts/synthesize-natural.py`. Cache compara texto, voz, velocidade e tom. A montagem rejeita cache antigo, sobreposição, fala ausente ou longa demais. Nesta versão não houve ajuste de velocidade. `src/narration-editorial.ts` exige uma única menção da marca, na última fala. Os scripts antigos do serviço Edge são mantidos como histórico e não são usados pela nova versão.

`npm run render -- --no-narration` exporta sem voz, mantendo a música padrão. Para preservar arquivos antigos, exporte uma variação por CLI com outro caminho, como no exemplo anterior. `npm run verify -- outro.mp4 --no-narration` verifica uma exportação sem voz. Para desativar música, use `music: null` nos input props.

## Direitos e validação

Logo fornecida pelo usuário; Manrope sob OFL; Kokoro sob Apache 2.0 e kokoro-onnx sob MIT. Licenças em `licenses/`. Trilha e efeitos são composições procedurais originais. Nenhum áudio, frame ou marca do vídeo de referência integra o resultado. Consulte também a [licença do Remotion](https://www.remotion.dev/license).

Interfaces apresentam dados ilustrativos; nenhum resultado comercial foi inventado. Margens de segurança preservadas. `REFERENCE.md` contém a análise de ritmo, `NARRATION.md` os textos e tempos, e `QA.md` as verificações reais.
