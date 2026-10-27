import { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext(null);

const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];
const LEVEL_NAMES = ['Rookie', 'Explorer', 'Learner', 'Student', 'Scholar', 'Expert', 'Master', 'Guru', 'Legend', 'Prodigy', 'Champion'];

function getLevel(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i;
  }
  return 0;
}

export function GameProvider({ children }) {
  const [xp, setXp] = useState(() => {
    try { return parseInt(localStorage.getItem('neb_xp') || '0'); }
    catch { return 0; }
  });
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('neb_bookmarks') || '[]'); }
    catch { return []; }
  });
  const [viewed, setViewed] = useState(() => {
    try { return JSON.parse(localStorage.getItem('neb_viewed') || '[]'); }
    catch { return []; }
  });

  const addXp = useCallback((amount) => {
    setXp(prev => {
      const next = prev + amount;
      try { localStorage.setItem('neb_xp', String(next)); } catch {}
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((qId) => {
    setBookmarks(prev => {
      const next = prev.includes(qId) ? prev.filter(b => b !== qId) : [...prev, qId];
      try { localStorage.setItem('neb_bookmarks', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const markViewed = useCallback((qId) => {
    setViewed(prev => {
      if (prev.includes(qId)) return prev;
      const next = [...prev, qId];
      try { localStorage.setItem('neb_viewed', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const level = getLevel(xp);
  const currentThreshold = LEVEL_THRESHOLDS[level] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level + 1] || currentThreshold + 500;
  const levelProgress = Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100);

  return (
    <GameContext.Provider value={{
      xp, level, levelName: LEVEL_NAMES[level],
      levelProgress, nextThreshold,
      bookmarks, viewed,
      addXp, toggleBookmark, markViewed,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
