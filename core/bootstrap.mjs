import { createInitialState } from './state.mjs';
import { AuthManager } from './authManager.mjs';
import { ProfileManager } from './profileManager.mjs';
import { GameManager } from './gameManager.mjs';
import { QuestionsManager } from './questionsManager.mjs';
import { ScoreManager } from './scoreManager.mjs';
import { ProgressManager } from './progressManager.mjs';
import { BadgeManager } from './badgeManager.mjs';
import { InventoryManager } from './inventoryManager.mjs';
import { ShopManager } from './shopManager.mjs';
import { DashboardManager } from './dashboardManager.mjs';
import { RankingManager } from './rankingManager.mjs';
import { HistoryManager } from './historyManager.mjs';
import { StatisticsManager } from './statisticsManager.mjs';
import { HUDManager } from './hudManager.mjs';
import { NavigationManager } from './navigationManager.mjs';
import { ModalManager } from './modalManager.mjs';
import { EventsManager } from './eventsManager.mjs';
import { AudioManager } from './audioManager.mjs';
import { ConfigManager } from './configManager.mjs';
import { UIManager } from './uiManager.mjs';
import { FirebaseManager } from './firebaseManager.mjs';
import { StorageManager } from './storageManager.mjs';
import { CacheManager } from './cacheManager.mjs';
import { SyncManager } from './syncManager.mjs';
import { ErrorManager } from './errorManager.mjs';
import { DebugManager } from './debugManager.mjs';

export class Bootstrapper {
  constructor(target) {
    this.target = target;
    this.state = createInitialState();
    this.authManager = new AuthManager(this);
    this.profileManager = new ProfileManager(this);
    this.gameManager = new GameManager(this);
    this.questionsManager = new QuestionsManager(this);
    this.scoreManager = new ScoreManager(this);
    this.progressManager = new ProgressManager(this);
    this.badgeManager = new BadgeManager(this);
    this.inventoryManager = new InventoryManager(this);
    this.shopManager = new ShopManager(this);
    this.dashboardManager = new DashboardManager(this);
    this.rankingManager = new RankingManager(this);
    this.historyManager = new HistoryManager(this);
    this.statisticsManager = new StatisticsManager(this);
    this.hudManager = new HUDManager(this.target);
    this.navigationManager = new NavigationManager(this.target);
    this.modalManager = new ModalManager(this.target);
    this.eventsManager = new EventsManager(this.target);
    this.audioManager = new AudioManager(this.target);
    this.configManager = new ConfigManager(this.target);
    this.uiManager = new UIManager(this.target);
    this.firebaseManager = new FirebaseManager(this.target);
    this.storageManager = new StorageManager(this.target);
    this.cacheManager = new CacheManager(this.target);
    this.syncManager = new SyncManager(this.target);
    this.errorManager = new ErrorManager(this.target);
    this.debugManager = new DebugManager(this.target);
    this.target.state = this.state;
    this.target.application = this;
    this.target.authManager = this.authManager;
    this.target.profileManager = this.profileManager;
    this.target.gameManager = this.gameManager;
    this.target.questionsManager = this.questionsManager;
    this.target.scoreManager = this.scoreManager;
    this.target.progressManager = this.progressManager;
    this.target.badgeManager = this.badgeManager;
    this.target.inventoryManager = this.inventoryManager;
    this.target.shopManager = this.shopManager;
    this.target.dashboardManager = this.dashboardManager;
    this.target.rankingManager = this.rankingManager;
    this.target.historyManager = this.historyManager;
    this.target.statisticsManager = this.statisticsManager;
    this.target.hudManager = this.hudManager;
    this.target.navigationManager = this.navigationManager;
    this.target.modalManager = this.modalManager;
    this.target.eventsManager = this.eventsManager;
    this.target.audioManager = this.audioManager;
    this.target.configManager = this.configManager;
    this.target.uiManager = this.uiManager;
    this.target.firebaseManager = this.firebaseManager;
    this.target.storageManager = this.storageManager;
    this.target.cacheManager = this.cacheManager;
    this.target.syncManager = this.syncManager;
    this.target.errorManager = this.errorManager;
    this.target.debugManager = this.debugManager;
    this.target.app = this.target;
  }

  async init() {
    this.state.ui.initialized = true;
    this.state.ui.ready = false;
    this.registrarEventosGlobais();
    await this.inicializarFirebase();
    await this.inicializarAuth();
    await this.inicializarConfig();
    await this.inicializarModulos();
    this.hudManager.init();
    this.audioManager.init();
    this.configManager.init();
    this.uiManager.init();
    this.firebaseManager.init();
    this.cacheManager.init();
    this.state.ui.ready = true;
    this.target.app = this.target;
    return this;
  }

  async inicializarFirebase() {
    this.state.cache.firebase = true;
    return true;
  }

  async inicializarAuth() {
    this.authManager.onAuthChanged((user) => {
      this.state.auth.user = user;
      this.state.auth.uid = user?.uid || null;
      this.state.auth.authenticated = !!user;
    });
    return true;
  }

  async inicializarConfig() {
    this.state.configuracoes = this.state.configuracoes || {};
    return true;
  }

  async inicializarModulos() {
    this.state.modules.auth = this.authManager;
    this.state.modules.profile = this.profileManager;
    this.state.modules.game = this.gameManager;
    this.state.modules.questions = this.questionsManager;
    this.state.modules.score = this.scoreManager;
    this.state.modules.progress = this.progressManager;
    this.state.modules.badges = this.badgeManager;
    this.state.modules.inventory = this.inventoryManager;
    this.state.modules.shop = this.shopManager;
    this.state.modules.dashboard = this.dashboardManager;
    this.state.modules.ranking = this.rankingManager;
    this.state.modules.history = this.historyManager;
    this.state.modules.statistics = this.statisticsManager;
    this.state.modules.hud = this.hudManager;
    this.state.modules.navigation = this.navigationManager;
    this.state.modules.modal = this.modalManager;
    this.state.modules.events = this.eventsManager;
    this.state.modules.audio = this.audioManager;
    this.state.modules.config = this.configManager;
    this.state.modules.ui = this.uiManager;
    this.state.modules.firebase = this.firebaseManager;
    this.state.modules.storage = this.storageManager;
    this.state.modules.cache = this.cacheManager;
    this.state.modules.sync = this.syncManager;
    this.state.modules.error = this.errorManager;
    this.state.modules.debug = this.debugManager;
    return true;
  }

  registrarEventosGlobais() {
    window.addEventListener('online', () => {
      this.state.cache.online = true;
    });
    window.addEventListener('offline', () => {
      this.state.cache.online = false;
    });
  }

  async inicializarSons() {
    return true;
  }

  async inicializarInterface() {
    return true;
  }

  async inicializarCache() {
    this.state.cache = { ...(this.state.cache || {}), initialized: true };
    return true;
  }
}
