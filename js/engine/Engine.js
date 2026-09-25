/**
 * Minecraft LE — Core Game Engine
 * LEGAME Studio
 */

import { Renderer } from './Renderer.js';
import { Chunk } from './Chunk.js';
import { Input } from './Input.js';
import { Player } from '../player/Player.js';

export class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.input = new Input(canvas);
    this.player = new Player();
    this.chunks = new Map();
    this.running = false;
    this.lastTime = 0;
  }

  init() {
    this.renderer.init();
    this.input.enable();
    const chunk = new Chunk(0, 0);
    chunk.generateFlat();
    this.chunks.set('0,0', chunk);
    window.addEventListener('resize', () => this.renderer.resize());
    console.log('[Engine] Minecraft LE Engine ready — WASD + Mouse');
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
    const dt = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;
    this.update(dt);
    this.render();
    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    const { dx, dy } = this.input.consumeMouseDelta();
    this.player.look(dx * this.input.sensitivity, -dy * this.input.sensitivity);

    let mx = 0, mz = 0;
    if (this.input.isDown('KeyW')) mz -= 1;
    if (this.input.isDown('KeyS')) mz += 1;
    if (this.input.isDown('KeyA')) mx -= 1;
    if (this.input.isDown('KeyD')) mx += 1;

    const len = Math.hypot(mx, mz);
    if (len > 0) { mx /= len; mz /= len; }

    const sin = Math.sin(this.player.yaw);
    const cos = Math.cos(this.player.yaw);
    const worldX = mx * cos + mz * sin;
    const worldZ = -mx * sin + mz * cos;

    const sprint = this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight');
    this.player.move(worldX, 0, worldZ, dt, sprint);

    if (this.input.isDown('Space')) this.player.move(0, 1, 0, dt);
    if (this.input.isDown('ControlLeft') || this.input.isDown('KeyC')) this.player.move(0, -1, 0, dt);
  }

  render() {
    this.renderer.renderWorld(this.player);
  }

  getChunk(cx, cz) {
    return this.chunks.get(`${cx},${cz}`);
  }
}
