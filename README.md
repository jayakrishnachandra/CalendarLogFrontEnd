Calendar Log Frontend
Overview
The Calendar Log Frontend is a React-based web application designed to help users log and manage calendar events. The app provides a dashboard for administrators and users to interact with the system, including features like adding companies, viewing logs, and managing methods of communication.

Project Structure
bash
Copy code
src/
│
├── Authentication/
│   ├── Register.js
│   └── SignIn.js
│
├── Components/
│   ├── AdminModule/
│   │   ├── AddCompanyForm.js
│   │   ├── CompanyList.js
│   │   ├── MethodList.js
│   │   └── HoverableItem.js
│   ├── UserModule/
│   │   ├── CalendarView.css
│   │   ├── CalendarView.js
│   │   ├── CompanyLogs.js
│   │   ├── DashBoard.js
│   │   ├── HoverableItem.css
│   │   └── HoverableItem.js
│
├── App.css
├── App.js
└── App.test.js
Directories and Files
Authentication/: Contains components for user authentication.

Register.js: Handles the user registration process.
SignIn.js: Handles the user sign-in process.
Components/: Contains the app's main components.

AdminModule/: Features for the admin panel.
AddCompanyForm.js: Form to add a new company.
CompanyList.js: Displays a list of companies.
MethodList.js: Lists communication methods.
HoverableItem.js: Used for interactive hoverable items.
UserModule/: Features for the user panel.
CalendarView.js: Displays the calendar view for users.
CompanyLogs.js: Displays logs related to companies.
DashBoard.js: Dashboard component for users.
HoverableItem.js and HoverableItem.css: Used for hoverable interactive elements.
App.js: Main entry point for the React application.

App.css: Global styles for the app.

App.test.js: Unit tests for the app components.

Features
User Authentication: Allows users to register and sign in to access the application.
Admin Dashboard: Admins can add companies, manage communication methods, and view the company list.
User Dashboard: Users can view the calendar, log events, and access company logs.
Hoverable Items: Interactive UI elements that show additional details on hover.
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher)
npm
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/jayakrishnachandra/CalendarLogFrontEnd.git
Navigate to the project directory:

bash
Copy code
cd CalendarLogFrontEnd
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
The app will be running on http://localhost:3000/.
