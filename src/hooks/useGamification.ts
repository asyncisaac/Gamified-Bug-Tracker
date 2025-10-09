// src/hooks/useGamification.ts
import { useState, useCallback } from "react";

export function useGamification(initialLevel: number = 1, initialXp: number = 0) {
  const [xp, setXp] = useState(initialXp);
  const [level, setLevel] = useState(initialLevel);
  const [totalXp, setTotalXp] = useState(initialXp);

  const xpToNextLevel = level * 100;

  const addXp = useCallback((points: number) => {
    if (points <= 0) return;
    
    setTotalXp(prev => prev + points);
    
    setXp((currentXp) => {
      const newXp = currentXp + points;
      const currentXpToNextLevel = level * 100;
      
      if (newXp >= currentXpToNextLevel) {
        const newLevel = level + 1;
        setLevel(newLevel);
        return newXp - currentXpToNextLevel;
      }
      return newXp;
    });
  }, [level]);

  const reset = useCallback(() => {
    setXp(initialXp);
    setLevel(initialLevel);
    setTotalXp(initialXp);
  }, [initialLevel, initialXp]);

  return { 
    xp, 
    level, 
    totalXp,
    xpToNextLevel, 
    addXp,
    reset
  };
}