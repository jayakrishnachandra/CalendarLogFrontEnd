import React from 'react';
import './HoverableItem.css';

const HoverableItem = ({ name, details, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h4>{name} Details</h4>
        <pre>{JSON.stringify(details, null, 2)}</pre>
      </div>
    </div>
  );
};

export default HoverableItem;
