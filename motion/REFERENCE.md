# Análise da referência

Arquivo local fornecido: `../assets/referencias/video motion referencia.mp4`.

## Leitura técnica

ffprobe do Remotion: 576×1024, 30 FPS, H.264 yuv420p, 58,7 segundos. Áudio AAC estéreo a 44,1 kHz. Metadados completos e 19 quadros extraídos com FFmpeg ficam em `../out/reference/`.

Para reproduzir a extração:

```bash
npx tsx scripts/analyze-reference.ts
```

Usamos `-ss`, `-frames:v 1` e `scale` porque o FFmpeg distribuído pelo Remotion é uma build reduzida, sem os filtros `fps`, `tile`, `select` ou `showinfo`. O helper do próprio renderer resolve o binário da plataforma e as bibliotecas dinâmicas. A folha de contato inicial também foi extraída com AVFoundation para leitura preliminar.

## Ritmo e sequência observada

Os intervalos abaixo são aproximados, observados nos quadros e no arquivo local, e não uma lista de cortes detectada automaticamente.

- **0–7 s:** número grande, matriz de elementos pequenos e reorganização em quatro áreas. A escala entre número, legenda e dados cria uma leitura imediata.
- **8–13 s:** retorno de planilha e janelas sobrepostas; profundidade, pequenas rotações e status destacam a fragmentação de informação.
- **14–22 s:** matriz de cubos e incompatibilidade entre um sistema padrão e a forma particular do negócio. Geometria substitui screenshots literais.
- **23–27 s:** transformação da forma para uma solução sob medida; contraste forte entre ambiente escuro e claro.
- **28–42 s:** demonstrações claras por tipo de negócio, interfaces com cabeçalho, módulos e dados. A mesma gramática se mantém enquanto o conteúdo muda.
- **43–50 s:** retorno à geometria e chamada à ação em fundo escuro.
- **51–58,7 s:** a abertura numérica reaparece, criando uma sensação de loop.

## Tradução para Teslinha

Preservamos alternância de densidade, escala tipográfica, reorganização espacial e mudanças entre marinho e branco. Os segmentos do roteiro aprovado duram 8/8/7/6/14/7/6/4 segundos. Entradas principais se resolvem em cerca de 0,6–1,2 s, seguidas de tempo de leitura; agrupamento, gráficos, status e fluxo têm animações internas. As três demonstrações alternam a cada 140 frames (4,67 s). As transições entre cenas duram 12 frames (0,4 s).

A Teslinha usa a logo real e seu arco azul como gesto de conexão. Em vez de copiar interfaces por segmento ou a oferta do vídeo de referência, mostramos organização de clientes, visão da operação e automação, coerentes com `docs/empresa.md`. O fechamento segue o roteiro aprovado, com WhatsApp e logo. Não copiamos o loop final, o CTA, as métricas, a marca ou a música da referência.
