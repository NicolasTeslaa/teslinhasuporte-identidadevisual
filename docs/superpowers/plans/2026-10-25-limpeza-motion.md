# Anúncio de limpeza — plano de produção

Objetivo: entregar MP4 1080×1920, 30 fps, 30 segundos, com a narração enxuta explicitamente aprovada em 25/10/2026.

Direção aprovada: cinco cenas nos intervalos 0–5, 5–11, 11–17, 17–25 e 25–30 segundos. Azul #0551DA, branco #FFFFFF, grafite #4A494D e cinza #C2CEE1. Logo original, sem alteração. Modelos geométricos tridimensionais de equipamentos, interior, limpeza e logística, sem pessoas. Tipografia Manrope local. Textos essenciais dentro de x=90–930 e y=250–1510; legendas até y=1580.

Regras comerciais: R$ 200 por equipamento, computador ou videogame. Coleta e entrega gratuitas em Várzea Paulista. Não adicionar prazo, telefone, endereço, serviço ou garantia de desempenho. Marca apenas visual. A peça não será publicada automaticamente.

Narração aprovada:
1. Faz tempo que você não limpa seu computador ou videogame?
2. A poeira pode causar aquecimento, barulho e prejudicar o desempenho.
3. Limpeza profissional por duzentos reais por equipamento: computador ou videogame.
4. Em Várzea Paulista, buscamos na sua casa e entregamos quando estiver pronto. Coleta e entrega grátis!
5. Chame no WhatsApp e agende sua limpeza!

## Execução nesta sessão

- [x] RED: testar seleção de cena nos limites, legendas fora de fala, rejeição de fala longa e sobreposição.
- [x] GREEN: implementar timeline em `motion-studio/src/limpeza/timeline.ts`.
- [x] Criar cena Three.js e composição Remotion independentes das peças existentes.
- [x] Gerar WAV local com Qwen3 VoiceDesign; medir, transcrever e alinhar as falas sem acelerar.
- [x] Criar trilha e efeitos originais; manter voz acima da música.
- [x] Renderizar quadros e conferir todas as cinco cenas; corrigir problemas em lote.
- [x] Renderizar 900 quadros e verificar codec, dimensões, duração, áudio, decodificação e legendas SRT.
- [x] Revisar diff, executar testes/TypeScript e fazer commit e push (nenhum workflow Actions encontrado).

Arquivos: `src/limpeza/` para timeline, modelos e composição; `scripts/render-limpeza.ts` para render; `public/limpeza/` para logo e áudio finais; `tests/limpeza.test.ts` para comportamento. Saída final em `assets/marketing/`, com nome temporal de São Paulo. Intermediários em `motion-studio/out/limpeza/` ignorados pelo Git.

Aceitação: preço explicitamente por equipamento; gratuidade restrita ao município; encerramento com logo e CTA; falas completas sem sobreposição; legendas sincronizadas; 900 quadros; nenhuma pronúncia da marca.
