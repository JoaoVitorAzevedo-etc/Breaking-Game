import { createProfile, loadProfile, saveProfile, setLevel, setLastPhase, setTheme, setFont, updatePoints, updateXP, updateCoins, addItemToInventory, addBadge } from '../services/usuarioService.mjs';

export class ProfileManager {
  constructor(appContext) {
    this.appContext = appContext;
  }

  async carregarPerfil(uid) {
    const perfil = await loadProfile(uid);
    this.appContext.state.perfil = perfil || null;
    this.appContext.state.usuario = perfil || null;
    return perfil;
  }

  async salvarPerfil(uid, updates) {
    await saveProfile(uid, updates);
    this.appContext.state.perfil = { ...(this.appContext.state.perfil || {}), ...updates };
    return this.appContext.state.perfil;
  }

  async atualizarPerfil(uid, updates) {
    return this.salvarPerfil(uid, updates);
  }

  async criarPerfil(uid, email) {
    const perfil = await createProfile(uid, email);
    this.appContext.state.perfil = perfil;
    return perfil;
  }

  async alterarNome(uid, nome) {
    return this.salvarPerfil(uid, { nome });
  }

  async alterarAvatar(uid, avatar) {
    return this.salvarPerfil(uid, { avatar });
  }

  async alterarTema(uid, tema) {
    await setTheme(uid, tema);
    this.appContext.state.tema = tema;
    return tema;
  }

  async alterarFonte(uid, fonte) {
    await setFont(uid, fonte);
    this.appContext.state.fonte = fonte;
    return fonte;
  }

  async alterarPreferencias(uid, preferencias) {
    return this.salvarPerfil(uid, { preferencias });
  }

  async atualizarNivel(uid, nivel) {
    await setLevel(uid, nivel);
    this.appContext.state.perfil = { ...(this.appContext.state.perfil || {}), nivel };
    return nivel;
  }

  async atualizarXP(uid, deltaXP) {
    return updateXP(uid, deltaXP);
  }

  async atualizarMoedas(uid, deltaCoins) {
    return updateCoins(uid, deltaCoins);
  }

  async atualizarProgresso(uid, progresso) {
    return this.salvarPerfil(uid, progresso);
  }
}
