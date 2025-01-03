// src/components/AddCompanyForm.js

import React, { useState } from 'react';

const AddCompanyForm = ({ setCompanies, token }) => {
  const [companyData, setCompanyData] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: [],
    phoneNumbers: [],
    comments: '',
    communicationPeriodicity: 30,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleEmailChange = (e, index) => {
    const updatedEmails = [...companyData.emails];
    updatedEmails[index] = e.target.value;
    setCompanyData({ ...companyData, emails: updatedEmails });
  };

  const handlePhoneChange = (e, index) => {
    const updatedPhones = [...companyData.phoneNumbers];
    updatedPhones[index] = e.target.value;
    setCompanyData({ ...companyData, phoneNumbers: updatedPhones });
  };

  const addEmailField = () => {
    setCompanyData({
      ...companyData,
      emails: [...companyData.emails, ''],
    });
  };

  const addPhoneField = () => {
    setCompanyData({
      ...companyData,
      phoneNumbers: [...companyData.phoneNumbers, ''],
    });
  };

  const handleSubmitCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://calendarlog.onrender.com/addCompany', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        alert('Company added successfully');
        setCompanies((prevCompanies) => [...prevCompanies, companyData.name]);
      } else {
        alert('Failed to add company');
      }
    } catch (error) {
      console.error('Error adding company:', error);
      alert('Error adding company');
    }
  };

  return (
    <form onSubmit={handleSubmitCompany}>
      <input
        type="text"
        name="name"
        placeholder="Company Name"
        value={companyData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={companyData.location}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="linkedInProfile"
        placeholder="LinkedIn Profile"
        value={companyData.linkedInProfile}
        onChange={handleInputChange}
      />
      <textarea
        name="comments"
        placeholder="Comments"
        value={companyData.comments}
        onChange={handleInputChange}
      />
      <div>
        <h4>Emails</h4>
        {companyData.emails.map((email, index) => (
          <input
            key={index}
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e, index)}
          />
        ))}
        <button type="button" onClick={addEmailField}>Add Email</button>
      </div>
      <div>
        <h4>Phone Numbers</h4>
        {companyData.phoneNumbers.map((phone, index) => (
          <input
            key={index}
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e, index)}
          />
        ))}
        <button type="button" onClick={addPhoneField}>Add Phone</button>
      </div>
      <div>
        <label>
          Communication Periodicity (days):
          <input
            type="number"
            name="communicationPeriodicity"
            value={companyData.communicationPeriodicity}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddCompanyForm;
