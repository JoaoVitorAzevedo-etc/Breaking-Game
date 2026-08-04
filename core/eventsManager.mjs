export class EventsManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
    this.listeners = new Map();
  }

  bind(target, type, selector, handler, options = {}) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return null;
    const wrapped = (event) => {
      this.state.lastEvent = `${type}:${selector}`;
      handler(event);
    };
    element.addEventListener(type, wrapped, options);
    if (!this.listeners.has(element)) this.listeners.set(element, []);
    this.listeners.get(element).push({ type, selector, wrapped });
    return wrapped;
  }

  registerGlobal(type, handler) {
    window.addEventListener(type, handler);
    return handler;
  }

  destroy() {
    this.listeners.forEach((events, element) => {
      events.forEach(({ type, wrapped }) => element.removeEventListener(type, wrapped));
    });
    this.listeners.clear();
  }
}
