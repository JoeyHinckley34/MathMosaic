import React from 'react';

function Header({ currentLevel }) {
  return (
    <header>
      <h1>MathMosaic Daily #{currentLevel.date}</h1>
      <p>Use each number once to reach the target!</p>
      <h3>Target: {currentLevel.target}</h3>
    </header>
  );
}

export default Header;
