# Narração masculina — Teslinha Suporte

Solicitada e aprovada pelo usuário em 23/10/2026: português brasileiro, voz masculina, tom natural, confiante e comercial, acompanhando as animações existentes. Mantém as mensagens aprovadas; pontuação ajustada para pausas naturais. Não houve alteração visual.

Voz sintética padrão: `pt-BR-AntonioNeural`; velocidade de síntese `-3%`, tom `-2Hz`. Geração via [edge-tts](https://github.com/rany2/edge-tts); voz masculina pt-BR documentada pela [Microsoft](https://learn.microsoft.com/azure/ai-services/speech-service/language-support). Sem clonagem de voz ou música emprestada. Texto enviado para síntese limita-se às falas deste comercial.

WAV local: `public/audio/narration-masculina-v01.wav`, PCM mono, 48 kHz, 60 segundos. Normalização para -16 LUFS, true peak alvo -1,5 dBTP. As durações abaixo derivam das amostras reais depois de retirar silêncio externo; preservamos 60 ms nas bordas. Nenhuma fala é truncada.

| Início | Fim da fala | Texto |
|---|---|---|
| 0.40 s | 3.23 s | Sua empresa não precisa de mais ferramentas. |
| 4.17 s | 6.27 s | Precisa das ferramentas certas. |
| 8.40 s | 11.70 s | Planilhas, retrabalho e informações espalhadas. |
| 13.00 s | 15.43 s | O mesmo trabalho, mais de uma vez. |
| 16.43 s | 17.80 s | Sua empresa é única. |
| 19.07 s | 21.87 s | Por que seu sistema não acompanha sua rotina? |
| 23.43 s | 24.77 s | Teslinha Suporte. |
| 25.43 s | 27.77 s | Tecnologia feita para o seu negócio. |
| 29.33 s | 33.13 s | Clientes e vendas, com cada oportunidade no lugar certo. |
| 33.93 s | 36.83 s | Gestão em tempo real, com mais clareza. |
| 38.67 s | 41.90 s | Automações que conectam cada etapa da sua rotina. |
| 43.47 s | 45.47 s | Menos tarefas repetitivas. |
| 47.10 s | 48.73 s | Mais tempo para crescer. |
| 50.50 s | 52.10 s | Seu negócio evolui. |
| 53.33 s | 55.03 s | Sua tecnologia também. |
| 56.13 s | 59.80 s | Vamos simplificar? Fale com a Teslinha Suporte. |

Ajuste de tempo máximo permitido: 12%, sem alteração de pitch. Nesta versão, somente o encerramento precisou de ajuste: 7.1%. Demais trechos mantiveram a velocidade original.

A mixagem mantém a voz a volume 1 e reduz os efeitos de 0,8 para 0,18 durante as falas, com entrada de 6 frames e recuperação em 9 frames. O MP4 narrado é uma nova saída; o arquivo anterior sem narração é preservado.

## Validação

TDD em planejamento de falas, rejeição de sobreposição, montagem sem corte, leitura de PCM, silêncio de borda, redução de efeitos, seleção de faixas e invalidação de cache. A verificação final decodifica o MP4, mede energia nas 16 regiões de fala e rejeita trechos inaudíveis. Essa medição verifica presença e volume; não é uma transcrição nem uma avaliação subjetiva da voz.

O script de regeneração está em `scripts/build-narration.ts` e `scripts/synthesize-narration.py`; requisitos Python opcionais em `requirements-narration.txt`. Renderizar o WAV já incluído não exige Python, rede ou chave de API.
