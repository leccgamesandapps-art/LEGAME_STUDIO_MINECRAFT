/**
 * Minecraft LE — Hotbar HUD
 * LEGAME Studio
 */

import { Slot } from '../components/Slot.js';

export class Hotbar {
  constructor(options = {}) {
    this.slotCount = options.slotCount || 9;
    this.selected = 0;
    this.slots = [];

    this.el = document.createElement('div');
    this.el.className = 'le-hotbar';
    this.el.id = 'le-hotbar';

    for (let i = 0; i < this.slotCount; i++) {
      const slot = new Slot({
        index: i,
        size: 42,
        onClick: (s) => this.select(s.index)
      });
      this.slots.push(slot);
      slot.mount(this.el);
    }
    this.select(0);
  }

  select(index) {
    this.selected = index;
    this.slots.forEach((s, i) => {
      s.el.classList.toggle('selected', i === index);
    });
  }

  setItem(index, item) {
    if (this.slots[index]) this.slots[index].setItem(item);
  }

  mount(parent) {
    parent.appendChild(this.el);
    return this;
  }

  bindKeys() {
    window.addEventListener('keydown', (e) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) this.select(num - 1);
    });
  }
}
