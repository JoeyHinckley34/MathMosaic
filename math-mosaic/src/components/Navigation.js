import React from 'react';

function Navigation() {
  return (
    <nav>
      <button onClick={() => console.log('Random Level')}>Random Level</button>
      <select onChange={(e) => console.log(e.target.value)}>
        <option value="problem1">Problem 1</option>
        <option value="problem2">Problem 2</option>
        {/* Add more options as needed */}
      </select>
    </nav>
  );
}

export default Navigation;
