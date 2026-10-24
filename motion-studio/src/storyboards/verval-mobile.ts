import type { Storyboard } from './types';

export const vervalMobileStoryboard: Storyboard = {
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 900,
  safeArea: { left: 84, right: 996, top: 220, bottom: 1620 },
  beats: [
    { id: 'chaos-hook', from: 0, to: 120, asset: 'IMG_2185.PNG', goal: 'Abrir com a tensão de vender muito sem saber o que sobra.', onScreen: { eyebrow: 'A ROTINA APERTA', title: 'VENDEU MUITO.', body: 'SOBROU QUANTO?', caption: 'Você vende muito. Mas quanto sobra?', y: 270, height: 320 }, narration: 'Você vende muito. Mas quanto sobra?', transition: 'fade', focalPoint: { x: .5, y: .38 } },
    { id: 'chaos-problems', from: 120, to: 240, asset: 'IMG_2187.PNG', goal: 'Mostrar despesas, cobranças e estoque como sinais de desorganização.', onScreen: { eyebrow: 'QUANDO TUDO FICA ESPALHADO', title: 'DESPESAS. COBRANÇAS. ESTOQUE.', body: 'Informações importantes, em lugares diferentes.', caption: 'Contas, cobranças e estoque espalhados travam decisões.', y: 250, height: 350 }, narration: 'Contas, cobranças e estoque espalhados travam decisões.', transition: 'push', focalPoint: { x: .5, y: .4 } },
    { id: 'chaos-decision', from: 240, to: 330, asset: 'IMG_2188.PNG', goal: 'Concentrar a sensação de tempo perdido e decisão travada.', onScreen: { eyebrow: 'E O TEMPO VAI EMBORA', title: 'FALTA CLAREZA?', body: 'Isso trava as próximas decisões.', y: 300, height: 300 }, narration: '', transition: 'fade', focalPoint: { x: .5, y: .38 } },
    { id: 'reveal', from: 330, to: 420, asset: 'IMG_2181.PNG', goal: 'Virar a atmosfera e revelar o produto.', onScreen: { eyebrow: 'UMA NOVA FORMA DE ORGANIZAR', title: 'VERVAL', body: 'Seu negócio na palma da mão.', caption: 'Conheça o Verval: seu negócio na palma da mão.', y: 300, height: 300 }, narration: 'Conheça o Verval: seu negócio na palma da mão.', transition: 'fade', focalPoint: { x: .5, y: .4 } },
    { id: 'finance', from: 420, to: 570, asset: 'IMG_2189.PNG', goal: 'Provar a visão financeira com tela real e benefícios legíveis.', onScreen: { eyebrow: 'VISÃO FINANCEIRA', title: 'ENTRADAS. DESPESAS. SALDO. LUCRO.', body: 'Uma leitura rápida para decidir melhor.', caption: 'Veja entradas, despesas, saldo e lucro.', y: 260, height: 340 }, narration: 'Veja entradas, despesas, saldo e lucro.', transition: 'push', focalPoint: { x: .5, y: .34 } },
    { id: 'operations', from: 570, to: 720, asset: 'IMG_2186.PNG', goal: 'Apresentar a amplitude da operação sem simular telas inexistentes.', onScreen: { eyebrow: 'OPERAÇÃO CONECTADA', title: 'VENDAS. CLIENTES. PRODUTOS.', body: 'Tudo organizado no mesmo lugar.', caption: 'Controle vendas, clientes, produtos e recorrências.', y: 270, height: 320 }, narration: 'Controle vendas, clientes, produtos e recorrências.', transition: 'push', focalPoint: { x: .5, y: .35 } },
    { id: 'clarity', from: 720, to: 810, asset: 'IMG_2184.PNG', goal: 'Concluir a transformação com alívio e clareza.', onScreen: { eyebrow: 'DEPOIS FICA MAIS SIMPLES', title: 'MAIS CONTROLE. MAIS CLAREZA.', body: 'Para cuidar melhor do que faz o negócio crescer.', caption: 'Mais organização, mais clareza para crescer.', y: 300, height: 300 }, narration: 'Mais organização, mais clareza para crescer.', transition: 'fade', focalPoint: { x: .5, y: .32 } },
    { id: 'cta', from: 810, to: 900, asset: 'IMG_2181.PNG', goal: 'Assinar a ideia com marca, benefício e chamada para ação.', onScreen: { eyebrow: 'GESTÃO NO SEU RITMO', title: 'SIMPLIFIQUE SUA GESTÃO.', body: 'Conheça o Verval Mobile.', caption: 'Verval. Simplifique sua gestão.', y: 300, height: 300 }, narration: 'Verval. Simplifique sua gestão.', transition: 'fade', focalPoint: { x: .5, y: .4 } },
  ],
};
