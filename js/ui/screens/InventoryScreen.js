/**
 * Minecraft LE — Inventory Screen
 * LEGAME Studio
 */

import { Panel } from '../components/Panel.js';
import { Slot } from '../components/Slot.js';
import { Button } from '../components/Button.js';

export class InventoryScreen {
  constructor(options = {}) {
    this.onClose = options.onClose || null;
    this.slots = [];

    this.root = document.createElement('div');
    this.root.className = 'le-inventory-overlay';
    this.root.id = 'le-inventory-screen';

    this.panel = new Panel({
      title: 'Inventory',
      width: 360,
      height: 320,
      className: 'le-inventory-panel'
    });

    const grid = document.createElement('div');
    grid.className = 'le-grid';
    grid.style.gridTemplateColumns = 'repeat(9, 40px)';
    grid.style.justifyContent = 'center';
    grid.style.marginBottom = '12px';

    for (let i = 0; i < 27; i++) {
      const slot = new Slot({ index: i, size: 40 });
      this.slots.push(slot);
      slot.mount(grid);
    }
    this.panel.append(grid);

    const hotbarRow = document.createElement('div');
    hotbarRow.className = 'le-grid';
    hotbarRow.style.gridTemplateColumns = 'repeat(9, 40px)';
    hotbarRow.style.justifyContent = 'center';
    hotbarRow.style.marginTop = '8px';

    for (let i = 0; i < 9; i++) {
      const slot = new Slot({ index: 27 + i, size: 40 });
      this.slots.push(slot);
      slot.mount(hotbarRow);
    }
    this.panel.append(hotbarRow);

    const closeBtn = new Button({
      text: 'Close',
      width: 120,
      onClick: () => this.close()
    });
    const btnWrap = document.createElement('div');
    btnWrap.style.textAlign = 'center';
    btnWrap.style.marginTop = '16px';
    closeBtn.mount(btnWrap);
    this.panel.append(btnWrap);

    this.panel.mount(this.root);
  }

  open(parent = document.body) {
    parent.appendChild(this.root);
    this.root.classList.remove('hidden');
  }

  close() {
    this.root.classList.add('hidden');
    if (this.onClose) this.onClose();
  }

  setSlot(index, item) {
    if (this.slots[index]) this.slots[index].setItem(item);
  }
}
