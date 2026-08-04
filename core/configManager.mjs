export class ConfigManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
  }

  init() {
    const saved = this.app?.carregarDados?.('preferences', {});
    this.state.configuracoes = {
      tema: saved.tema || this.state.tema || 'light-1',
      fonte: saved.fonte || this.state.fonte || 'inter',
      idioma: saved.idioma || 'pt-BR',
      volume: saved.volume ?? 0.8,
      animacoes: saved.animacoes !== false,
      acessibilidade: saved.acessibilidade || false,
      ...this.state.configuracoes
    };
    this.apply();
    return this;
  }

  apply() {
    const cfg = this.state.configuracoes || {};
    document.body.setAttribute('data-theme', cfg.tema || 'light-1');
    document.body.setAttribute('data-lang', cfg.idioma || 'pt-BR');
    document.documentElement.style.setProperty('--tamanho-fonte', cfg.tamanhoFonte || '1');
    this.app?.setTema?.(cfg.tema);
    this.app?.alterarFonte?.(cfg.fonte);
    this.app?.alterarTamanhoFonte?.(cfg.tamanhoFonte || 'medio');
    return cfg;
  }

  update(patch) {
    this.state.configuracoes = { ...(this.state.configuracoes || {}), ...(patch || {}) };
    this.app?.salvarDados?.('preferences', this.state.configuracoes);
    this.apply();
    return this.state.configuracoes;
  }

  setTheme(theme) {
    return this.update({ tema: theme });
  }

  setFont(font) {
    return this.update({ fonte: font });
  }

  setLanguage(lang) {
    return this.update({ idioma: lang });
  }

  setVolume(volume) {
    return this.update({ volume });
  }

  setAnimations(enabled) {
    return this.update({ animacoes: enabled });
  }

  setAccessibility(enabled) {
    return this.update({ acessibilidade: enabled });
  }
}
