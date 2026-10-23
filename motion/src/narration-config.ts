import type {NarrationCue} from './narration';

/** Masculina pt-BR; frases curtas seguem os momentos do roteiro já aprovado. */
export const narrationSettings = {
  voice:'pt-BR-AntonioNeural', rate:'-3%', pitch:'-2Hz',
  source:'audio/narration-masculina-v01.wav', sampleRate:48000,
} as const;

export const narrationCues:readonly NarrationCue[] = [
  {id:'01-problema',from:12,to:112,text:'Sua empresa não precisa de mais ferramentas.'},
  {id:'01-solucao',from:125,to:228,text:'Precisa das ferramentas certas.'},
  {id:'02-dispersao',from:252,to:380,text:'Planilhas, retrabalho e informações espalhadas.'},
  {id:'02-repeticao',from:390,to:469,text:'O mesmo trabalho, mais de uma vez.'},
  {id:'03-unica',from:493,to:557,text:'Sua empresa é única.'},
  {id:'03-rotina',from:572,to:680,text:'Por que seu sistema não acompanha sua rotina?'},
  {id:'04-marca',from:703,to:755,text:'Teslinha Suporte.'},
  {id:'04-proposta',from:763,to:859,text:'Tecnologia feita para o seu negócio.'},
  {id:'05-clientes',from:880,to:1003,text:'Clientes e vendas, com cada oportunidade no lugar certo.'},
  {id:'05-gestao',from:1018,to:1147,text:'Gestão em tempo real, com mais clareza.'},
  {id:'05-automacao',from:1160,to:1280,text:'Automações que conectam cada etapa da sua rotina.'},
  {id:'06-tarefas',from:1304,to:1388,text:'Menos tarefas repetitivas.'},
  {id:'06-tempo',from:1413,to:1488,text:'Mais tempo para crescer.'},
  {id:'07-negocio',from:1515,to:1585,text:'Seu negócio evolui.'},
  {id:'07-tecnologia',from:1600,to:1669,text:'Sua tecnologia também.'},
  {id:'08-contato',from:1684,to:1795,text:'Vamos simplificar? Fale com a Teslinha Suporte.'},
];
