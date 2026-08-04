export class DashboardManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  carregarPerfil() {
    return this.appContext.state.perfil || {};
  }

  carregarEstatisticas() {
    return this.appContext.state.estatisticas || {};
  }

  carregarGraficos() {
    return this.appContext.state.dashboard?.graficos || [];
  }

  carregarRanking() {
    return this.appContext.state.ranking || {};
  }

  carregarHistorico() {
    return this.appContext.state.historico || [];
  }

  carregarBadges() {
    return this.appContext.state.badges || [];
  }

  carregarInventario() {
    return this.appContext.state.inventario || {};
  }

  carregarCurriculo() {
    return this.appContext.state.progress?.curriculo || [];
  }
}
