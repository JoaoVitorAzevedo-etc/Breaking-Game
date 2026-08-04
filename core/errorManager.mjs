export class ErrorManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
  }

  log(message, detail = {}) {
    console.log('[BreakingGame]', message, detail);
    this.state.lastError = { message, detail };
    return this;
  }

  warn(message, detail = {}) {
    console.warn('[BreakingGame]', message, detail);
    this.state.lastError = { message, detail, level: 'warn' };
    return this;
  }

  error(message, detail = {}) {
    console.error('[BreakingGame]', message, detail);
    this.state.lastError = { message, detail, level: 'error' };
    return this;
  }

  async withFallback(fn, fallbackValue = null) {
    try {
      return await fn();
    } catch (err) {
      this.error('Falha na operação', err);
      return fallbackValue;
    }
  }
}
