import {buildTimeline} from './timeline';

export const video = {width: 1080, height: 1920, fps: 30, frames: 1800, overlap: 12} as const;
export const colors = {
  navy: '#050B1A', surface: '#101B36', blue: '#075BFF', sky: '#55B8FF',
  white: '#FFFFFF', light: '#F2F6FF', ink: '#101B36', muted: '#52617D', pale: '#DCE8FF',
};
export const brand = {
  name: 'Teslinha', descriptor: 'SUPORTE', contact: '(11) 91024-6542',
  logo: 'brand/teslinha-logo.png', logoDark: 'brand/teslinha-logo-dark.png',
};
export const durations = [240, 240, 210, 180, 420, 210, 180, 120] as const;
export const timeline = buildTimeline(durations, video.overlap);
export const copy = {
  opening: ['Sua empresa não precisa\nde mais ferramentas.', 'Precisa das\nferramentas certas.'],
  areas: ['Vendas', 'Gestão', 'Clientes', 'Automação'],
  fragmented: 'Planilhas. Retrabalho.\nInformações espalhadas.',
  unique: ['Sua empresa\né única.', 'Por que usar um sistema\nque não acompanha\nsua rotina?'],
  reveal: 'Tecnologia feita\npara o seu negócio.',
  revealSub: 'Sistemas personalizados\ne automações.',
  demos: ['Clientes e vendas', 'Gestão em tempo real', 'Tarefas no automático'],
  demoSub: ['Cada oportunidade,\nno lugar certo.', 'Sua operação,\ncom mais clareza.', 'Tudo conectado.\nCada etapa no seu fluxo.'],
  disclaimer: 'Demonstração · dados ilustrativos',
  flow: ['Menos tarefas\nrepetitivas.', 'Mais tempo\npara crescer.'],
  growth: 'Seu negócio evolui.\nSua tecnologia também.',
  ending: 'Vamos simplificar\na rotina da sua empresa?',
  cta: 'Fale com a Teslinha Suporte.',
};
export const demo = {
  leads: [
    {name: 'Marina Costa', company: 'Estúdio Aurora', service: 'Site institucional', stage: 0},
    {name: 'Rafael Lima', company: 'Oficina Horizonte', service: 'Sistema de gestão', stage: 1},
    {name: 'Ana Souza', company: 'Ateliê Forma', service: 'Automação', stage: 2},
  ],
  chart: [38, 52, 44, 68, 56, 82, 74],
  metrics: [{label: 'Pedidos', value: '128', trend: 'este mês'}, {label: 'Em andamento', value: '24', trend: 'na operação'}, {label: 'Concluídos', value: '104', trend: 'no período'}],
  tasks: ['Receber solicitação', 'Organizar cadastro', 'Avisar a equipe', 'Atualizar o status'],
};
export const audioConfig = {effects: 'audio/sound-design.wav', music: 'audio/music-original-v01.wav' as string | null, musicVolume: 0.16};

export const ui = {
  "connectedOperation": "Sua operação, conectada do início ao fim.",
  "yourRoutine": "Sua rotina.",
  "yourRules": "Suas regras.",
  "adaptSystem": "O sistema deve se adaptar a você.",
  "sheetFile": "Controle_vendas_final_v3.xlsx",
  "manualUpdate": "Mais uma atualização manual",
  "copyData": "Copiar dados do atendimento",
  "notSynced": "Informação não sincronizada",
  "latestVersion": "Quem está com a versão mais recente?",
  "repeatWork": "O mesmo trabalho. Mais de uma vez.",
  "connectedPeople": "Pessoas, processos e informações conectados.",
  "growOperation": "Soluções que acompanham a sua operação.",
  "example": "Exemplo de funcionamento",
  "wordmark": "Teslinha ",
  "wordmarkSuffix": "Suporte",
  "closingServices": "Sistemas personalizados e automações.",
  "demoEnvironment": "AMBIENTE DEMONSTRATIVO",
  "relationships": "Relacionamentos",
  "contactJourney": "Do primeiro contato à próxima etapa.",
  "newContact": "Novo contato",
  "findCustomer": "Buscar cliente",
  "allAssignees": "Todos os responsáveis",
  "newLead": "Novo interessado",
  "awaitingReply": "Aguardando retorno",
  "operationView": "Visão da operação",
  "operationSummary": "Pedidos, atividades e andamento.",
  "currentMonth": "Este mês",
  "weeklyActivity": "Atividade semanal",
  "ordersPerDay": "Pedidos / dia",
  "automationCenter": "Central de automações",
  "oneFlow": "Um fluxo. Menos etapas manuais.",
  "active": "Ativo",
  "connectedTeam": "Conectado à rotina da equipe",
  "counterLabels": [
    "informações disputando sua atenção",
    "áreas trabalhando juntas"
  ],
  "sheetColumns": [
    "Cliente",
    "Pedido",
    "Status",
    "Responsável"
  ],
  "sheetClients": [
    "Aurora",
    "Horizonte",
    "Forma",
    "Novo contato",
    "Sem cadastro"
  ],
  "sheetStatuses": [
    "Revisar",
    "Duplicado"
  ],
  "sheetAssignees": [
    "Equipe",
    "—"
  ],
  "softwareTitles": [
    "Teslinha / Clientes",
    "Teslinha / Gestão",
    "Teslinha / Fluxos"
  ],
  "notifications": [
    "Próxima etapa organizada",
    "Informações em um só lugar",
    "Equipe avisada automaticamente"
  ],
  "flowLabels": [
    "Atendimento",
    "Seu sistema",
    "Sua operação"
  ],
  "flowStates": [
    "Solicitação recebida",
    "Informação organizada",
    "Equipe atualizada"
  ],
  "crmStages": [
    "Novos contatos",
    "Em conversa",
    "Propostas"
  ],
  "weekdays": [
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb",
    "Dom"
  ],
  "completed": "Concluído",
  "queued": "Na fila"
} as const;
