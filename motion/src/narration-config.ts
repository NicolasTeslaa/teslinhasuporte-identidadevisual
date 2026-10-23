import type {NarrationCue} from './narration';

/** Voz A escolhida pelo usuário: Kokoro pm_alex, pt-BR, sem alteração de tom. */
export const narrationSettings = {
  voice:'pm_alex',rate:'1.0',pitch:'native',engine:'kokoro-onnx',clipExtension:'wav',
  source:'audio/narration-voz-a-v02.wav',sampleRate:48000,
} as const;
export const narrationCues:readonly NarrationCue[] = [
  {id:'v02-01-operacao',from:10,to:232,text:'Quando cada parte da empresa depende de uma ferramenta diferente, acompanhar a operação fica mais difícil.'},
  {id:'v02-02-retrabalho',from:248,to:472,text:'A equipe perde tempo procurando informações, repetindo cadastros e conferindo o que já deveria estar organizado.'},
  {id:'v02-03-entendimento',from:489,to:681,text:'Para resolver isso, começamos entendendo como você trabalha e o que precisa melhorar.'},
  {id:'v02-04-sob-medida',from:699,to:861,text:'Esse entendimento orienta a construção de um sistema sob medida.'},
  {id:'v02-05-recursos',from:879,to:1282,text:'Podemos reunir o histórico dos clientes, facilitar o acompanhamento da operação e conectar tarefas que hoje dependem de atualizações manuais. Cada recurso é definido a partir da sua necessidade.'},
  {id:'v02-06-equipe',from:1299,to:1491,text:'Assim, sua equipe pode dedicar mais atenção ao atendimento e às decisões do negócio.'},
  {id:'v02-07-evolucao',from:1508,to:1672,text:'E, conforme surgem novas demandas, podemos evoluir a solução com você.'},
  {id:'v02-08-contato',from:1687,to:1795,text:'Conte seu desafio para a Teslinha Suporte.'},
];
