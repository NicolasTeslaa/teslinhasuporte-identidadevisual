# Comercial Teslinha Suporte — design aprovado

O usuário aprovou em 23/10/2026 o roteiro apresentado na conversa. O briefing anexado é adaptado de Kheoryn para Teslinha Suporte. A referência está em `assets/referencias/video motion referencia.mp4` e orienta ritmo e animações, sem reutilização de imagens, música, marcas ou elementos exclusivos.

## Entrega e identidade

Projeto React + TypeScript + Remotion em `motion/`, oito cenas disponíveis individualmente no Studio, composição de 1800 frames (60 segundos), 30 FPS, 1080×1920. MP4 H.264 em `out/teslinha-commercial.mp4`. Logo oficial copiada de `assets/logo/LOGO PNG TRANSPARENTE.png`; azul `#075BFF`, azul claro `#55B8FF`, marinho `#050B1A`, superfície `#101B36` e branco. A direção existente foi explicitamente confirmada; não se propõe outra paleta. O arco da logo orienta os movimentos de conexão. Tipografia Manrope local, sem chamadas externas durante o render.

## Roteiro

| Intervalo | Mensagem e ação |
|---|---|
| 0–8 s | “Sua empresa não precisa de mais ferramentas.” Informações numerosas se reorganizam em Vendas, Gestão, Clientes e Automação. “Precisa das ferramentas certas.” |
| 8–16 s | “Planilhas. Retrabalho. Informações espalhadas.” Janelas desconectadas e tabelas sobrepostas. |
| 16–23 s | “Sua empresa é única.” Um bloco singular tenta se encaixar em uma matriz. “Por que usar um sistema que não acompanha sua rotina?” |
| 23–29 s | Fundo claro, logo real. “Tecnologia feita para o seu negócio.” “Sistemas personalizados e automações.” |
| 29–43 s | Três interfaces: clientes/vendas, painel de gestão, automações. Elementos internos animados; dados explicitamente demonstrativos. |
| 43–50 s | Fluxo de atendimento a sistema e operação. “Menos tarefas repetitivas.” “Mais tempo para crescer.” |
| 50–56 s | Fundo marinho, conexões convergentes. “Seu negócio evolui. Sua tecnologia também.” |
| 56–60 s | Logo oficial. “Vamos simplificar a rotina da sua empresa?” “Fale com a Teslinha Suporte.” WhatsApp (11) 91024-6542, configurável. |

## Construção

Configuração centraliza textos, cores, dados e durações. Transições usam sobreposição de 12 frames somada à duração de saída de cada cena, preservando os inícios aprovados e a duração total. Componentes de cena recebem frame local e não dependem de relógio, rede ou aleatoriedade não determinística. Interfaces são HTML/CSS/SVG originais. Margens de conteúdo: 84 px laterais, 220 px superiores e 300 px inferiores. Grafismos decorativos podem extrapolar essa área.

Sem métricas comerciais, clientes reais fictícios ou promessas de resultado. Dados da interface têm legenda “Demonstração · dados ilustrativos”. Contato vem de `docs/empresa.md`. A trilha da referência não será utilizada. Sound design sintético original de transições e cliques; música licenciada externa é opcional e substituível. Sem locução nesta entrega, pois não foi solicitada.

## Validação

TDD nos contratos de timeline, limites de frame, normalização de transições, progressão e conteúdo renderizado das cenas, geração de áudio e validação de mídia. TypeScript estrito. Quadros de cada cena e das sete transições, inspeção visual e preview em movimento. Verificar MP4 com ffprobe (1800 frames, 60 s, H.264, 1080×1920, 30 FPS) e decodificação FFmpeg. Preservar os arquivos preexistentes não relacionados. Não há GitHub Actions neste repositório; após verificação e revisão, commit e push conforme preferência global do usuário.
