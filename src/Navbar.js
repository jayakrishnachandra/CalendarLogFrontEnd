import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css'; // Ensure this import is present

export default function Navbar() {
  const location = useLocation(); // Get the current location

  return (
    <div>
      <ul className="nav nav-tabs" style={{ backgroundColor: "", alignItems: 'center' }}>
        <li className="nav-item">
          <div className="branding">
            <p className="branding-text">Calendar Log</p>
          </div>
        </li>
      </ul>
    </div>
  );
}