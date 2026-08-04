export class DebugManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
    this.enabled = false;
    this.timers = new Map();
  }

  enable() {
    this.enabled = true;
    this.state.debug = { ...(this.state.debug || {}), enabled: true };
    return this;
  }

  disable() {
    this.enabled = false;
    this.state.debug = { ...(this.state.debug || {}), enabled: false };
    return this;
  }

  log(label, payload) {
    if (!this.enabled) return;
    console.log(`[DEBUG:${label}]`, payload);
  }

  time(label) {
    if (!this.enabled) return null;
    const start = performance.now();
    this.timers.set(label, start);
    return start;
  }

  timeEnd(label) {
    if (!this.enabled) return null;
    const start = this.timers.get(label);
    if (start == null) return null;
    const elapsed = performance.now() - start;
    this.log(label, `${elapsed.toFixed(2)}ms`);
    this.timers.delete(label);
    return elapsed;
  }
}
