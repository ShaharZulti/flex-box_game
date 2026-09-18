/* ==========================================================================
   Main Application Controller: Views, Events, Modals & Life-cycle
   ========================================================================== */

import { LEVELS, FLEXBOX_GUIDE } from './levels.js';
import { sound } from './audio.js';
import { confetti } from './confetti.js';
import { storage } from './storage.js';
import { CodeBuilder } from './dnd.js';
import { GameEngine } from './game.js';

class App {
  constructor() {
    this.currentLevelIndex = 0;
    this.codeBuilder = null;
    this.gameEngine = null;

    // DOM Elements
    this.homeView = document.getElementById('home-view');
    this.gameView = document.getElementById('game-view');
    this.levelsGrid = document.getElementById('levels-grid');
    this.progressFill = document.getElementById('progress-fill');
    this.progressText = document.getElementById('progress-text');
    
    // Navbar Elements
    this.navBrand = document.getElementById('nav-brand');
    this.themeToggleBtn = document.getElementById('theme-toggle-btn');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.btnBackHome = document.getElementById('btn-back-home');
    this.btnResetAllProgress = document.getElementById('btn-reset-all-progress');

    // Game Elements
    this.levelBadgeNumber = document.getElementById('level-badge-number');
    this.levelBadgeTitle = document.getElementById('level-badge-title');
    this.instructionBox = document.getElementById('instruction-content');
    this.tableFrame = document.getElementById('dining-table');
    this.targetLayer = document.getElementById('layer-targets');
    this.foodLayer = document.getElementById('layer-food');
    this.editorContainer = document.getElementById('code-editor-box');
    this.chipsPool = document.getElementById('chips-pool');

    // Guide Modal Elements (!)
    this.btnOpenGuide = document.getElementById('btn-open-guide');
    this.guideModal = document.getElementById('guide-modal');
    this.btnCloseGuide = document.getElementById('btn-close-guide');
    this.btnGuideGotIt = document.getElementById('btn-guide-got-it');
    this.guideTabs = document.getElementById('guide-tabs');
    this.guideContentPane = document.getElementById('guide-content-pane');

    // Action Buttons & Inline Feedback (No popups!)
    this.btnServe = document.getElementById('btn-serve-check');
    this.btnResetLevel = document.getElementById('btn-reset-level');
    this.btnNextLevel = document.getElementById('btn-next-level');
    this.levelSuccessBanner = document.getElementById('level-success-banner');

    // Modals & Toast
    this.trophyModal = document.getElementById('trophy-modal');
    this.btnTrophyRestart = document.getElementById('btn-trophy-restart');
    this.btnTrophyMenu = document.getElementById('btn-trophy-menu');
    this.toast = document.getElementById('toast-feedback');
  }

  init() {
    this._initPreferences();
    this._initEngineAndBuilder();
    this._bindEvents();
    this.renderHomeDashboard();
    this.showHomeView();
  }

  _initPreferences() {
    // Theme setup
    const savedTheme = storage.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️ Light' : '🌙 Dark';

    // Sound setup
    const isMuted = storage.isSoundMuted();
    sound.setMuted(isMuted);
    this.soundToggleBtn.textContent = isMuted ? '🔇 Muted' : '🔊 Sound';
  }

  _initEngineAndBuilder() {
    this.codeBuilder = new CodeBuilder({
      editorContainer: this.editorContainer,
      chipsPool: this.chipsPool,
      onValueChange: () => {
        // Hide next level button and banner if player modifies code
        this.btnNextLevel.style.display = 'none';
        if (this.levelSuccessBanner) {
          this.levelSuccessBanner.style.display = 'none';
        }
      }
    });

    this.gameEngine = new GameEngine({
      tableFrame: this.tableFrame,
      targetLayer: this.targetLayer,
      foodLayer: this.foodLayer,
      onLevelComplete: (level) => {
        this._handleLevelSuccess(level);
      }
    });
  }

  _bindEvents() {
    // Navigation
    this.navBrand.addEventListener('click', () => this.showHomeView());
    this.btnBackHome.addEventListener('click', () => {
      sound.playClick();
      this.showHomeView();
    });

    // Theme toggle
    this.themeToggleBtn.addEventListener('click', () => {
      sound.playClick();
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      storage.setTheme(next);
      this.themeToggleBtn.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
    });

    // Sound toggle
    this.soundToggleBtn.addEventListener('click', () => {
      const nextMute = !sound.isMuted();
      sound.setMuted(nextMute);
      storage.setSoundMuted(nextMute);
      this.soundToggleBtn.textContent = nextMute ? '🔇 Muted' : '🔊 Sound';
      if (!nextMute) sound.playClick();
    });

    // Reset all progress
    if (this.btnResetAllProgress) {
      this.btnResetAllProgress.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all completed levels?')) {
          storage.resetAllProgress();
          this.renderHomeDashboard();
          this._showToast('All progress has been reset.', 'info');
        }
      });
    }

    // Serve / Check solution button
    this.btnServe.addEventListener('click', async () => {
      const level = LEVELS[this.currentLevelIndex];
      const values = this.codeBuilder.getValues();

      // Check if all slots are filled
      const missing = level.slots.some(s => !values[s.property]);
      if (missing) {
        sound.playError();
        this._showToast('Please fill all CSS properties before serving!', 'error');
        return;
      }

      this.btnServe.disabled = true;
      const result = await this.gameEngine.checkSolution(values);
      this.btnServe.disabled = false;

      if (!result.success) {
        this._showToast('Oops! Food missed the plates. Check your flex alignment!', 'error');
      }
    });

    // Reset current level
    this.btnResetLevel.addEventListener('click', () => {
      sound.playClick();
      this.codeBuilder.reset();
      this.gameEngine.resetFoodStyles();
      this.btnNextLevel.style.display = 'none';
      if (this.levelSuccessBanner) {
        this.levelSuccessBanner.style.display = 'none';
      }
      this._showToast('Table reset to default.', 'info');
    });

    // Next Level button
    this.btnNextLevel.addEventListener('click', () => {
      sound.playClick();
      this.goToNextLevel();
    });

    // Trophy Modal buttons (Final 100% win celebration)
    if (this.btnTrophyRestart) {
      this.btnTrophyRestart.addEventListener('click', () => {
        this.hideModal(this.trophyModal);
        this.loadLevel(0);
      });
    }

    if (this.btnTrophyMenu) {
      this.btnTrophyMenu.addEventListener('click', () => {
        this.hideModal(this.trophyModal);
        this.showHomeView();
      });
    }

    // Guide Modal (!)
    if (this.btnOpenGuide) {
      this.btnOpenGuide.addEventListener('click', () => {
        sound.playClick();
        const level = LEVELS[this.currentLevelIndex];
        const defaultProp = (level && level.slots[0]) ? level.slots[0].property : 'justify-content';
        this.openGuide(defaultProp);
      });
    }

    if (this.btnCloseGuide) {
      this.btnCloseGuide.addEventListener('click', () => {
        sound.playClick();
        this.closeGuide();
      });
    }

    if (this.btnGuideGotIt) {
      this.btnGuideGotIt.addEventListener('click', () => {
        sound.playClick();
        this.closeGuide();
      });
    }

    if (this.guideModal) {
      this.guideModal.addEventListener('click', (e) => {
        if (e.target === this.guideModal) {
          this.closeGuide();
        }
      });
    }

    if (this.guideTabs) {
      this.guideTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.guide-tab-btn');
        if (btn && btn.dataset.property) {
          sound.playClick();
          this.switchGuideTab(btn.dataset.property);
        }
      });
    }
  }

  showHomeView() {
    this.homeView.classList.add('active');
    this.gameView.classList.remove('active');
    this.renderHomeDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showGameView() {
    this.homeView.classList.remove('active');
    this.gameView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderHomeDashboard() {
    const completed = storage.getCompletedLevels();
    const count = completed.length;
    const total = LEVELS.length;

    // Progress bar
    const percentage = Math.round((count / total) * 100);
    this.progressFill.style.width = `${percentage}%`;
    this.progressText.textContent = `${count} of ${total} Levels Mastered (${percentage}%)`;

    // Render cards
    this.levelsGrid.innerHTML = '';
    LEVELS.forEach((lvl, idx) => {
      const isDone = storage.isLevelCompleted(lvl.id);
      const isUnlocked = storage.isLevelUnlocked(lvl.id);
      const card = document.createElement('div');
      card.className = `level-card ${isDone ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`;
      
      const thumb = lvl.characters ? lvl.characters[0].img : lvl.characterImg;

      card.innerHTML = `
        <div>
          <div class="level-card-header">
            <div class="level-card-icon">
              <img src="${thumb}" alt="${lvl.characterName || 'Guest'}">
            </div>
            <div>
              <span class="level-card-number">Level ${lvl.id}</span>
              <h4 class="level-card-title">${lvl.title}</h4>
            </div>
          </div>
          <div class="level-card-tags">
            ${lvl.slots.map(s => `<span class="tech-tag">${s.property}</span>`).join('')}
          </div>
        </div>
        <div>
          <button class="level-card-btn ${!isUnlocked ? 'locked-btn' : ''}" ${!isUnlocked ? 'disabled' : ''}>
            ${!isUnlocked ? '🔒 Locked' : (isDone ? 'Replay Level ↻' : 'Start Level ▶')}
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!isUnlocked) {
          sound.playError();
          this._showToast(`Level ${lvl.id} is locked! Complete Level ${lvl.id - 1} first to unlock.`, 'error');
          return;
        }
        sound.playClick();
        this.loadLevel(idx);
      });

      this.levelsGrid.appendChild(card);
    });
  }

  loadLevel(index) {
    if (index < 0 || index >= LEVELS.length) return;
    const level = LEVELS[index];

    // Verify unlocked state
    if (!storage.isLevelUnlocked(level.id)) {
      sound.playError();
      this._showToast(`Level ${level.id} is locked! Complete previous levels first.`, 'error');
      return;
    }

    this.currentLevelIndex = index;

    // Update Header & Badge
    this.levelBadgeNumber.textContent = `Level ${level.id} of ${LEVELS.length}`;
    this.levelBadgeTitle.textContent = level.title;

    // Update Instructions
    this.instructionBox.innerHTML = `
      <h3>${level.title}</h3>
      <p class="instruction-text">${level.instruction}</p>
    `;

    // Reset controls & board
    this.btnNextLevel.style.display = 'none';
    if (this.levelSuccessBanner) {
      this.levelSuccessBanner.style.display = 'none';
    }
    this.codeBuilder.loadLevel(level);
    this.gameEngine.loadLevel(level);

    this.showGameView();
  }

  openGuide(propertyToSelect = 'justify-content') {
    this.switchGuideTab(propertyToSelect);
    if (this.guideModal) {
      this.showModal(this.guideModal);
    }
  }

  closeGuide() {
    if (this.guideModal) {
      this.hideModal(this.guideModal);
    }
  }

  switchGuideTab(property) {
    if (!this.guideTabs || !this.guideContentPane) return;

    const tabs = this.guideTabs.querySelectorAll('.guide-tab-btn');
    tabs.forEach(tab => {
      if (tab.dataset.property === property) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    const guide = FLEXBOX_GUIDE[property];
    if (!guide) return;

    this.guideContentPane.innerHTML = `
      <div class="guide-desc-banner">
        ${guide.description}
      </div>
      <div class="guide-values-list">
        ${guide.values.map(v => `
          <div class="guide-val-item">
            <span class="guide-val-code">${v.val}</span>
            <span class="guide-val-explanation">${v.desc}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  _handleLevelSuccess(level) {
    this.btnNextLevel.style.display = 'inline-flex';
    if (this.levelSuccessBanner) {
      this.levelSuccessBanner.style.display = 'flex';
      this.levelSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    const completed = storage.getCompletedLevels();
    const allCleared = LEVELS.every(l => completed.includes(l.id));

    if (allCleared) {
      // Grand Finale!
      setTimeout(() => {
        this._showTrophyModal();
      }, 1200);
    }
  }

  _showTrophyModal() {
    sound.playTrophyFanfare();
    confetti.fire(160, 5000);
    this.showModal(this.trophyModal);
  }

  goToNextLevel() {
    if (this.currentLevelIndex + 1 < LEVELS.length) {
      this.loadLevel(this.currentLevelIndex + 1);
    } else {
      this._showTrophyModal();
    }
  }

  showModal(modal) {
    modal.classList.add('active');
  }

  hideModal(modal) {
    modal.classList.remove('active');
  }

  _showToast(msg, type = 'info') {
    if (!this.toast) return;
    this.toast.textContent = msg;
    this.toast.className = `toast-feedback show ${type}`;
    setTimeout(() => {
      this.toast.classList.remove('show');
    }, 3200);
  }
}

// Instantiate and initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
