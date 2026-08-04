export class UIManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
  }

  init() {
    this.state.ui = { ...(this.state.ui || {}), initialized: true };
    return this;
  }

  updateHUD(patch = {}) {
    return this.app?.hudManager?.update?.(patch) ?? false;
  }

  showScreen(screenId, options = {}) {
    return this.app?.navigationManager?.showScreen?.(screenId, options) ?? false;
  }

  hideScreen(screenId) {
    return this.app?.navigationManager?.hideScreen?.(screenId) ?? false;
  }

  toggleScreen(screenId) {
    return this.app?.navigationManager?.toggleScreen?.(screenId) ?? false;
  }

  openModal(modalId, options = {}) {
    return this.app?.modalManager?.open?.(modalId, options) ?? false;
  }

  closeModal(modalId) {
    return this.app?.modalManager?.close?.(modalId) ?? false;
  }

  toggleModal(modalId) {
    return this.app?.modalManager?.toggle?.(modalId) ?? false;
  }
}
