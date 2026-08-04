export class RankingManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  async carregarRanking() {
    return this.appContext.state.ranking || {};
  }

  async atualizarRanking(entry) {
    const ranking = this.appContext.state.ranking || {};
    ranking[entry.uid] = entry;
    this.appContext.state.ranking = ranking;
    return ranking;
  }

  filtrarRanking(filtro = 'global') {
    const ranking = this.appContext.state.ranking || {};
    return Object.values(ranking).filter((entry) => entry.filtro === filtro || filtro === 'global');
  }

  topJogadores(limit = 10) {
    const ranking = this.filtrarRanking();
    return ranking.sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0)).slice(0, limit);
  }

  posicaoUsuario(uid) {
    const ranking = this.topJogadores(100);
    return ranking.findIndex((entry) => entry.uid === uid) + 1;
  }
}
