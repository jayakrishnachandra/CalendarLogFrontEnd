import React, { useState } from 'react';
import HoverableItem from './HoverableItem';

const CompanyList = ({ companies, setCompanies, token }) => {
  const [hoveredCompany, setHoveredCompany] = useState(null);
  const [clickedCompany, setClickedCompany] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const fetchCompanyData = async (companyName) => {
    try {
      const encodedName = encodeURIComponent(companyName);
      const response = await fetch(`https://calendarlog.onrender.com//getCompany/${encodedName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCompanyData(data); // Store fetched data
        setClickedCompany(companyName); // Open popup on click
      } else {
        alert('Failed to fetch company data');
      }
    } catch (error) {
      alert('Error fetching company data');
    }
  };

  const handleDeleteCompany = async (companyName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${companyName}?`);
    if (confirmDelete) {
      try {
        const encodedName = encodeURIComponent(companyName);
        const response = await fetch(`https://calendarlog.onrender.com//deleteCompany/${encodedName}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert('Company deleted successfully');
          setCompanies(companies.filter((company) => company !== companyName));
          // Update company list after deletion
        } else {
          alert('Failed to delete company');
        }
      } catch (error) {
        alert('Error deleting company');
      }
    }
  };

  const handleClosePopup = () => {
    setClickedCompany(null);
    setCompanyData(null);
  };

  return (
    <div>
      <h3>Company List</h3>
      <ul>
        {companies.map((company) => (
          <li
            key={company}
            onMouseEnter={() => setHoveredCompany(company)}
            onMouseLeave={() => setHoveredCompany(null)}
          >
            {company.replace(/ /g, '\u00A0')} 
            {hoveredCompany === company && !clickedCompany && (
              <>
                <button onClick={() => fetchCompanyData(company)}>View</button>
                <button onClick={() => handleDeleteCompany(company)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Conditionally render the HoverableItem with details */}
      {clickedCompany && companyData && (
        <HoverableItem name={clickedCompany} details={companyData} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default CompanyList;
