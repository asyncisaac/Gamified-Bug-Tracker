// src/hooks/useGamification.ts
import { useState } from "react";

export function useGamification() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  const xpToNextLevel = level * 100;

  const addXp = (points: number) => {
    setXp((prev) => {
      const newXp = prev + points;
      if (newXp >= xpToNextLevel) {
        setLevel((prevLevel) => prevLevel + 1);
        return newXp - xpToNextLevel;
      }
      return newXp;
    });
  };

  // 👇 retorna os valores do hook
  return { xp, level, xpToNextLevel, addXp };
}
