import React from 'react';

function Controls({ onDelete, onHint, onClear }) {
  return (
    <div className='navigation-container'>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onHint}>Hint</button>
      <button onClick={onClear}>Clear</button>
    </div>
  );
}

export default Controls;