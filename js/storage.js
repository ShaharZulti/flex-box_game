/* ==========================================================================
   Storage Helper: LocalStorage Persistence
   Tracks completed levels, audio preferences, and theme settings
   ========================================================================== */

const STORAGE_KEYS = {
  COMPLETED_LEVELS: 'world_bistro_completed_levels',
  THEME: 'world_bistro_theme',
  SOUND_MUTED: 'world_bistro_muted'
};

export const storage = {
  getCompletedLevels() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_LEVELS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('LocalStorage not available:', e);
      return [];
    }
  },

  isLevelCompleted(levelId) {
    const completed = this.getCompletedLevels();
    return completed.includes(levelId);
  },

  isLevelUnlocked(levelId) {
    if (levelId <= 1) return true;
    return this.isLevelCompleted(levelId - 1);
  },

  markLevelCompleted(levelId) {
    try {
      const completed = new Set(this.getCompletedLevels());
      completed.add(levelId);
      localStorage.setItem(STORAGE_KEYS.COMPLETED_LEVELS, JSON.stringify([...completed]));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  },

  resetAllProgress() {
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_LEVELS);
    } catch (e) {
      console.warn('Failed to reset progress:', e);
    }
  },

  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  isSoundMuted() {
    return localStorage.getItem(STORAGE_KEYS.SOUND_MUTED) === 'true';
  },

  setSoundMuted(isMuted) {
    localStorage.setItem(STORAGE_KEYS.SOUND_MUTED, isMuted ? 'true' : 'false');
  }
};
