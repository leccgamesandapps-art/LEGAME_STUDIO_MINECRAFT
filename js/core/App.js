/**
 * Minecraft LE — Core App
 * LEGAME Studio
 */

export const App = {
  currentScreen: 'main-menu',
  state: {
    player: null,
    currentWorld: null,
    currentServer: null,
    isPaused: false
  },

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('hidden');
      this.currentScreen = id;
    }
  },

  toast(message, duration = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
