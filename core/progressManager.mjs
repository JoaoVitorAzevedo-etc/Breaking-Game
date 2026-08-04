export class ProgressManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  desbloquearFase(fase) {
    const desbloqueadas = this.appContext.state.progress?.fasesDesbloqueadas || [];
    if (!desbloqueadas.includes(fase)) desbloqueadas.push(fase);
    this.appContext.state.progress = { ...(this.appContext.state.progress || {}), fasesDesbloqueadas: desbloqueadas };
    return desbloqueadas;
  }

  carregarCurriculo() {
    return this.appContext.state.progress?.curriculo || [];
  }

  atualizarRoadmap(roadmap) {
    this.appContext.state.progress = { ...(this.appContext.state.progress || {}), roadmap };
    return roadmap;
  }

  atualizarNivel(nivel) {
    this.appContext.state.progress = { ...(this.appContext.state.progress || {}), nivel };
    return nivel;
  }

  registrarMissao(missao) {
    const missoes = this.appContext.state.progress?.missoes || [];
    missoes.push(missao);
    this.appContext.state.progress = { ...(this.appContext.state.progress || {}), missoes };
    return missoes;
  }

  registrarObjetivo(objetivo) {
    const objetivos = this.appContext.state.progress?.objetivos || [];
    objetivos.push(objetivo);
    this.appContext.state.progress = { ...(this.appContext.state.progress || {}), objetivos };
    return objetivos;
  }

  registrarConquista(conquista) {
    const conquistas = this.appContext.state.progress?.conquistas || [];
    conquistas.push(conquista);
    this.appContext.state.progress = { ...(this.appContext.state.progress || {}), conquistas };
    return conquistas;
  }
}
