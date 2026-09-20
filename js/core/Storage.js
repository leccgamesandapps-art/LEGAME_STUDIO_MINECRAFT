/**
 * Minecraft LE — Local Storage Layer
 * LEGAME Studio
 * All data is local and independent (no Mojang/Microsoft accounts)
 */

const PREFIX = 'minecraftle_';

export const Storage = {
  init() {
    if (!localStorage.getItem(PREFIX + 'worlds')) {
      localStorage.setItem(PREFIX + 'worlds', JSON.stringify([]));
    }
    if (!localStorage.getItem(PREFIX + 'my_servers')) {
      localStorage.setItem(PREFIX + 'my_servers', JSON.stringify([]));
    }
    if (!localStorage.getItem(PREFIX + 'saved_servers')) {
      localStorage.setItem(PREFIX + 'saved_servers', JSON.stringify([]));
    }
    if (!localStorage.getItem(PREFIX + 'settings')) {
      localStorage.setItem(PREFIX + 'settings', JSON.stringify({
        renderDistance: 12,
        graphics: 'Medium',
        masterVolume: 80,
        showCoordinates: true
      }));
    }
  },

  get(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  },

  getWorlds() {
    return this.get('worlds') || [];
  },

  saveWorld(world) {
    const worlds = this.getWorlds();
    const idx = worlds.findIndex(w => w.id === world.id);
    if (idx >= 0) worlds[idx] = world;
    else worlds.push(world);
    this.set('worlds', worlds);
  },

  deleteWorld(id) {
    const worlds = this.getWorlds().filter(w => w.id !== id);
    this.set('worlds', worlds);
  },

  getMyServers() {
    return this.get('my_servers') || [];
  },

  saveMyServer(server) {
    const servers = this.getMyServers();
    const idx = servers.findIndex(s => s.id === server.id);
    if (idx >= 0) servers[idx] = server;
    else servers.push(server);
    this.set('my_servers', servers);
  },

  deleteMyServer(id) {
    const servers = this.getMyServers().filter(s => s.id !== id);
    this.set('my_servers', servers);
  },

  getSavedServers() {
    return this.get('saved_servers') || [];
  },

  saveSavedServer(server) {
    const servers = this.getSavedServers();
    const idx = servers.findIndex(s => s.id === server.id);
    if (idx >= 0) servers[idx] = server;
    else servers.push(server);
    this.set('saved_servers', servers);
  },

  deleteSavedServer(id) {
    const servers = this.getSavedServers().filter(s => s.id !== id);
    this.set('saved_servers', servers);
  },

  getSettings() {
    return this.get('settings') || {};
  },

  saveSettings(settings) {
    this.set('settings', settings);
  }
};
