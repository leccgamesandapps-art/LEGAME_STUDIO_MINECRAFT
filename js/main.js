/**
 * Minecraft LE — Main Entry
 * Developed by LEGAME Studio
 * Independent original project — not affiliated with Mojang / Microsoft
 */

import { App } from './core/App.js';
import { Storage } from './core/Storage.js';
import { UI } from './ui/UI.js';
import { WorldManager } from './world/WorldManager.js';
import { ServerManager } from './servers/ServerManager.js';

// Global app instance
window.MinecraftLE = {
  version: '0.1.0-alpha',
  studio: 'LEGAME Studio',
  name: 'Minecraft LE'
};

document.addEventListener('DOMContentLoaded', async () => {
  const loadingText = document.getElementById('loading-text');
  const progressFill = document.getElementById('progress-fill');

  function setProgress(pct, text) {
    progressFill.style.width = pct + '%';
    if (text) loadingText.textContent = text;
  }

  try {
    setProgress(10, 'Loading core systems...');
    await delay(200);

    setProgress(30, 'Initializing storage...');
    Storage.init();
    await delay(150);

    setProgress(50, 'Loading world manager...');
    WorldManager.init();
    await delay(150);

    setProgress(70, 'Loading private server system...');
    ServerManager.init();
    await delay(150);

    setProgress(90, 'Building interface...');
    UI.init();
    await delay(200);

    setProgress(100, 'Ready');
    await delay(300);

    // Hide loading, show main menu
    document.getElementById('loading-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');

    console.log('%cMinecraft LE v' + window.MinecraftLE.version, 'color:#3b7d3b;font-size:16px;font-weight:bold');
    console.log('%cDeveloped by LEGAME Studio', 'color:#a0a0a0');
    console.log('This is an original independent project.');
  } catch (err) {
    console.error('Failed to start Minecraft LE:', err);
    loadingText.textContent = 'Failed to initialize. Check console.';
  }
});

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
