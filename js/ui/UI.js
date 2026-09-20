/**
 * Minecraft LE — UI Controller
 * LEGAME Studio
 */

import { App } from '../core/App.js';
import { WorldManager } from '../world/WorldManager.js';
import { ServerManager } from '../servers/ServerManager.js';
import { Storage } from '../core/Storage.js';

export const UI = {
  init() {
    this.bindNavigation();
    this.bindWorlds();
    this.bindServers();
    this.bindSettings();
    this.bindModals();
    this.refreshWorldsList();
    this.refreshMyServersList();
    this.refreshSavedServersList();
    window.refreshMyServers = () => this.refreshMyServersList();
  },

  bindNavigation() {
    document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch (action) {
          case 'play':
          case 'worlds':
            App.showScreen('worlds-screen');
            this.refreshWorldsList();
            break;
          case 'servers':
            App.showScreen('servers-screen');
            this.refreshMyServersList();
            this.refreshSavedServersList();
            break;
          case 'settings':
            App.showScreen('settings-screen');
            break;
          case 'about':
            App.showScreen('about-screen');
            break;
          case 'friends':
          case 'character':
          case 'marketplace':
          case 'addons':
          case 'achievements':
          case 'help':
            App.toast(action.charAt(0).toUpperCase() + action.slice(1) + ' — Coming in a future build');
            break;
          case 'resume':
            document.getElementById('pause-menu').classList.add('hidden');
            break;
          case 'save-exit':
            WorldManager.exitWorld();
            break;
        }
      });
    });

    document.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        App.showScreen(btn.dataset.back);
      });
    });

    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const parent = tab.closest('.screen-content');
        parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        parent.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
        const panel = document.getElementById(tab.dataset.tab + '-panel');
        if (panel) panel.classList.remove('hidden');
      });
    });
  },

  bindWorlds() {
    document.getElementById('create-world-btn')?.addEventListener('click', () => {
      document.getElementById('create-world-modal').classList.remove('hidden');
    });

    document.getElementById('create-world-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form));
      data.cheats = form.cheats.checked;
      const world = WorldManager.createWorld(data);
      this.refreshWorldsList();
      document.getElementById('create-world-modal').classList.add('hidden');
      form.reset();
      App.toast(`World "${world.name}" created`);
    });
  },

  refreshWorldsList() {
    const list = document.getElementById('worlds-list');
    if (!list) return;
    const worlds = WorldManager.worlds;
    if (worlds.length === 0) {
      list.innerHTML = `<div class="empty-state"><p>No worlds yet.</p><p>Create your first world to begin exploring.</p></div>`;
      return;
    }
    list.innerHTML = worlds.sort((a, b) => b.lastPlayed - a.lastPlayed).map(w => `
      <div class="world-card" data-id="${w.id}">
        <div class="card-icon">🌍</div>
        <div class="card-info">
          <h4>${escapeHtml(w.name)}</h4>
          <div class="card-meta">${w.gamemode} • ${w.difficulty} • Seed: ${w.seed}</div>
        </div>
        <div class="card-actions">
          <button class="btn primary play-world" data-id="${w.id}">Play</button>
          <button class="btn delete-world" data-id="${w.id}">Delete</button>
        </div>
      </div>`).join('');
    list.querySelectorAll('.play-world').forEach(btn => {
      btn.addEventListener('click', () => {
        const world = WorldManager.getWorld(btn.dataset.id);
        if (world) WorldManager.enterWorld(world);
      });
    });
    list.querySelectorAll('.delete-world').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this world permanently? This cannot be undone.')) {
          WorldManager.deleteWorld(btn.dataset.id);
          this.refreshWorldsList();
          App.toast('World deleted');
        }
      });
    });
  },

  bindServers() {
    document.getElementById('create-server-btn')?.addEventListener('click', () => {
      document.getElementById('create-server-modal').classList.remove('hidden');
    });
    document.getElementById('create-server-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form));
      data.cheats = form.cheats.checked;
      data.pvp = form.pvp.checked;
      data.mobs = form.mobs.checked;
      data.weather = form.weather.checked;
      data.maxPlayers = parseInt(data.maxPlayers, 10);
      const server = ServerManager.createServer(data);
      this.refreshMyServersList();
      document.getElementById('create-server-modal').classList.add('hidden');
      form.reset();
      App.toast(`Private server "${server.name}" created. Join code: ${server.joinCode}`);
    });
    document.getElementById('add-server-btn')?.addEventListener('click', () => {
      document.getElementById('add-server-modal').classList.remove('hidden');
    });
    document.getElementById('add-server-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form));
      ServerManager.addSavedServer(data);
      this.refreshSavedServersList();
      document.getElementById('add-server-modal').classList.add('hidden');
      form.reset();
      App.toast('Server saved');
    });
  },

  refreshMyServersList() {
    const list = document.getElementById('my-servers-list');
    if (!list) return;
    ServerManager.myServers = Storage.getMyServers();
    const servers = ServerManager.myServers;
    if (servers.length === 0) {
      list.innerHTML = `<div class="empty-state"><p>You have not created any private servers yet.</p><p>Private servers are only accessible by invitation or join code.</p></div>`;
      return;
    }
    list.innerHTML = servers.map(s => {
      const statusClass = s.status === 'online' ? 'online' : s.status === 'starting' ? 'starting' : 'offline';
      const statusText = s.status.charAt(0).toUpperCase() + s.status.slice(1);
      return `<div class="server-card" data-id="${s.id}">
        <div class="card-icon">🖥️</div>
        <div class="card-info">
          <h4>${escapeHtml(s.name)}</h4>
          <div class="card-meta"><span class="status-dot ${statusClass}"></span>${statusText} • ${s.playersOnline}/${s.maxPlayers} players • Code: <strong>${s.joinCode}</strong></div>
        </div>
        <div class="card-actions">
          ${s.status === 'offline' ? `<button class="btn primary start-server" data-id="${s.id}">Start</button>` : `<button class="btn stop-server" data-id="${s.id}">Stop</button>`}
          <button class="btn delete-server" data-id="${s.id}">Delete</button>
        </div>
      </div>`;
    }).join('');
    list.querySelectorAll('.start-server').forEach(btn => {
      btn.addEventListener('click', () => {
        ServerManager.startServer(btn.dataset.id);
        this.refreshMyServersList();
      });
    });
    list.querySelectorAll('.stop-server').forEach(btn => {
      btn.addEventListener('click', () => ServerManager.stopServer(btn.dataset.id));
    });
    list.querySelectorAll('.delete-server').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Delete this private server? World data may be lost. Consider creating a backup first.')) {
          ServerManager.deleteServer(btn.dataset.id);
          this.refreshMyServersList();
          App.toast('Server deleted');
        }
      });
    });
  },

  refreshSavedServersList() {
    const list = document.getElementById('saved-servers-list');
    if (!list) return;
    ServerManager.savedServers = Storage.getSavedServers();
    const servers = ServerManager.savedServers;
    if (servers.length === 0) {
      list.innerHTML = `<div class="empty-state"><p>No saved servers.</p><p>Add a server using a join code or invite.</p></div>`;
      return;
    }
    list.innerHTML = servers.map(s => `
      <div class="server-card" data-id="${s.id}">
        <div class="card-icon">🔗</div>
        <div class="card-info">
          <h4>${escapeHtml(s.nickname)}</h4>
          <div class="card-meta">Code: ${escapeHtml(s.code)} ${s.notes ? '• ' + escapeHtml(s.notes) : ''}</div>
        </div>
        <div class="card-actions">
          <button class="btn primary join-server" data-id="${s.id}">Join</button>
          <button class="btn remove-saved" data-id="${s.id}">Remove</button>
        </div>
      </div>`).join('');
    list.querySelectorAll('.join-server').forEach(btn => {
      btn.addEventListener('click', () => {
        const server = ServerManager.savedServers.find(s => s.id === btn.dataset.id);
        if (server) ServerManager.joinServer(server.code);
      });
    });
    list.querySelectorAll('.remove-saved').forEach(btn => {
      btn.addEventListener('click', () => {
        ServerManager.removeSavedServer(btn.dataset.id);
        this.refreshSavedServersList();
        App.toast('Server removed from list');
      });
    });
  },

  bindSettings() {
    document.querySelectorAll('.settings-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById('settings-' + tab.dataset.settings);
        if (panel) panel.classList.add('active');
      });
    });
    const rd = document.getElementById('render-distance');
    const rdVal = document.getElementById('rd-value');
    if (rd && rdVal) rd.addEventListener('input', () => { rdVal.textContent = rd.value; });
  },

  bindModals() {
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById(btn.dataset.close)?.classList.add('hidden');
      });
    });
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
      });
    });
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"');
}
