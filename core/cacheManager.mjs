export class CacheManager {
  constructor(app) {
    this.app = app;
    this.state = app.state;
  }

  init() {
    this.state.cache = { ...(this.state.cache || {}), initialized: true };
    return this;
  }

  set(key, value) {
    this.state.cache[key] = value;
    return value;
  }

  get(key, fallback = null) {
    return this.state.cache?.[key] ?? fallback;
  }

  preloadQuestions(questions) {
    this.set('questions', questions);
    return questions;
  }

  preloadProfile(profile) {
    this.set('profile', profile);
    return profile;
  }

  preloadInventory(items) {
    this.set('inventory', items);
    return items;
  }

  preloadRanking(ranking) {
    this.set('ranking', ranking);
    return ranking;
  }
}
