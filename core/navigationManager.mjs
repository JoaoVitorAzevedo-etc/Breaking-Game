export class NavigationManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
  }

  showScreen(screenId, options = {}) {
    const element = document.getElementById(screenId);
    if (!element) return false;
    element.style.display = 'block';
    if (options.className) {
      element.className = options.className;
    }
    this.state.ui.currentScreen = screenId;
    return true;
  }

  hideScreen(screenId) {
    const element = document.getElementById(screenId);
    if (!element) return false;
    element.style.display = 'none';
    return true;
  }

  toggleScreen(screenId) {
    const element = document.getElementById(screenId);
    if (!element) return false;
    const next = element.style.display === 'block' ? 'none' : 'block';
    element.style.display = next;
    return next === 'block';
  }

  showOverlay() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.style.display = 'block';
  }

  hideOverlay() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  openScreen(screenId, { overlay = true } = {}) {
    if (overlay) this.showOverlay();
    return this.showScreen(screenId);
  }

  closeScreen(screenId, { overlay = true } = {}) {
    const result = this.hideScreen(screenId);
    if (overlay) this.hideOverlay();
    return result;
  }
}
