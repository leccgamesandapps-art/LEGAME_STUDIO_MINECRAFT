/**
 * Minecraft LE — Voxel / 3D Renderer
 * LEGAME Studio
 * Foundation for WebGL / Three.js based voxel rendering
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
    console.log('[Renderer] Initialized (2D fallback). Ready for Three.js / WebGL upgrade.');
    return true;
  }

  resize() {
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = this.width * (window.devicePixelRatio || 1);
    this.canvas.height = this.height * (window.devicePixelRatio || 1);
    if (this.ctx) this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  clear(color = '#1a2a1a') {
    if (!this.ctx) return;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  renderPlaceholder(playerY = 64) {
    if (!this.ctx) return;
    this.clear();
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, '#87CEEB');
    grad.addColorStop(0.6, '#E0F6FF');
    grad.addColorStop(1, '#3b7d3b');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#2d5a2d';
    this.ctx.fillRect(0, this.height * 0.65, this.width, this.height * 0.35);
    this.ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    this.ctx.lineWidth = 2;
    const cx = this.width / 2, cy = this.height / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - 10, cy); this.ctx.lineTo(cx + 10, cy);
    this.ctx.moveTo(cx, cy - 10); this.ctx.lineTo(cx, cy + 10);
    this.ctx.stroke();
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '14px monospace';
    this.ctx.fillText('Minecraft LE — Voxel Engine Foundation', 12, 24);
    this.ctx.fillText('LEGAME Studio | Renderer ready for Three.js upgrade', 12, 44);
  }

  setThreeJSScene(scene, camera) {
    this.threeScene = scene;
    this.threeCamera = camera;
    console.log('[Renderer] Three.js scene attached (stub)');
  }
}
