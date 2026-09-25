/**
 * Minecraft LE — Voxel / 3D Renderer
 * LEGAME Studio
 */

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    this.ready = false;
  }

  init() {
    if (!this.canvas) return false;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.ready = true;
    console.log('[Renderer] Ready (2D foundation). Three.js upgrade path available.');
    return true;
  }

  resize() {
    this.width = this.canvas.clientWidth || window.innerWidth;
    this.height = this.canvas.clientHeight || window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    if (this.ctx) this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  clear() {
    if (!this.ctx) return;
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, '#5BA3D9');
    grad.addColorStop(0.45, '#A8D8F0');
    grad.addColorStop(0.7, '#C8E6C9');
    grad.addColorStop(1, '#4A7C4A');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  renderWorld(player) {
    if (!this.ctx) return;
    this.clear();

    const horizon = this.height * 0.55 + player.pitch * 80;
    this.ctx.fillStyle = '#3d6b3d';
    this.ctx.fillRect(0, Math.max(0, horizon), this.width, this.height);

    this.ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    this.ctx.lineWidth = 1;
    const gridSize = 40;
    for (let i = -20; i < 40; i++) {
      const y = horizon + i * gridSize * (1 + Math.abs(player.pitch));
      if (y > this.height) break;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    const cx = this.width / 2;
    const cy = this.height / 2;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.9)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - 12, cy); this.ctx.lineTo(cx + 12, cy);
    this.ctx.moveTo(cx, cy - 12); this.ctx.lineTo(cx, cy + 12);
    this.ctx.stroke();

    this.ctx.fillStyle = 'rgba(0,0,0,0.45)';
    this.ctx.fillRect(8, 8, 320, 78);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '13px monospace';
    this.ctx.fillText('Minecraft LE  |  LEGAME Studio', 16, 28);
    this.ctx.fillText(`XYZ: ${player.x.toFixed(1)}  /  ${player.y.toFixed(1)}  /  ${player.z.toFixed(1)}`, 16, 48);
    this.ctx.fillText('WASD move  |  Mouse look  |  Space/C up-down  |  Shift sprint', 16, 68);
    this.ctx.fillText('Click to capture mouse  |  Esc pause', 16, 88);
  }
}
