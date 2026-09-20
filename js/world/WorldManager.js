/**
 * Minecraft LE — World Manager
 * LEGAME Studio
 * Procedural world scaffolding (seed-based foundation)
 */

import { Storage } from '../core/Storage.js';
import { App } from '../core/App.js';

function generateId() {
  return 'w_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function generateSeed() {
  return Math.floor(Math.random() * 2147483647).toString();
}

export const WorldManager = {
  worlds: [],

  init() {
    this.worlds = Storage.getWorlds();
  },

  createWorld(options) {
    const world = {
      id: generateId(),
      name: options.name || 'New World',
      seed: options.seed || generateSeed(),
      gamemode: options.gamemode || 'survival',
      difficulty: options.difficulty || 'normal',
      cheats: !!options.cheats,
      createdAt: Date.now(),
      lastPlayed: Date.now(),
      playTime: 0,
      version: '0.1.0-alpha'
    };

    Storage.saveWorld(world);
    this.worlds = Storage.getWorlds();
    return world;
  },

  deleteWorld(id) {
    Storage.deleteWorld(id);
    this.worlds = Storage.getWorlds();
  },

  getWorld(id) {
    return this.worlds.find(w => w.id === id);
  },

  enterWorld(world) {
    App.state.currentWorld = world;
    world.lastPlayed = Date.now();
    Storage.saveWorld(world);

    App.toast(`Entering world: ${world.name}`);
    App.showScreen('game-container');
  },

  exitWorld() {
    App.state.currentWorld = null;
    App.showScreen('main-menu');
  }
};
