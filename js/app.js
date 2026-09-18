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

    // About Us & Creators Elements
    this.btnAboutNav = document.getElementById('btn-about-nav');
    this.aboutModal = document.getElementById('about-modal');
    this.btnCloseAbout = document.getElementById('btn-close-about');
    this.btnAboutCloseBtn = document.getElementById('btn-about-close-btn');
  }

  init() {
    try { this._initPreferences(); } catch (e) { console.error('Preferences init error:', e); }
    try { this._initEngineAndBuilder(); } catch (e) { console.error('Engine init error:', e); }
    try { this._bindEvents(); } catch (e) { console.error('Events binding error:', e); }
    try { this.updateBoardScale(); } catch (e) { console.error('Scale init error:', e); }
    try { this.renderHomeDashboard(); } catch (e) { console.error('Dashboard render error:', e); }
    try { this.showHomeView(); } catch (e) { console.error('Show view error:', e); }
  }

  _initPreferences() {
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

    // About Us Navigation & Modal
    if (this.btnAboutNav) {
      this.btnAboutNav.addEventListener('click', () => {
        sound.playClick();
        if (this.aboutModal) {
          this.showModal(this.aboutModal);
        }
      });
    }

    if (this.btnCloseAbout) {
      this.btnCloseAbout.addEventListener('click', () => {
        sound.playClick();
        if (this.aboutModal) this.hideModal(this.aboutModal);
      });
    }

    if (this.btnAboutCloseBtn) {
      this.btnAboutCloseBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.aboutModal) this.hideModal(this.aboutModal);
      });
    }

    if (this.aboutModal) {
      this.aboutModal.addEventListener('click', (e) => {
        if (e.target === this.aboutModal) {
          this.hideModal(this.aboutModal);
        }
      });
    }

    // Responsive Board Scaler Listener
    window.addEventListener('resize', () => this.updateBoardScale());
    window.addEventListener('orientationchange', () => setTimeout(() => this.updateBoardScale(), 100));
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
    this.updateBoardScale();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateBoardScale() {
    const leftPanel = document.querySelector('.left-panel');
    const scaler = document.querySelector('.board-viewport-scaler');
    if (!scaler) return;

    const parentWidth = leftPanel && leftPanel.clientWidth > 50 ? leftPanel.clientWidth : window.innerWidth;
    const maxAvailable = Math.min(500, Math.floor(parentWidth - 12));
    if (maxAvailable < 500) {
      const scale = Math.max(0.45, maxAvailable / 500);
      document.documentElement.style.setProperty('--board-scale', scale.toFixed(3));
    } else {
      document.documentElement.style.setProperty('--board-scale', '1');
    }
  }

  renderHomeDashboard() {
    const completed = storage.getCompletedLevels();
    const count = completed.length;
    const total = LEVELS.length;

    // Progress bar
    const percentage = Math.round((count / total) * 100);
    this.progressFill.style.width = `${percentage}%`;
    this.progressText.textContent = `Culinary Progress: ${count} of ${total} Levels Mastered (${percentage}%)`;

    // Render cards
    this.levelsGrid.innerHTML = '';
    LEVELS.forEach((lvl, idx) => {
      const isDone = storage.isLevelCompleted(lvl.id);
      const isUnlocked = storage.isLevelUnlocked(lvl.id);
      const card = document.createElement('div');
      
      let stateClass = 'locked';
      if (isDone) {
        stateClass = 'completed';
      } else if (isUnlocked) {
        stateClass = 'active-stage';
      }
      card.className = `level-card ${stateClass}`;
      
      const thumb = lvl.characters ? lvl.characters[0].img : lvl.characterImg;
      const foodThumb = lvl.foodImg || 'assets/foods/sushi.png';

      // Status indicator badge
      let badgeHtml = '';
      if (isDone) {
        badgeHtml = '<span class="card-status-badge completed">הושלם ⭐</span>';
      } else if (!isUnlocked) {
        badgeHtml = '<span class="card-status-badge locked" title="Locked Stage">🔒</span>';
      }

      // Button
      let btnHtml = '';
      if (!isUnlocked) {
        btnHtml = '<button class="level-card-btn btn-locked" disabled>Locked</button>';
      } else if (isDone) {
        btnHtml = '<button class="level-card-btn btn-replay">Replay Level ↻</button>';
      } else {
        btnHtml = '<button class="level-card-btn btn-start">Start Level ▶</button>';
      }

      card.innerHTML = `
        ${badgeHtml}
        <div class="level-card-top-row">
          <div class="level-card-food-icon">
            <img src="${foodThumb}" alt="${lvl.title} dish">
          </div>
          <div class="level-card-info-col">
            <span class="level-card-number">LEVEL ${lvl.id}</span>
            <h4 class="level-card-title">${lvl.title}</h4>
            <div class="level-card-tags">
              ${lvl.slots.map(s => `<span class="tech-tag">${s.property}</span>`).join('')}
            </div>
          </div>
          <div class="level-card-guest-icon">
            <img src="${thumb}" alt="${lvl.characterName || 'Guest'}">
          </div>
        </div>
        <div class="level-card-bottom-row">
          ${btnHtml}
        </div>
      `;

      card.addEventListener('click', (e) => {
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
      <span class="instruction-chef-icon">👨‍🍳</span>
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

// Safe instantiation: works if DOM is loading or already interactive/complete
function bootstrapApp() {
  const app = new App();
  app.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
