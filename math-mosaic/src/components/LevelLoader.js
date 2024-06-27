import React, { useEffect } from 'react';
import levelsData from '../levels.json';

function LevelLoader({ setCurrentLevel }) {
  useEffect(() => {
    // Fetch the daily level based on the current date
    const today = new Date().toISOString().split('T')[0];
    const level = levelsData.dailyLevel.find(level => level.date === today);
    setCurrentLevel(level);
  }, [setCurrentLevel]);

  return null;
}

export default LevelLoader;