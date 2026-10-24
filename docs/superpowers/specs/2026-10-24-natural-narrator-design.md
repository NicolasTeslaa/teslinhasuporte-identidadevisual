# Natural Narrator — Design

## Objetivo

Disponibilizar uma skill local chamada `natural-narrator` para gerar narração em português brasileiro com Qwen3-TTS via MLX no Mac mini M4 de 16 GB, sem APIs pagas, usando a Voz A como referência opcional e produzindo WAV/MP3 prontos para projetos de vídeo.

## Decisões

- Runtime isolado em `~/.local/share/natural-narrator` com Python 3.12 e `uv`.
- Modelo padrão: Qwen3-TTS MLX 0.6B quantizado, para reduzir pressão de memória; 1.7B fica disponível como perfil de maior qualidade.
- Interface principal: CLI local com entrada de texto ou arquivo de roteiro, `--speed`, `--style`, `--pause`, `--voice-reference`, `--format` e `--output`.
- Saída WAV em 48 kHz mono PCM e MP3 via FFmpeg quando solicitado.
- Integração com vídeo por caminho de saída estável e comando opcional para muxar a narração em um MP4 existente.
- A pronúncia será avaliada com um roteiro brasileiro de teste e verificação de duração, formato, silêncio/pausas e audição humana do arquivo gerado; a skill não fará afirmações de qualidade subjetiva sem amostra reproduzível.
- A referência Voz A será usada somente quando o usuário a indicar e quando houver autorização para reutilização.

## Componentes

1. `SKILL.md`: roteamento, parâmetros recomendados, limites de memória e fluxo de geração.
2. `scripts/natural_narrator.py`: CLI determinística que valida argumentos, chama o backend MLX, normaliza WAV e converte MP3.
3. `scripts/check_install.py`: diagnóstico do ambiente e dos modelos disponíveis.
4. `references/video-integration.md`: uso com Remotion/FFmpeg e convenções de áudio.
5. `tests/test_cli_contract.py`: testes de contrato sem carregar o modelo, cobrindo argumentos e caminhos de saída.

## Critérios de aceitação

- `natural-narrator --help` funciona em um novo shell.
- Um texto em português gera WAV válido localmente com a Voz A.
- O mesmo texto gera MP3 válido quando solicitado.
- Ritmo e estilo alteram os parâmetros enviados ao backend sem editar o código.
- O arquivo de saída pode ser apontado diretamente como asset de projeto de vídeo.
- O diagnóstico identifica Python, MLX, FFmpeg, modelo e memória disponível sem expor tokens ou caminhos sensíveis.
