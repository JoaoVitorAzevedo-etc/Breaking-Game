export class HUDManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
  }

  init() {
    this.render();
    return this;
  }

  update(patch = {}) {
    if (!this.state?.hud) {
      this.state.hud = {};
    }

    this.state.hud = {
      ...(this.state.hud || {}),
      ...patch
    };

    this.render();
    return this;
  }

  render() {
    const state = this.state || {};
    const values = {
      xp: state.game?.xp ?? state.perfil?.xp ?? state.score?.xp ?? 0,
      moedas: state.game?.moedas ?? state.perfil?.moedas ?? 0,
      vidas: state.game?.vidas ?? state.game?.vidasRestantes ?? 3,
      pontuacao: state.game?.pontuacaoAtual ?? state.game?.pontuacao ?? state.perfil?.pontuacaoTotal ?? 0,
      tempo: state.game?.tempoRestante ?? state.game?.tempo ?? 0,
      nivel: state.game?.nivelAtual ?? state.game?.faseAtual ?? 1,
      combo: state.game?.combo ?? 0,
      perguntaAtual: (state.game?.perguntaAtual ?? state.game?.perguntaAtualIdx ?? 0) + 1
    };

    this.setText('hud-xp', values.xp);
    this.setText('hud-moedas', values.moedas);
    this.setText('hud-vidas', values.vidas);
    this.setText('hud-pontuacao', values.pontuacao);
    this.setText('hud-tempo', values.tempo);
    this.setText('hud-nivel', values.nivel);
    this.setText('hud-combo', values.combo);
    this.setText('hud-pergunta-atual', values.perguntaAtual);

    const hud = document.getElementById('game-hud');
    if (hud) {
      const shouldShow = state.ui?.currentScreen === 'game';
      hud.style.display = shouldShow ? 'block' : 'none';
    }
  }

  setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = String(value ?? 0);
    }
  }
}
