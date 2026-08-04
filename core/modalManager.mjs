export class ModalManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
    this.stack = [];
  }

  open(id, options = {}) {
    const element = document.getElementById(id);
    if (!element) return false;
    element.style.display = 'block';
    this.state.ui.modalAberto = true;
    this.stack.push(id);
    if (options.overlay !== false) {
      const overlay = document.getElementById('modal-overlay');
      if (overlay) overlay.style.display = 'block';
    }
    return true;
  }

  close(id) {
    const element = document.getElementById(id);
    if (!element) return false;
    element.style.display = 'none';
    this.stack = this.stack.filter(item => item !== id);
    this.state.ui.modalAberto = this.stack.length > 0;
    return true;
  }

  toggle(id) {
    const element = document.getElementById(id);
    if (!element) return false;
    const visible = element.style.display === 'block';
    if (visible) {
      this.close(id);
    } else {
      this.open(id);
    }
    return !visible;
  }

  confirm(message, onConfirm = () => {}) {
    this.open('modal-confirm', { overlay: true });
    const content = document.getElementById('modal-confirm-content');
    if (content) content.textContent = message;
    const confirmButton = document.getElementById('modal-confirm-accept');
    if (confirmButton) {
      confirmButton.onclick = () => {
        this.close('modal-confirm');
        onConfirm();
      };
    }
  }

  cancel(id = 'modal-confirm') {
    this.close(id);
  }

  alert(message) {
    const alertEl = document.getElementById('modal-alert');
    if (!alertEl) return false;
    const text = document.getElementById('modal-alert-content');
    if (text) text.textContent = message;
    this.open('modal-alert');
    return true;
  }
}
