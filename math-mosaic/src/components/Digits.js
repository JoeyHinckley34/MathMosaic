import React from 'react';

function Digits({ numbers, onDigitClick, usedDigits }) {
  return (
    <div className="digits">
      {numbers.map(number => (
        <button
          key={number}
          onClick={() => onDigitClick(number)}
          disabled={usedDigits.includes(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Digits;
