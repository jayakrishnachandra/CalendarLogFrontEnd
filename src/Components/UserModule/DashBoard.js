import React, { useState, useEffect } from 'react';
import CompanyList from './CompanyList';
import CompanyLogs from './CompanyLogs'; // Component to show logs for a selected company
import moment from 'moment'; // To handle date comparisons

const Dashboard = ({ token }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // To hold selected company for fetching logs
  const [logs, setLogs] = useState([]); // To hold communication logs for the selected company
  const [companyStatus, setCompanyStatus] = useState({}); // To store color status for each company
  const [showOverlay, setShowOverlay] = useState(false); // To manage the overlay visibility

  const fetchCompanyAndMethods = async () => {
    try {
      const response = await fetch('https://calendarlog.onrender.com/company-method-names', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies(data.companyNames); // Store company names
        initializeCompanyStatus(data.companyNames); // Initialize status for each company
      } else {
        alert('Failed to fetch company and method names');
      }
    } catch (error) {
      alert('Error fetching company and method names');
    }
  };

  // Initialize company status to "lightblue" initially
  const initializeCompanyStatus = (companyNames) => {
    const status = {};
    companyNames.forEach((company) => {
      status[company] = '#ADD8E6'; // Light blue color
    });
    setCompanyStatus(status);
  };

  // Fetch logs for a specific company and determine its status
  const fetchLogsForCompany = async (companyName) => {
    try {
      const response = await fetch(`https://calendarlog.onrender.com/allLogs/${companyName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLogs(data); // Set logs for the selected company
        determineCompanyStatus(companyName, data); // Determine status based on logs
      } else {
        alert('NO logs for this company');
      }
    } catch (error) {
      alert('Error fetching logs for the company');
    }
  };

  // Determine company color based on logs
  const determineCompanyStatus = (companyName, logs) => {
    const today = moment();
    const hasOverdue = logs.some((log) => moment(log.communicationDate).isBefore(today, 'day'));

    setCompanyStatus((prevStatus) => ({
      ...prevStatus,
      [companyName]: hasOverdue ? '#FFCCCB' : '#ADD8E6', // Light red if overdue, light blue if not
    }));
  };

  useEffect(() => {
    fetchCompanyAndMethods();
  }, [token]);

  // Handle company selection
  const handleCompanySelect = (companyName) => {
    setSelectedCompany(companyName); // Set the selected company
    fetchLogsForCompany(companyName); // Fetch logs for the selected company
    setShowOverlay(true); // Show the overlay when a company is selected
  };

  // Handle close overlay
  const handleCloseOverlay = () => {
    setShowOverlay(false); // Close the overlay
    setSelectedCompany(null); // Reset selected company
    setLogs([]); // Clear logs
  };

  // Separate logs into "Previous" and "Next"
  const separateLogs = (logs) => {
    const today = moment();
    const previousLogs = [];
    const nextLogs = [];

    logs.forEach((log) => {
      const logDate = moment(log.communicationDate); // Correct date field
      if (logDate.isBefore(today, 'day')) {
        previousLogs.push(log); // Log is before today (previous)
      } else {
        nextLogs.push(log); // Log is today or in the future (next)
      }
    });

    return { previousLogs, nextLogs };
  };

  const { previousLogs, nextLogs } = separateLogs(logs); // Separate logs into two categories

  return (
    <div>
      <h2>Company Management</h2>

      {/* Company List with color-coding */}
      <CompanyList
        companies={companies}
        handleCompanySelect={handleCompanySelect}
        getCompanyColor={(companyName) => companyStatus[companyName] || '#ADD8E6'} // Pass the light blue color as default
      />

      {/* Full-Screen Overlay */}
      {showOverlay && (
        <div
          className="overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
            zIndex: 9999, // Ensure it's on top
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleCloseOverlay}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '80%',
              maxHeight: '80%',
              overflowY: 'auto',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent overlay from closing when clicking inside the container
          >
            <h3>{selectedCompany}</h3>

            {/* Display Previous Logs */}
            {previousLogs.length > 0 && (
              <div>
                <h4>Previous Communications</h4>
                <CompanyLogs logs={previousLogs} />
              </div>
            )}

            {/* Display Next Logs */}
            {nextLogs.length > 0 && (
              <div>
                <h4>Next Scheduled Communications</h4>
                <CompanyLogs logs={nextLogs} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
