/**
 * Minecraft LE — Private Server Manager
 * LEGAME Studio
 * Fully independent private server system.
 * Servers are private by default (invite / join code).
 * No public server browser. No Mojang/Microsoft accounts.
 */

import { Storage } from '../core/Storage.js';
import { App } from '../core/App.js';

function generateId() {
  return 's_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function generateJoinCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export const ServerManager = {
  myServers: [],
  savedServers: [],

  init() {
    this.myServers = Storage.getMyServers();
    this.savedServers = Storage.getSavedServers();
  },

  createServer(options) {
    const server = {
      id: generateId(),
      name: options.name || 'My Private Server',
      description: options.description || '',
      joinCode: generateJoinCode(),
      gamemode: options.gamemode || 'survival',
      difficulty: options.difficulty || 'normal',
      maxPlayers: Math.min(50, Math.max(2, options.maxPlayers || 10)),
      privacy: options.privacy || 'private',
      cheats: !!options.cheats,
      pvp: options.pvp !== false,
      mobs: options.mobs !== false,
      weather: options.weather !== false,
      status: 'offline',
      playersOnline: 0,
      owner: 'local_player',
      createdAt: Date.now(),
      lastStarted: null,
      version: '0.1.0-alpha',
      worldId: null
    };

    Storage.saveMyServer(server);
    this.myServers = Storage.getMyServers();
    return server;
  },

  startServer(id) {
    const server = this.myServers.find(s => s.id === id);
    if (!server) return false;

    server.status = 'starting';
    Storage.saveMyServer(server);
    App.toast(`Starting server: ${server.name}...`);

    setTimeout(() => {
      server.status = 'online';
      server.lastStarted = Date.now();
      server.playersOnline = 1;
      Storage.saveMyServer(server);
      this.myServers = Storage.getMyServers();
      App.toast(`${server.name} is now online. Join code: ${server.joinCode}`);
      if (window.refreshMyServers) window.refreshMyServers();
    }, 1500);

    return true;
  },

  stopServer(id) {
    const server = this.myServers.find(s => s.id === id);
    if (!server) return false;

    server.status = 'stopping';
    Storage.saveMyServer(server);

    setTimeout(() => {
      server.status = 'offline';
      server.playersOnline = 0;
      Storage.saveMyServer(server);
      this.myServers = Storage.getMyServers();
      App.toast(`${server.name} stopped.`);
      if (window.refreshMyServers) window.refreshMyServers();
    }, 800);

    return true;
  },

  deleteServer(id) {
    Storage.deleteMyServer(id);
    this.myServers = Storage.getMyServers();
  },

  addSavedServer(options) {
    const server = {
      id: generateId(),
      nickname: options.nickname || 'Saved Server',
      code: options.code || '',
      notes: options.notes || '',
      favorite: false,
      lastJoined: null,
      addedAt: Date.now()
    };
    Storage.saveSavedServer(server);
    this.savedServers = Storage.getSavedServers();
    return server;
  },

  removeSavedServer(id) {
    Storage.deleteSavedServer(id);
    this.savedServers = Storage.getSavedServers();
  },

  joinServer(codeOrId) {
    App.toast('Connecting to private server... (connection layer not yet implemented)');
  }
};
