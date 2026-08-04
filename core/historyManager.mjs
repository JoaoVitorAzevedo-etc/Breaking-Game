export class HistoryManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  registrarPartida(partida) {
    const historico = this.appContext.state.historico || [];
    historico.push(partida);
    this.appContext.state.historico = historico;
    return historico;
  }

  registrarAcerto(acerto) {
    this.appContext.state.historico = this.appContext.state.historico || [];
    this.appContext.state.historico[this.appContext.state.historico.length - 1] = {
      ...(this.appContext.state.historico[this.appContext.state.historico.length - 1] || {}),
      acertos: (this.appContext.state.historico[this.appContext.state.historico.length - 1]?.acertos || 0) + acerto
    };
    return this.appContext.state.historico;
  }

  registrarErro(erro) {
    this.appContext.state.historico = this.appContext.state.historico || [];
    this.appContext.state.historico[this.appContext.state.historico.length - 1] = {
      ...(this.appContext.state.historico[this.appContext.state.historico.length - 1] || {}),
      erros: (this.appContext.state.historico[this.appContext.state.historico.length - 1]?.erros || 0) + erro
    };
    return this.appContext.state.historico;
  }

  registrarTempo(tempo) {
    this.appContext.state.historico = this.appContext.state.historico || [];
    this.appContext.state.historico[this.appContext.state.historico.length - 1] = {
      ...(this.appContext.state.historico[this.appContext.state.historico.length - 1] || {}),
      tempo
    };
    return this.appContext.state.historico;
  }

  registrarPontuacao(pontuacao) {
    this.appContext.state.historico = this.appContext.state.historico || [];
    this.appContext.state.historico[this.appContext.state.historico.length - 1] = {
      ...(this.appContext.state.historico[this.appContext.state.historico.length - 1] || {}),
      pontuacao
    };
    return this.appContext.state.historico;
  }

  registrarFaseConcluida(fase) {
    this.appContext.state.historico = this.appContext.state.historico || [];
    this.appContext.state.historico[this.appContext.state.historico.length - 1] = {
      ...(this.appContext.state.historico[this.appContext.state.historico.length - 1] || {}),
      fasesConcluidas: [...(this.appContext.state.historico[this.appContext.state.historico.length - 1]?.fasesConcluidas || []), fase]
    };
    return this.appContext.state.historico;
  }
}
