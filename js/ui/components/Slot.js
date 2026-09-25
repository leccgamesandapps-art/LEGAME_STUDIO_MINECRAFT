/**
 * Minecraft LE — Inventory Slot Component
 * LEGAME Studio
 */

export class Slot {
  constructor(options = {}) {
    this.index = options.index ?? 0;
    this.item = options.item || null;
    this.size = options.size || 40;
    this.onClick = options.onClick || null;
    this.onRightClick = options.onRightClick || null;

    this.el = document.createElement('div');
    this.el.className = 'le-slot';
    this.el.style.width = this.size + 'px';
    this.el.style.height = this.size + 'px';
    this.el.dataset.index = this.index;

    this.iconEl = document.createElement('div');
    this.iconEl.className = 'le-slot-icon';
    this.el.appendChild(this.iconEl);

    this.countEl = document.createElement('span');
    this.countEl.className = 'le-slot-count';
    this.el.appendChild(this.countEl);

    this.el.addEventListener('click', (e) => {
      if (this.onClick) this.onClick(this, e);
    });
    this.el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.onRightClick) this.onRightClick(this, e);
    });

    this.render();
  }

  setItem(item) {
    this.item = item;
    this.render();
  }

  render() {
    if (this.item) {
      this.iconEl.textContent = this.item.icon || this.item.name?.[0] || '?';
      this.iconEl.title = this.item.name || '';
      this.countEl.textContent = this.item.count > 1 ? this.item.count : '';
      this.el.classList.add('has-item');
    } else {
      this.iconEl.textContent = '';
      this.countEl.textContent = '';
      this.el.classList.remove('has-item');
    }
  }

  mount(parent) {
    parent.appendChild(this.el);
    return this;
  }
}
