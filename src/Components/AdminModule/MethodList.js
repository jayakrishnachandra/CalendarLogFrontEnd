import React, { useState } from 'react';
import HoverableItem from './HoverableItem';

const MethodList = ({ methods, setMethods, token }) => {
  const [hoveredMethod, setHoveredMethod] = useState(null);
  const [clickedMethod, setClickedMethod] = useState(null);
  const [MethodData, setMethodData] = useState(null);

  const fetchMethodData = async (MethodName) => {
    try {
      const encodedName = encodeURIComponent(MethodName);
      const response = await fetch(`https://calendarlog.onrender.com//getCommunicationMethod/${encodedName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMethodData(data); // Store fetched data
        setClickedMethod(MethodName); // Open popup on click
      } else {
        alert('Failed to fetch Method data');
      }
    } catch (error) {
      alert('Error fetching Method data');
    }
  };

  const handleDeleteMethod = async (MethodName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${MethodName}?`);
    if (confirmDelete) {
      try {
        const encodedName = encodeURIComponent(MethodName);
        const response = await fetch(`https://calendarlog.onrender.com//deleteCommunicationMethod/${encodedName}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert('Method deleted successfully');
          setMethods(methods.filter((Method) => Method !== MethodName));
          // Update Method list after deletion
        } else {
          alert('Failed to delete Method');
        }
      } catch (error) {
        alert('Error deleting Method');
      }
    }
  };

  const handleClosePopup = () => {
    setClickedMethod(null);
    setMethodData(null);
  };

  return (
    <div>
      <h3>Method List</h3>
      <ul>
        {methods.map((Method) => (
          <li
            key={Method}
            onMouseEnter={() => setHoveredMethod(Method)}
            onMouseLeave={() => setHoveredMethod(null)}
          >
            {Method}
            {hoveredMethod === Method && !clickedMethod && (
              <>
                <button onClick={() => fetchMethodData(Method)}>View</button>
                <button onClick={() => handleDeleteMethod(Method)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Conditionally render the HoverableItem with details */}
      {clickedMethod && MethodData && (
        <HoverableItem name={clickedMethod} details={MethodData} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default MethodList;
