/**
 * Minecraft LE — UI Panel Component
 * LEGAME Studio
 */

export class Panel {
  constructor(options = {}) {
    this.title = options.title || '';
    this.width = options.width || 400;
    this.height = options.height || 300;
    this.className = options.className || '';
    this.id = options.id || ('panel_' + Math.random().toString(36).slice(2, 8));

    this.el = document.createElement('div');
    this.el.className = 'le-panel ' + this.className;
    this.el.id = this.id;
    this.el.style.width = typeof this.width === 'number' ? this.width + 'px' : this.width;
    this.el.style.height = typeof this.height === 'number' ? this.height + 'px' : this.height;

    if (this.title) {
      const header = document.createElement('div');
      header.className = 'le-panel-header';
      header.textContent = this.title;
      this.el.appendChild(header);
    }

    this.body = document.createElement('div');
    this.body.className = 'le-panel-body';
    this.el.appendChild(this.body);
  }

  append(child) {
    if (child.el) this.body.appendChild(child.el);
    else if (child instanceof HTMLElement) this.body.appendChild(child);
    return this;
  }

  mount(parent) {
    parent.appendChild(this.el);
    return this;
  }

  show() { this.el.classList.remove('hidden'); }
  hide() { this.el.classList.add('hidden'); }
  destroy() { this.el.remove(); }
}
