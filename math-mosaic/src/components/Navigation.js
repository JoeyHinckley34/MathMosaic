import React from 'react';

function Navigation({ levels, currentLevel, onLevelChange, onRandomLevel }) {
  const handleSelectChange = (e) => {
    const selectedLevel = levels.find(level => level.date === e.target.value);
    onLevelChange(selectedLevel);
  };

  return (
    <nav>
      <button onClick={onRandomLevel}>Random Level</button>
      <select value={currentLevel?.date || ''} onChange={handleSelectChange}>
        {levels
          .filter(level => new Date(level.date) < new Date())
          .map(level => (
            <option key={level.date} value={level.date}>
              {`${level.date}`}
            </option>
          ))}
      </select>
    </nav>
  );
}

export default Navigation;
