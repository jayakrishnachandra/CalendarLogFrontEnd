// src/components/AddMethodForm.js

import React, { useState } from 'react';

const AddMethodForm = ({ setMethods, token }) => {
  const [methodData, setMethodData] = useState({
    name: '',
    description: '',
    sequence: 0,
    mandatory: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMethodData({
      ...methodData,
      [name]: value,
    });
  };

  const handleSubmitMethod = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://calendarlog.onrender.com//addCommunicationMethod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(methodData),
      });

      if (response.ok) {
        alert('Method added successfully');
        setMethods((prevMethods) => [...prevMethods, methodData.name]);
      } else {
        alert('Failed to add method');
      }
    } catch (error) {
      console.error('Error adding method:', error);
      alert('Error adding method');
    }
  };

  return (
    <form onSubmit={handleSubmitMethod}>
      <input
        type="text"
        name="name"
        placeholder="Method Name"
        value={methodData.name}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={methodData.description}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="sequence"
        placeholder="Sequence"
        value={methodData.sequence}
        onChange={handleInputChange}
      />
      <label>
        Mandatory:
        <input
          type="checkbox"
          name="mandatory"
          checked={methodData.mandatory}
          onChange={(e) => setMethodData({ ...methodData, mandatory: e.target.checked })}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddMethodForm;
