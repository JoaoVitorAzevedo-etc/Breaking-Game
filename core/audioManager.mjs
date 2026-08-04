export class AudioManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
    this.muted = false;
    this.volume = 0.8;
    this.musicEnabled = true;
    this.effectsEnabled = true;
  }

  init() {
    const saved = this.app?.carregarDados?.('audioPreferences', null);
    if (saved) {
      this.volume = saved.volume ?? this.volume;
      this.muted = saved.muted ?? this.muted;
      this.musicEnabled = saved.musicEnabled ?? this.musicEnabled;
      this.effectsEnabled = saved.effectsEnabled ?? this.effectsEnabled;
    }

    this.state.audio = {
      ...(this.state.audio || {}),
      enabled: !this.muted,
      volume: this.volume,
      musicEnabled: this.musicEnabled,
      effectsEnabled: this.effectsEnabled,
      muted: this.muted
    };
    return this;
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    this.state.audio.volume = this.volume;
    this.persist();
    return this.volume;
  }

  toggleMute() {
    this.muted = !this.muted;
    this.state.audio.enabled = !this.muted;
    this.state.audio.muted = this.muted;
    this.persist();
    return this.muted;
  }

  setMusic(enabled) {
    this.musicEnabled = enabled;
    this.state.audio.musicEnabled = enabled;
    this.persist();
    return enabled;
  }

  setEffects(enabled) {
    this.effectsEnabled = enabled;
    this.state.audio.effectsEnabled = enabled;
    this.persist();
    return enabled;
  }

  persist() {
    this.app?.salvarDados?.('audioPreferences', {
      volume: this.volume,
      muted: this.muted,
      musicEnabled: this.musicEnabled,
      effectsEnabled: this.effectsEnabled
    });
    return true;
  }
}
