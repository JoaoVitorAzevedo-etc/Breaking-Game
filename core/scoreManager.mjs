export class ScoreManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  aplicarXp(xp) {
    this.appContext.state.game.xp = (this.appContext.state.game.xp || 0) + xp;
    return this.appContext.state.game.xp;
  }

  aplicarMoedas(moedas) {
    this.appContext.state.game.moedas = (this.appContext.state.game.moedas || 0) + moedas;
    return this.appContext.state.game.moedas;
  }

  aplicarPontuacao(pontos) {
    this.appContext.state.game.pontuacao = (this.appContext.state.game.pontuacao || 0) + pontos;
    this.appContext.state.game.pontuacaoAtual = (this.appContext.state.game.pontuacaoAtual || 0) + pontos;
    return this.appContext.state.game.pontuacao;
  }

  aplicarCombo(valor = 1) {
    this.appContext.state.game.combo = (this.appContext.state.game.combo || 0) + valor;
    return this.appContext.state.game.combo;
  }

  aplicarMultiplicador(valor) {
    this.appContext.state.game.multiplicador = valor;
    return this.appContext.state.game.multiplicador;
  }

  aplicarBonus(valor) {
    this.appContext.state.game.bonus = (this.appContext.state.game.bonus || 0) + valor;
    return this.appContext.state.game.bonus;
  }

  atualizarTempo(segundos) {
    this.appContext.state.game.tempo = segundos;
    return this.appContext.state.game.tempo;
  }

  atualizarPrecisao(acertos, total) {
    const precisao = total > 0 ? Math.round((acertos / total) * 100) : 0;
    this.appContext.state.game.precisao = precisao;
    return precisao;
  }

  aplicarPenalidade(valor) {
    this.appContext.state.game.pontuacao = Math.max(0, (this.appContext.state.game.pontuacao || 0) - valor);
    return this.appContext.state.game.pontuacao;
  }
}
