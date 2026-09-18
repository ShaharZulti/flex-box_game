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
    const dishes = Array.from(this.foodLayer.querySelectorAll('.food-item-dish'));
    const firstRects = dishes.map(d => d.getBoundingClientRect());

    this.foodLayer.style.display = 'flex';
    this.foodLayer.style.flexDirection = 'row';
    this.foodLayer.style.justifyContent = 'flex-start';
    this.foodLayer.style.alignItems = 'flex-start';
    this.foodLayer.style.flexWrap = 'nowrap';

    const lastRects = dishes.map(d => d.getBoundingClientRect());

    dishes.forEach((dish, i) => {
      dish.classList.remove('served');
      if (firstRects[i] && lastRects[i]) {
        const deltaX = firstRects[i].left - lastRects[i].left;
        const deltaY = firstRects[i].top - lastRects[i].top;
        dish.style.transition = 'none';
        dish.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    });

    void this.foodLayer.offsetHeight;

    requestAnimationFrame(() => {
      dishes.forEach(dish => {
        dish.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
        dish.style.transform = 'translate(0px, 0px)';
      });
    });

    this.tableFrame.classList.remove('victory-glow', 'shake-error');
  }

  checkSolution(userValues) {
    if (!this.currentLevel) return;

    const dishes = Array.from(this.foodLayer.querySelectorAll('.food-item-dish'));
    const firstRects = dishes.map(d => d.getBoundingClientRect());

    // Apply user choices to food layer
    this.foodLayer.style.display = 'flex';
    this.foodLayer.style.flexDirection = userValues['flex-direction'] || 'row';
    this.foodLayer.style.justifyContent = userValues['justify-content'] || 'flex-start';
    this.foodLayer.style.alignItems = userValues['align-items'] || 'flex-start';
    this.foodLayer.style.flexWrap = userValues['flex-wrap'] || 'nowrap';

    const lastRects = dishes.map(d => d.getBoundingClientRect());

    // Invert: position dishes back at their start coordinates
    dishes.forEach((dish, i) => {
      if (firstRects[i] && lastRects[i]) {
        const deltaX = firstRects[i].left - lastRects[i].left;
        const deltaY = firstRects[i].top - lastRects[i].top;
        dish.style.transition = 'none';
        dish.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.96)`;
      }
    });

    // Trigger browser reflow
    void this.foodLayer.offsetHeight;

    sound.playServe();

    // Play: Glide smoothly with bouncy spring easing
    requestAnimationFrame(() => {
      dishes.forEach(dish => {
        dish.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.4, 0.64, 1)';
        dish.style.transform = 'translate(0px, 0px) scale(1)';
      });
    });

    // Allow CSS animation to finish before checking validation
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
      }, 700);
    });
  }

  _validateMatch(userValues) {
    const winning = this.currentLevel.winningSolution;
    
    // Strictly require exact matching CSS properties for the level solution
    for (const [prop, targetVal] of Object.entries(winning)) {
      if (userValues[prop] !== targetVal) {
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
