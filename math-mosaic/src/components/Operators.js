import React from 'react';

function Operators({ onOperatorClick }) {
  const operators = ['+', '-', '*', '/'];

  return (
    <div className="operators">
      {operators.map(operator => (
        <button key={operator} onClick={() => onOperatorClick(operator)}>
          {operator}
        </button>
      ))}
    </div>
  );
}

export default Operators;
