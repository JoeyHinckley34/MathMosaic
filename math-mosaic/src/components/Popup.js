import React from 'react';

function Popup({ togglePopup, hint }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{hint}</p>
        <button onClick={togglePopup}>Close</button>
      </div>
    </div>
  );
}

export default Popup;
