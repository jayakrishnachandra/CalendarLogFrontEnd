import React, { useState } from 'react';
import SignIn from './Authentication/SignIn';
import Register from './Authentication/Register';
import Navbar from './Navbar';
import CompanyManagement from "./Components/AdminModule/CompanyManagement";
import CalendarView from './Components/UserModule/CalendarView';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Components/UserModule/DashBoard';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentModule, setCurrentModule] = useState('admin'); // Manage module view

  const handleSignIn = (token) => {
    setToken(token);
  };

  const toggleRegister = () => {
    setIsRegistering((prev) => !prev);
  };

  return (
    <Router>
    <div>
      {!token ? (
        <>
          {isRegistering ? (
            <Register toggleRegister={toggleRegister} />
          ) : (
            <SignIn onSignIn={handleSignIn} toggleRegister={toggleRegister} />
          )}
        </>
      ) : (
        <>
          <div>
            <div style={{ padding: '5px', border: '2px solid #e3f2fd', borderRadius: '10px' }}>
              <Navbar />
            </div>
            <div>
              {/* Navigation to switch between modules */}
              <button onClick={() => setCurrentModule('admin')}>Admin Module</button>
              <button onClick={() => setCurrentModule('user')}>User Module</button>
              <button onClick={() => setCurrentModule('calendar')}>Calendar View</button>
            </div>

            {/* Render the appropriate module */}
            {currentModule === 'admin' && (
              <div>
                <CompanyManagement token={token} />
              </div>
            )}

            {currentModule === 'user' && (
              <div>
                <Dashboard token={token} />
              </div>
            )}

              {currentModule === 'calendar' && (
              <div>
                <CalendarView token={token} />
              </div>
            )}

          </div>
        </>
      )}
    </div>
    </Router> 
  );
};

export default App;
