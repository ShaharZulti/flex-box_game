/* ==========================================================================
   Game Engine: Dining Table Rendering, Flexbox Application & Validation
   ========================================================================== */

import { sound } from './audio.js';
import { confetti } from './confetti.js';
import { storage } from './storage.js';

export class GameEngine {
  constructor({ tableFrame, targetLayer, foodLayer, onLevelComplete }) {
    this.tableFrame = tableFrame;
    this.targetLayer = targetLayer;
    this.foodLayer = foodLayer;
    this.onLevelComplete = onLevelComplete || (() => {});
    this.currentLevel = null;
    this.isSolved = false;
  }

  loadLevel(level) {
    this.currentLevel = level;
    this.isSolved = false;

    // Reset table visual state
    this.tableFrame.classList.remove('victory-glow', 'shake-error');

    // Render Targets Layer (Hungry Guests)
    this.renderTargets(level);

    // Render Food Layer (Dishes)
    this.renderFood(level);

    // Reset food layer styles to default flex
    this.resetFoodStyles();
  }

  renderTargets(level) {
    this.targetLayer.innerHTML = '';

    // Apply target flex styles
    Object.assign(this.targetLayer.style, {
      display: 'flex',
      flexDirection: level.targetStyles['flex-direction'] || 'row',
      justifyContent: level.targetStyles['justify-content'] || 'flex-start',
      alignItems: level.targetStyles['align-items'] || 'flex-start',
      flexWrap: level.targetStyles['flex-wrap'] || 'nowrap'
    });

    const isBanquet = Boolean(level.characters);

    for (let i = 0; i < level.itemCount; i++) {
      const charImg = isBanquet ? level.characters[i].img : level.characterImg;
      const charName = isBanquet ? level.characters[i].name : level.characterName;
      const orderNum = isBanquet ? level.characters[i].order : (i + 1);

      const targetEl = document.createElement('div');
      targetEl.className = 'target-guest-slot';
      targetEl.innerHTML = `
        <div class="guest-avatar" title="${charName}">
          <img src="${charImg}" alt="${charName}">
        </div>
        ${level.hasOrderLabels ? `<span class="item-order-badge">#${orderNum}</span>` : ''}
      `;
      this.targetLayer.appendChild(targetEl);
    }
  }

  renderFood(level) {
    this.foodLayer.innerHTML = '';

    const isBanquet = Boolean(level.characters);

    for (let i = 0; i < level.itemCount; i++) {
      const foodImg = isBanquet ? level.characters[i].food : level.foodImg;
      const foodName = isBanquet ? level.characters[i].foodName : level.foodName;
      const orderNum = isBanquet ? level.characters[i].order : (i + 1);

      const dishEl = document.createElement('div');
      dishEl.className = 'food-item-dish';
      dishEl.dataset.index = i;
      dishEl.innerHTML = `
        <div class="food-inner-plate" title="${foodName}">
          <img src="${foodImg}" alt="${foodName}">
        </div>
        ${level.hasOrderLabels ? `<span class="item-order-badge">#${orderNum}</span>` : ''}
      `;
      this.foodLayer.appendChild(dishEl);
    }
  }

  resetFoodStyles() {
    this.foodLayer.style.display = 'flex';
    this.foodLayer.style.flexDirection = 'row';
    this.foodLayer.style.justifyContent = 'flex-start';
    this.foodLayer.style.alignItems = 'flex-start';
    this.foodLayer.style.flexWrap = 'nowrap';

    const dishes = this.foodLayer.querySelectorAll('.food-item-dish');
    dishes.forEach(d => d.classList.remove('served'));
    this.tableFrame.classList.remove('victory-glow', 'shake-error');
  }

  checkSolution(userValues) {
    if (!this.currentLevel) return;

    // Apply user choices to food layer
    this.foodLayer.style.display = 'flex';
    if (userValues['flex-direction']) this.foodLayer.style.flexDirection = userValues['flex-direction'];
    if (userValues['justify-content']) this.foodLayer.style.justifyContent = userValues['justify-content'];
    if (userValues['align-items']) this.foodLayer.style.alignItems = userValues['align-items'];
    if (userValues['flex-wrap']) this.foodLayer.style.flexWrap = userValues['flex-wrap'];

    sound.playServe();

    // Allow CSS transition to finish before computing exact overlap
    return new Promise((resolve) => {
      setTimeout(() => {
        const isMatch = this._validateMatch(userValues);

        if (isMatch) {
          this._handleSuccess();
          resolve({ success: true });
        } else {
          this._handleFailure(userValues);
          resolve({ success: false });
        }
      }, 550);
    });
  }

  _validateMatch(userValues) {
    const winning = this.currentLevel.winningSolution;
    
    // 1. Exact CSS property comparison
    let exactMatch = true;
    for (const [prop, targetVal] of Object.entries(winning)) {
      if (userValues[prop] !== targetVal) {
        exactMatch = false;
        break;
      }
    }
    if (exactMatch) {
      return true;
    }

    // 2. Spatial bounding rect verification (allows visual equivalents)
    const targets = Array.from(this.targetLayer.querySelectorAll('.target-guest-slot'));
    const foods = Array.from(this.foodLayer.querySelectorAll('.food-item-dish'));

    if (targets.length !== foods.length) return false;

    for (let i = 0; i < targets.length; i++) {
      const tRect = targets[i].getBoundingClientRect();
      const fRect = foods[i].getBoundingClientRect();

      const distX = Math.abs((tRect.left + tRect.width / 2) - (fRect.left + fRect.width / 2));
      const distY = Math.abs((tRect.top + tRect.height / 2) - (fRect.top + fRect.height / 2));

      // 30px threshold tolerance for scaled viewports
      if (distX > 30 || distY > 30) {
        return false;
      }
    }

    return true;
  }

  _handleSuccess() {
    this.isSolved = true;
    sound.playWin();
    confetti.fire(100, 3000);

    this.tableFrame.classList.remove('shake-error');
    this.tableFrame.classList.add('victory-glow');

    const dishes = this.foodLayer.querySelectorAll('.food-item-dish');
    dishes.forEach(d => d.classList.add('served'));

    storage.markLevelCompleted(this.currentLevel.id);
    this.onLevelComplete(this.currentLevel);
  }

  _handleFailure(userValues) {
    sound.playError();
    this.tableFrame.classList.remove('shake-error');
    // Force reflow for restart animation
    void this.tableFrame.offsetWidth;
    this.tableFrame.classList.add('shake-error');

    setTimeout(() => {
      this.tableFrame.classList.remove('shake-error');
    }, 700);
  }
}
