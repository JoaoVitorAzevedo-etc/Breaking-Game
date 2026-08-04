export class SyncManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
  }

  async saveAndSync(key, value) {
    this.app?.salvarDados?.(key, value);
    this.app?.storageManager?.set?.(key, value);
    if (this.app?.state?.auth?.authenticated && this.app?.firebaseManager) {
      await this.app.firebaseManager.saveDocument('cache', { key, value }, `${this.app.state.auth.uid || 'local'}:${key}`);
    }
    return true;
  }

  async syncFirebase() {
    if (!this.app?.firebaseManager) return false;
    return true;
  }

  resolveConflicts(localValue, remoteValue) {
    return localValue ?? remoteValue;
  }

  updateUI() {
    return this.app?.uiManager?.init?.() ?? false;
  }

  updateCache(payload) {
    return this.app?.cacheManager?.set?.(payload.key, payload.value) ?? false;
  }
}
