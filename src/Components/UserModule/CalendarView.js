import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './CalendarView.css'; // for styling

const CalendarView = ({ token }) => {
  const [date, setDate] = useState(new Date());
  const [logs, setLogs] = useState([]);
  const [logData, setLogData] = useState({
    companyName: '',
    communicationMethodName: '',
    communicationDate: '',
    notes: '',
    completed: false,
  });
  const [companyNames, setCompanyNames] = useState([]);
  const [communicationMethods, setCommunicationMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogsLoading, setIsLogsLoading] = useState(false);

  // Fetch logs for the selected date
  useEffect(() => {
    if (!token) {
      console.error('No token provided');
      return;
    }

    // Prepare the data to be sent to the server
    const requestData = {
      date: date.toISOString().split('T')[0], // Send the date in yyyy-MM-dd format
    };

    setIsLogsLoading(true);

    fetch('https://calendarlog.onrender.com//allLogs', {
      method: 'GET', // Use GET method to fetch logs
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLogs(data); // Set logs based on the fetched data
        setIsLogsLoading(false);
        console.log(data); // Log the data for debugging
      })
      .catch((error) => {
        console.error('Error fetching logs:', error);
        setIsLogsLoading(false);
      });
  }, [date, token]); // Fetch logs when the date or token changes

  // Fetch company names and communication methods
  useEffect(() => {
    if (!token) {
      console.error('No token provided');
      return;
    }

    fetch('https://calendarlog.onrender.com//company-method-names', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanyNames(data.companyNames || []);
        setCommunicationMethods(data.methodNames || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching company and method names:', error);
        setIsLoading(false);
      });
  }, [token]);

  // Handle date change in the calendar
  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogData({
      ...logData,
      [name]: value,
      communicationDate: date.toISOString().split('T')[0], // Update date to the selected date
    });
  };

  // Handle adding a new communication log
  const handleAddLog = () => {
    if (!token) {
      console.error('No token provided');
      return;
    }

    const logPayload = {
      ...logData,
      communicationDate: date.toISOString().split('T')[0], // Ensure the date is formatted correctly
    };

    fetch('https://calendarlog.onrender.com//addCommunicationLog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(logPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        setLogs([...logs, data]); // Add the new log to the list
        setLogData({
          companyName: '',
          communicationMethodName: '',
          communicationDate: '',
          notes: '',
          completed: false,
        }); // Reset form
      })
      .catch((error) => {
        console.error('Error adding log:', error);
      });
  };

  // Function to get the color for a specific day based on the logs
  const getDayColor = (date) => {
    const logDate = date.toISOString().split('T')[0]; // Format date to yyyy-MM-dd

    // Check if there are any logs for the selected day
    const logsForDay = logs.filter((log) => log.communicationDate === logDate);

    if (logsForDay.length === 0) {
      return ''; // No logs for this day, no color
    }

    // If there are logs, check if any of them are completed
    const completedLogs = logsForDay.filter((log) => log.completed);
    if (completedLogs.length > 0) {
      return 'green'; // Completed logs - Green color
    }

    // If no completed logs, use red for non-completed
    return 'red';
  };

  // Mark log as completed
  const handleMarkAsCompleted = (logId) => {
    if (!token) {
      console.error('No token provided');
      return;
    }

    const updatedLogs = logs.map((log) =>
      log.logId === logId ? { ...log, completed: true } : log
    );

    // Update the log on the server
    fetch(`https://calendarlog.onrender.com//markCompleted/${logId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLogs(updatedLogs); // Update the local logs with the completed status
      })
      .catch((error) => {
        console.error('Error marking log as completed:', error);
      });
  };

  return (
    <div className="calendar-view">
      <h2>Communication Log Calendar</h2>

      {/* Calendar component with color applied to the days */}
      <Calendar
        onChange={onDateChange}
        value={date}
        tileClassName={({ date }) => {
          const dayColor = getDayColor(date);
          return dayColor ? `colored-tile ${dayColor}` : ''; // Apply color if present
        }}
      />

      <div className="form-container">
        <h3>Add New Log</h3>
        <form>
          <select
            name="companyName"
            value={logData.companyName}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">-- Select a Company --</option>
            {companyNames.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
          <select
            name="communicationMethodName"
            value={logData.communicationMethodName}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">-- Select a Communication Method --</option>
            {communicationMethods.map((method, index) => (
              <option key={index} value={method}>
                {method}
              </option>
            ))}
          </select>
          <textarea
            name="notes"
            placeholder="Notes"
            value={logData.notes}
            onChange={handleInputChange}
          />
          <label>
            Completed:
            <input
              type="checkbox"
              name="completed"
              checked={logData.completed}
              onChange={(e) => setLogData({ ...logData, completed: e.target.checked })}
            />
          </label>
          <button type="button" onClick={handleAddLog} disabled={isLoading}>
            Add Log
          </button>
        </form>
      </div>

      <div>
        <h3>Logs</h3>
        {isLogsLoading ? (
          <p>Loading logs...</p>
        ) : logs.length === 0 ? (
          <p>No logs for this date.</p>
        ) : (
          <ul>
            {logs.map((log) => (
              <li key={log.logId}>
                <p>{log.companyName} - {log.communicationMethodName}</p>
                <p>{log.notes}</p>
                <p>Status: {log.completed ? 'Completed' : 'Not Completed'}</p>
                {!log.completed && (
                  <button onClick={() => handleMarkAsCompleted(log.logId)}>Mark as Completed</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
