import type { Storyboard } from './types';

export const vervalMobileStoryboard: Storyboard = {
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 720,
  safeArea: { left: 84, right: 996, top: 220, bottom: 1620 },
  beats: [
    {
      id: 'hook', from: 0, to: 90, asset: 'IMG_2181.PNG', goal: 'Criar identificação imediata com a rotina corrida do empreendedor.',
      onScreen: { eyebrow: 'VERVAL MOBILE', title: 'Seu negócio cabe no celular?', body: 'Uma visão clara para decidir melhor, todos os dias.', y: 260, height: 300 },
      narration: 'Quando a rotina aperta, você precisa enxergar o negócio com clareza — onde estiver.', transition: 'fade', focalPoint: { x: 0.5, y: 0.42 },
    },
    {
      id: 'finance', from: 90, to: 240, asset: 'IMG_2189.PNG', goal: 'Mostrar leitura financeira rápida e acionável.',
      onScreen: { eyebrow: 'VISÃO FINANCEIRA', title: 'Veja o que entra, sai e sobra.', body: 'Saldo, lucro previsto e movimentações em uma só leitura.', y: 260, height: 300 },
      narration: 'Acompanhe entradas, saídas e lucro previsto em uma leitura simples, sem perder tempo procurando informação.', transition: 'push', focalPoint: { x: 0.5, y: 0.34 },
    },
    {
      id: 'launches', from: 240, to: 390, asset: 'IMG_2188.PNG', goal: 'Conectar lançamentos e fluxo de caixa à tomada de decisão.',
      onScreen: { eyebrow: 'CONTROLE DIÁRIO', title: 'Registre cada movimento.', body: 'Vendas, despesas e recebimentos ficam organizados.', y: 260, height: 300 },
      narration: 'Registre vendas, despesas e recebimentos no momento em que acontecem, com tudo organizado para consultar depois.', transition: 'push', focalPoint: { x: 0.5, y: 0.34 },
    },
    {
      id: 'operations', from: 390, to: 570, asset: 'IMG_2186.PNG', goal: 'Apresentar recorrências, clientes e módulos como ecossistema.',
      onScreen: { eyebrow: 'OPERAÇÃO CONECTADA', title: 'Menos planilhas. Mais controle.', body: 'Clientes, recorrências e módulos que acompanham seu negócio.', y: 260, height: 300 },
      narration: 'Clientes, recorrências, produtos e serviços ficam no mesmo lugar — para a operação continuar fluindo.', transition: 'push', focalPoint: { x: 0.5, y: 0.34 },
    },
    {
      id: 'synthesis', from: 570, to: 630, asset: 'IMG_2184.PNG', goal: 'Resumir a proposta em uma frase memorável.',
      onScreen: { eyebrow: 'TUDO JUNTO', title: 'Seu negócio, no seu ritmo.', body: 'Uma central feita para quem faz acontecer.', y: 260, height: 300 },
      narration: 'No fim, é menos improviso e mais tempo para cuidar do que faz seu negócio crescer.', transition: 'fade', focalPoint: { x: 0.5, y: 0.3 },
    },
    {
      id: 'cta', from: 630, to: 720, asset: 'IMG_2181.PNG', goal: 'Encerrar com marca e convite claro para experimentar.',
      onScreen: { eyebrow: 'COMECE AGORA', title: 'Verval Mobile', body: 'Controle seu negócio de onde estiver.', y: 280, height: 260 },
      narration: 'Conheça o Verval Mobile e leve o controle do seu negócio com você.', transition: 'fade', focalPoint: { x: 0.5, y: 0.42 },
    },
  ],
};
