export class GameManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  novoJogo() {
    this.appContext.state.game = {
      ...this.appContext.state.game,
      faseAtual: 1,
      nivelAtual: 1,
      pontuacao: 0,
      pontuacaoAtual: 0,
      acertos: 0,
      dicasUsadas: 0,
      pausado: false,
      finalizado: false
    };
    return this.appContext.state.game;
  }

  continuar() {
    this.appContext.state.game.pausado = false;
    return this.appContext.state.game;
  }

  pausar() {
    this.appContext.state.game.pausado = true;
    return this.appContext.state.game;
  }

  reiniciar() {
    return this.novoJogo();
  }

  finalizar(resultado = null) {
    this.appContext.state.game.finalizado = true;
    this.appContext.state.game.resultado = resultado;
    return this.appContext.state.game;
  }

  escolherFase(fase) {
    this.appContext.state.game.faseAtual = fase;
    this.appContext.state.game.nivelAtual = fase;
    return this.appContext.state.game;
  }

  carregarFase(fase) {
    return this.escolherFase(fase);
  }

  trocarFase(fase) {
    return this.escolherFase(fase);
  }

  reiniciarFase() {
    return this.novoJogo();
  }
}
