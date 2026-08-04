export class BadgeManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  verificar(condicao, badge) {
    return Boolean(condicao) ? this.desbloquear(badge) : false;
  }

  desbloquear(badge) {
    const badges = this.appContext.state.badges || [];
    if (!badges.includes(badge)) badges.push(badge);
    this.appContext.state.badges = badges;
    this.appContext.state.ui.notificacao = `Badge desbloqueada: ${badge}`;
    return badges;
  }

  notificar(mensagem) {
    this.appContext.state.ui.notificacao = mensagem;
    return mensagem;
  }

  salvar() {
    this.appContext.state.cache.badges = this.appContext.state.badges || [];
    return this.appContext.state.cache.badges;
  }

  exibir() {
    return this.appContext.state.badges || [];
  }
}
