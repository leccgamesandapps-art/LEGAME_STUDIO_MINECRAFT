/**
 * Minecraft LE — Application Engine
 * LEGAME Studio
 *
 * Website = Display
 * Application files = Engine that runs UI + systems
 */

import { Storage } from '../core/Storage.js';
import { WorldManager } from '../world/WorldManager.js';
import { ServerManager } from '../servers/ServerManager.js';
import { UI } from '../ui/UI.js';

export class Application {
  constructor() {
    this.version = '0.2.0-alpha';
    this.studio = 'LEGAME Studio';
    this.name = 'Minecraft LE';
    this.ready = false;
    this.display = null;
    this.systems = {};
  }

  async boot(options = {}) {
    this.display = options.display || document.body;
    const progress = options.onProgress || (() => {});
    const setText = options.onStatus || (() => {});

    try {
      setText('Starting Application Engine...');
      progress(5);
      await this.delay(120);

      setText('Loading core systems...');
      progress(15);
      Storage.init();
      this.systems.storage = Storage;
      await this.delay(100);

      setText('Loading world manager...');
      progress(30);
      WorldManager.init();
      this.systems.worlds = WorldManager;
      await this.delay(100);

      setText('Loading private server system...');
      progress(50);
      ServerManager.init();
      this.systems.servers = ServerManager;
      await this.delay(100);

      setText('Building interface...');
      progress(70);
      UI.init();
      this.systems.ui = UI;
      await this.delay(120);

      setText('Finalizing...');
      progress(90);
      this.registerGlobal();
      await this.delay(150);

      progress(100);
      setText('Ready');
      this.ready = true;

      console.log(`%c${this.name} v${this.version}`, 'color:#3b7d3b;font-size:16px;font-weight:bold');
      console.log(`%cApplication Engine — ${this.studio}`, 'color:#a0a0a0');
      console.log('Website Display ↔ Application Runtime connected.');
      return true;
    } catch (err) {
      console.error('[Application] Boot failed:', err);
      setText('Failed to start. Check console.');
      throw err;
    }
  }

  registerGlobal() {
    window.MinecraftLE = {
      app: this,
      version: this.version,
      studio: this.studio,
      name: this.name,
      systems: this.systems
    };
  }

  delay(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
}

export const application = new Application();
