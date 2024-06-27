import React from 'react';

function EquationContainer({ equation, result }) {
  return (
    <div className="equation-container">
      <div className="equation">{equation}</div>
      <div className="result">{result}</div>
    </div>
  );
}

export default EquationContainer;
