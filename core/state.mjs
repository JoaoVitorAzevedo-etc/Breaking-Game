export const createInitialState = () => ({
  auth: {
    user: null,
    uid: null,
    authenticated: false,
    loading: false,
    error: null
  },
  usuario: null,
  perfil: null,
  configuracoes: {},
  game: {
    faseAtual: 1,
    nivelAtual: 1,
    pontuacao: 0,
    pontuacaoAtual: 0,
    acertos: 0,
    dicasUsadas: 0,
    dicasDisponiveis: 3,
    CUSTO_DICA: 10,
    pausado: false,
    finalizado: false
  },
  ui: {
    currentScreen: 'boot',
    initialized: false,
    ready: false,
    modalAberto: false,
    dashboardCarregado: false,
    tutorialVisualizado: false
  },
  dashboard: {},
  ranking: {},
  inventario: {},
  loja: {},
  historico: {},
  estatisticas: {},
  cache: {},
  audio: {
    enabled: true,
    sons: {}
  },
  tema: 'light-1',
  fonte: 'inter',
  tutorial: {
    ativo: false,
    etapa: 0
  },
  modais: {
    principal: false,
    config: false,
    perfil: false,
    loja: false,
    inventario: false,
    stats: false
  },
  modules: {},
  lastEvent: null
});
