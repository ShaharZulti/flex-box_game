/* ==========================================================================
   Drag and Drop & Code Builder Interaction Controller
   Handles HTML5 Drag-and-Drop, Touch/Click fallbacks, and slot state
   ========================================================================== */

import { sound } from './audio.js';

export class CodeBuilder {
  constructor({ editorContainer, chipsPool, onValueChange }) {
    this.editorContainer = editorContainer;
    this.chipsPool = chipsPool;
    this.onValueChange = onValueChange || (() => {});
    this.currentLevel = null;
    this.slotValues = {}; // { propertyName: value }
  }

  loadLevel(level) {
    this.currentLevel = level;
    this.slotValues = {};
    this.renderEditor(level);
    this.renderChips(level);
  }

  renderEditor(level) {
    if (!this.editorContainer) return;

    let slotsHtml = '';
    level.slots.forEach(slot => {
      slotsHtml += `
        <div class="code-line code-indent">
          <span class="code-property">${slot.property}</span>
          <span class="code-punctuation">:</span>
          <div class="drop-slot" 
               data-property="${slot.property}" 
               tabindex="0"
               aria-label="Drop ${slot.property} value here">
            <span class="slot-placeholder">&lt;drop here&gt;</span>
          </div>
          <span class="code-punctuation">;</span>
        </div>
      `;
    });

    this.editorContainer.innerHTML = `
      <div class="editor-window-header">
        <div class="window-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <span class="window-filename">style.css &mdash; #dining-table</span>
      </div>
      <div class="code-line">
        <span class="code-selector">#dining-table</span>
        <span class="code-punctuation">{</span>
      </div>
      <div class="code-line code-indent">
        <span class="code-property">display</span>
        <span class="code-punctuation">:</span>
        <span class="code-val-fixed">flex</span>
        <span class="code-punctuation">;</span>
      </div>
      ${slotsHtml}
      <div class="code-line">
        <span class="code-punctuation">}</span>
      </div>
    `;

    this._bindSlotEvents();
  }

  renderChips(level) {
    if (!this.chipsPool) return;

    this.chipsPool.innerHTML = '';

    // Group available chips by property
    const grouped = {};
    level.slots.forEach(s => {
      grouped[s.property] = [];
    });
    level.availableChips.forEach(chip => {
      if (!grouped[chip.property]) grouped[chip.property] = [];
      grouped[chip.property].push(chip);
    });

    Object.entries(grouped).forEach(([property, chips]) => {
      const row = document.createElement('div');
      row.className = 'chips-group-row';
      
      const label = document.createElement('div');
      label.className = 'chips-group-label';
      label.innerHTML = `<span class="property-tag">${property}</span>:`;
      row.appendChild(label);

      const itemsContainer = document.createElement('div');
      itemsContainer.className = 'chips-group-items';

      chips.forEach((chip) => {
        const chipEl = document.createElement('div');
        chipEl.className = 'code-chip';
        chipEl.draggable = true;
        chipEl.dataset.property = chip.property;
        chipEl.dataset.value = chip.value;
        chipEl.innerHTML = `
          <span class="chip-drag-handle">⋮⋮</span>
          <span>${chip.value}</span>
        `;

        // Drag start
        chipEl.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', JSON.stringify({
            property: chip.property,
            value: chip.value
          }));
          e.dataTransfer.effectAllowed = 'copy';
          chipEl.classList.add('dragging');
        });

        chipEl.addEventListener('dragend', () => {
          chipEl.classList.remove('dragging');
        });

        // Click / Tap fallback for mobile & quick selection
        chipEl.addEventListener('click', () => {
          this.fillSlot(chip.property, chip.value);
          sound.playDrop();
        });

        itemsContainer.appendChild(chipEl);
      });

      row.appendChild(itemsContainer);
      this.chipsPool.appendChild(row);
    });
  }

  _bindSlotEvents() {
    const slots = this.editorContainer.querySelectorAll('.drop-slot');
    slots.forEach(slot => {
      const slotProp = slot.dataset.property;

      slot.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        slot.classList.add('drag-over');
      });

      slot.addEventListener('dragleave', () => {
        slot.classList.remove('drag-over');
      });

      slot.addEventListener('drop', (e) => {
        e.preventDefault();
        slot.classList.remove('drag-over');
        try {
          const raw = e.dataTransfer.getData('text/plain');
          const data = JSON.parse(raw);
          if (data && data.value) {
            // Check if property matches or slot is compatible
            if (data.property === slotProp) {
              this.fillSlot(slotProp, data.value);
              sound.playDrop();
            } else {
              sound.playError();
            }
          }
        } catch (err) {
          console.error('Invalid drop data', err);
        }
      });
    });
  }

  fillSlot(property, value) {
    const slot = this.editorContainer.querySelector(`.drop-slot[data-property="${property}"]`);
    if (!slot) return;

    this.slotValues[property] = value;
    slot.classList.add('filled');
    slot.innerHTML = `
      <span class="code-val-chosen">${value}</span>
      <span class="chip-remove-x" title="Clear value" aria-label="Clear value">&times;</span>
    `;

    const removeBtn = slot.querySelector('.chip-remove-x');
    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.clearSlot(property);
        sound.playClick();
      });
    }

    this._updateChipsState();
    this.onValueChange(this.getValues());
  }

  clearSlot(property) {
    const slot = this.editorContainer.querySelector(`.drop-slot[data-property="${property}"]`);
    if (!slot) return;

    delete this.slotValues[property];
    slot.classList.remove('filled');
    slot.innerHTML = `<span class="slot-placeholder">&lt;drop here&gt;</span>`;

    this._updateChipsState();
    this.onValueChange(this.getValues());
  }

  _updateChipsState() {
    const chips = this.chipsPool.querySelectorAll('.code-chip');
    chips.forEach(chip => {
      const prop = chip.dataset.property;
      const val = chip.dataset.value;
      if (this.slotValues[prop] === val) {
        chip.classList.add('in-use');
      } else {
        chip.classList.remove('in-use');
      }
    });
  }

  getValues() {
    return { ...this.slotValues };
  }

  reset() {
    if (this.currentLevel) {
      this.currentLevel.slots.forEach(s => this.clearSlot(s.property));
    }
    this.slotValues = {};
    this.onValueChange({});
  }
}
