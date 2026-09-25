/**
 * Minecraft LE — Application Entry
 * LEGAME Studio
 *
 * Website  = Display layer (HTML/CSS)
 * js/app/* = Application Engine (runs UI + systems)
 */

import { application } from './app/Application.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingText = document.getElementById('loading-text');
  const progressFill = document.getElementById('progress-fill');
  const mainMenu = document.getElementById('main-menu');

  const onProgress = (pct) => {
    if (progressFill) progressFill.style.width = pct + '%';
  };
  const onStatus = (text) => {
    if (loadingText) loadingText.textContent = text;
  };

  try {
    await application.boot({
      display: document.body,
      onProgress,
      onStatus
    });

    await new Promise((r) => setTimeout(r, 400));
    loadingScreen?.classList.add('hidden');
    mainMenu?.classList.remove('hidden');
  } catch (err) {
    console.error('Application failed to start:', err);
    if (loadingText) loadingText.textContent = 'Failed to start application.';
  }
});
