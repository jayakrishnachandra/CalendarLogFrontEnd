# Calendar Log Frontend

## Overview

Calendar Log Frontend is a React-based application that allows users to manage and view calendar events. It includes features for both users and administrators to interact with company data and calendar events.

## Features

- **User Authentication**: Users can register and sign in.
- **Admin Dashboard**: Admins can add companies and manage communication methods.
- **User Dashboard**: Users can view their calendar and company logs.
- **Responsive UI**: Built with Bootstrap for a mobile-friendly interface.
- **Calendar View**: Uses `react-calendar` to display calendar events.
- **API Integration**: Fetch API is used for communication with the backend.

## Project Structure

```plaintext
src/
├── Authentication/
│   ├── Register.js
│   └── SignIn.js
├── Components/
│   ├── AdminModule/
│   │   ├── AddCompanyForm.js
│   │   ├── CompanyList.js
│   │   └── MethodList.js
│   ├── UserModule/
│   │   ├── CalendarView.js
│   │   ├── CompanyLogs.js
│   │   └── DashBoard.js
├── App.css
├── App.js
└── App.test.js
```


## Installation


To get started with the project locally, follow these steps:

**1. Clone the repository**
Open your terminal and run the following command to clone the repository:


git clone https://github.com/jayakrishnachandra/CalendarLogFrontEnd.git


**2. Navigate to the project directory**
After cloning, go into the project directory:

cd CalendarLogFrontEnd


**3. Install dependencies**
Install the necessary dependencies using npm:

npm install


This will install all the required libraries specified in package.json.

**4. Start the application**
Run the following command to start the development server:


**npm start**


The application will be available at http://localhost:3000.

##Usage##
User Authentication: Register or sign in using the provided forms.
Admin Dashboard: Admins can add companies and manage communication methods.
User Dashboard: View the calendar and company logs.
