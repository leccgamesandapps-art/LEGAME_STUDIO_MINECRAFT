/**
 * Minecraft LE — Core Game Engine
 * LEGAME Studio
 */

import { Renderer } from './Renderer.js';
import { Chunk } from './Chunk.js';

export class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.chunks = new Map();
    this.running = false;
    this.lastTime = 0;
    this.player = { x: 8, y: 5, z: 8, yaw: 0, pitch: 0 };
  }

  init() {
    this.renderer.init();
    const chunk = new Chunk(0, 0);
    chunk.generateFlat();
    this.chunks.set('0,0', chunk);
    window.addEventListener('resize', () => this.renderer.resize());
    console.log('[Engine] Minecraft LE Engine initialized');
    return true;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  stop() { this.running = false; }

  loop(time) {
    if (!this.running) return;
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;
    this.update(dt);
    this.render();
    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {}
  render() { this.renderer.renderPlaceholder(this.player.y); }

  getChunk(cx, cz) { return this.chunks.get(`${cx},${cz}`); }

  setBlock(wx, wy, wz, id) {
    const cx = Math.floor(wx / 16);
    const cz = Math.floor(wz / 16);
    const chunk = this.getChunk(cx, cz);
    if (chunk) {
      const lx = ((wx % 16) + 16) % 16;
      const lz = ((wz % 16) + 16) % 16;
      chunk.setBlock(lx, wy, lz, id);
    }
  }
}
