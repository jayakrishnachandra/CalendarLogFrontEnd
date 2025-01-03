// src/components/CompanyManagement.js

import React, { useState, useEffect } from 'react';
import AddCompanyForm from './AddCompanyForm';
import AddMethodForm from './AddMethodForm';
import CompanyList from './CompanyList';
import MethodList from './MethodList';

const CompanyManagement = ({ token }) => {
  const [companies, setCompanies] = useState([]);
  const [methods, setMethods] = useState([]);
  const [isAddCompanyFormVisible, setIsAddCompanyFormVisible] = useState(false);
  const [isAddMethodFormVisible, setIsAddMethodFormVisible] = useState(false);

  // Fetch company and method names when the component mounts
  const fetchCompanyAndMethods = async () => {
    try {
      setCompanies([]);  // Clear companies
      setMethods([]);    // Clear methods
      const response = await fetch('https://calendarlog.onrender.com//company-method-names', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies(data.companyNames);
        setMethods(data.methodNames);
      } else {
        alert('Failed to fetch company and method names');
      }
    } catch (error) {
      alert('Error fetching company and method names');
    }
  };

  // Fetch company and methods when the component mounts or token changes
  useEffect(() => {
    fetchCompanyAndMethods();
  }, [token]);

  // Function to handle refresh button click
  const handleRefresh = () => {
    fetchCompanyAndMethods();  // Reload data from the database
  };

  return (
    <div>
      <h2>Company Management</h2>

      {/* Company List */}
      <CompanyList companies={companies} setCompanies={setCompanies} token={token} />

      {/* Methods List */}
      <MethodList methods={methods} setMethods={setMethods} token={token} />

      {/* Add Company Form */}
      <button onClick={() => setIsAddCompanyFormVisible(!isAddCompanyFormVisible)}>
        {isAddCompanyFormVisible ? 'Cancel' : 'Add Company'}
      </button>
      {isAddCompanyFormVisible && <AddCompanyForm setCompanies={setCompanies} token={token} />}

      {/* Add Method Form */}
      <button onClick={() => setIsAddMethodFormVisible(!isAddMethodFormVisible)}>
        {isAddMethodFormVisible ? 'Cancel' : 'Add Method'}
      </button>
      {isAddMethodFormVisible && <AddMethodForm setMethods={setMethods} token={token} />}

      {/* Refresh Button */}
      <button onClick={handleRefresh}>Refresh Data</button>
    </div>
  );
};

export default CompanyManagement;
