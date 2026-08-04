export class QuestionsManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  carregarPerguntas(nivel = 1) {
    const perguntas = this.appContext.target.questoes?.['nivel' + nivel] || [];
    this.appContext.state.game.perguntas = perguntas;
    return perguntas;
  }

  selecionarPerguntas(nivel = 1, quantidade = 5) {
    const perguntas = this.carregarPerguntas(nivel);
    const selecionadas = perguntas.slice(0, quantidade);
    this.appContext.state.game.perguntasSelecionadas = selecionadas;
    return selecionadas;
  }

  embaralhar(perguntas) {
    const copia = [...perguntas];
    for (let i = copia.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  verificarResposta(resposta, indice = 0) {
    const perguntas = this.appContext.state.game.perguntasSelecionadas || [];
    const atual = perguntas[indice];
    const correta = atual?.resposta === resposta;
    this.appContext.state.game.ultimaResposta = { indice, correta, resposta };
    return correta;
  }

  atualizarPontuacao(pontos) {
    this.appContext.state.game.pontuacaoAtual = (this.appContext.state.game.pontuacaoAtual || 0) + pontos;
    this.appContext.state.game.pontuacao = (this.appContext.state.game.pontuacao || 0) + pontos;
    return this.appContext.state.game.pontuacao;
  }

  proximaPergunta() {
    const atual = this.appContext.state.game.perguntaAtual || 0;
    this.appContext.state.game.perguntaAtual = atual + 1;
    return this.appContext.state.game.perguntaAtual;
  }

  fimDaFase() {
    this.appContext.state.game.finalizado = true;
    return this.appContext.state.game;
  }

  registrarHistorico(registro) {
    const historico = this.appContext.state.historico || [];
    historico.push(registro);
    this.appContext.state.historico = historico;
    return historico;
  }
}
