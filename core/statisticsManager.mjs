export class StatisticsManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  calcularPrecisao(acertos, total) {
    return total > 0 ? Math.round((acertos / total) * 100) : 0;
  }

  calcularTaxaDeAcertos(acertos, total) {
    return this.calcularPrecisao(acertos, total);
  }

  calcularTempoMedio(tempoTotal, total) {
    return total > 0 ? Math.round(tempoTotal / total) : 0;
  }

  calcularQuestoesRespondidas() {
    return this.appContext.state.game?.questoesRespondidas || 0;
  }

  calcularXp() {
    return this.appContext.state.game?.xp || 0;
  }

  calcularMoedas() {
    return this.appContext.state.game?.moedas || 0;
  }

  calcularItens() {
    return this.appContext.state.inventario?.itens?.length || 0;
  }

  calcularBadges() {
    return this.appContext.state.badges?.length || 0;
  }

  calcularDiasJogados() {
    return this.appContext.state.estatisticas?.diasJogados || 0;
  }

  calcularSequenciaDeEstudos() {
    return this.appContext.state.estatisticas?.sequenciaDeEstudos || 0;
  }

  resumo() {
    return {
      precisao: this.calcularPrecisao(this.appContext.state.game?.acertos || 0, this.appContext.state.game?.questoesRespondidas || 0),
      taxaDeAcertos: this.calcularTaxaDeAcertos(this.appContext.state.game?.acertos || 0, this.appContext.state.game?.questoesRespondidas || 0),
      tempoMedio: this.calcularTempoMedio(this.appContext.state.game?.tempoTotal || 0, this.appContext.state.game?.questoesRespondidas || 0),
      questoesRespondidas: this.calcularQuestoesRespondidas(),
      xp: this.calcularXp(),
      moedas: this.calcularMoedas(),
      itens: this.calcularItens(),
      badges: this.calcularBadges(),
      diasJogados: this.calcularDiasJogados(),
      sequenciaDeEstudos: this.calcularSequenciaDeEstudos()
    };
  }
}
