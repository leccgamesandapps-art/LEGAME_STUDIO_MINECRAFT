/**
 * Minecraft LE — UI Button Component
 * LEGAME Studio
 */

export class Button {
  constructor(options = {}) {
    this.text = options.text || 'Button';
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 200;
    this.height = options.height || 40;
    this.enabled = options.enabled !== false;
    this.onClick = options.onClick || null;
    this.id = options.id || ('btn_' + Math.random().toString(36).slice(2, 8));

    this.el = document.createElement('button');
    this.el.className = 'le-btn';
    this.el.id = this.id;
    this.el.textContent = this.text;
    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px';
    if (!this.enabled) this.el.disabled = true;

    this.el.addEventListener('click', (e) => {
      if (this.enabled && this.onClick) this.onClick(e);
    });
  }

  setText(text) {
    this.text = text;
    this.el.textContent = text;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    this.el.disabled = !enabled;
  }

  mount(parent) {
    parent.appendChild(this.el);
    return this;
  }

  destroy() {
    this.el.remove();
  }
}
