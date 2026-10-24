# Natural Narrator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Instalar Qwen3-TTS via MLX e criar uma skill local reutilizável para narrações brasileiras naturais em WAV/MP3.

**Architecture:** Um ambiente Python isolado mantém o backend MLX e os modelos fora do repositório. A skill fornece instruções e scripts finos para validar entrada, gerar WAV, converter MP3 e integrar o áudio em vídeo, mantendo o projeto Remotion independente do runtime.

**Tech Stack:** macOS Apple Silicon, Python 3.12, uv, mlx-audio, Qwen3-TTS 0.6B/1.7B MLX, soundfile, FFmpeg, pytest.

**Spec:** `docs/superpowers/specs/2026-10-24-natural-narrator-design.md`

## Global Constraints

- Funcionamento local, sem APIs pagas.
- Modelo padrão leve para Mac mini M4 com 16 GB.
- Voz A só será usada como referência autorizada.
- Saída principal WAV 48 kHz mono; MP3 por FFmpeg.
- Não armazenar tokens, segredos ou credenciais na skill.

### Task 1: Instalar runtime local e dependências

**Files:**
- Create: `~/.local/share/natural-narrator/.venv`
- Create: `~/.local/share/natural-narrator/INSTALL.json`

- [ ] **Step 1:** Instalar `uv` e `ffmpeg` com Homebrew se ausentes.
- [ ] **Step 2:** Criar ambiente Python 3.12 com `uv venv`.
- [ ] **Step 3:** Instalar `mlx-audio`, `soundfile`, `numpy` e `pytest`.
- [ ] **Step 4:** Baixar o modelo 0.6B quantizado e registrar o identificador no diagnóstico.
- [ ] **Step 5:** Executar o diagnóstico e confirmar que o ambiente está local e sem credenciais.

### Task 2: Criar contrato testável da skill

**Files:**
- Create: `~/.codex/skills/natural-narrator/SKILL.md`
- Create: `~/.codex/skills/natural-narrator/scripts/natural_narrator.py`
- Create: `~/.codex/skills/natural-narrator/scripts/check_install.py`
- Create: `~/.codex/skills/natural-narrator/references/video-integration.md`
- Create: `~/.codex/skills/natural-narrator/tests/test_cli_contract.py`

- [ ] **Step 1:** Escrever testes que exigem `--help`, validação de formato, normalização de velocidade e caminho de saída.
- [ ] **Step 2:** Rodar os testes e confirmar falha por scripts ausentes.
- [ ] **Step 3:** Implementar o CLI mínimo e o diagnóstico.
- [ ] **Step 4:** Rodar os testes novamente e confirmar aprovação.
- [ ] **Step 5:** Validar a skill com `quick_validate.py`.

### Task 3: Gerar e avaliar amostras brasileiras

**Files:**
- Create: `out/natural-narrator-test/narracao-voz-a.wav`
- Create: `out/natural-narrator-test/narracao-voz-a.mp3`
- Create: `out/natural-narrator-test/evaluation.json`

- [ ] **Step 1:** Gerar o roteiro curto com referência Voz A, ritmo comercial e pausas de frase.
- [ ] **Step 2:** Converter para MP3 e validar codecs, frequência, canais e duração.
- [ ] **Step 3:** Fazer a checagem de pronúncia reproduzível e registrar observações, sem declarar avaliação subjetiva automática.
- [ ] **Step 4:** Testar o caminho de áudio como asset no projeto de vídeo.

### Task 4: Documentar e finalizar

- [ ] **Step 1:** Revisar a skill e os documentos por placeholders, caminhos quebrados e exposição de segredos.
- [ ] **Step 2:** Rodar testes da skill e regressão relevante do projeto de vídeo.
- [ ] **Step 3:** Verificar GitHub Actions; se inexistente, revisar diff e criar commit/push apenas dos arquivos da tarefa.
