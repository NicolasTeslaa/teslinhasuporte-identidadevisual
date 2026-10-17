# Gerador de e-mails de prospecção por nicho Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ler uma planilha de contatos autorizados, selecionar uma mensagem por nicho e gerar HTMLs personalizados da Teslinha Suporte.

**Architecture:** Leitura/validação de contatos, perfis de nicho, renderização HTML e CLI ficam em módulos separados. Dados de entrada, configuração, template, código, testes e saída usam pastas próprias.

**Tech Stack:** Python 3, `openpyxl` para `.xlsx`, `csv` para `.csv`, `string.Template`, `unittest`.

**Spec:** `docs/superpowers/specs/2026-10-17-gerador-email-prospeccao-design.md`

## Tarefas

- [x] Criar perfis em `config/nichos.json` e exemplos em `entrada/`.
- [x] Implementar e testar leitura CSV/XLSX, consentimento e validação em `src/contatos.py`.
- [x] Implementar e testar template e personalização em `templates/` e `src/renderizador.py`.
- [x] Implementar e testar CLI, slug de arquivos e relatório em `src/gerar_emails.py`.
- [ ] Executar verificação final, revisar diff e integrar a branch.
