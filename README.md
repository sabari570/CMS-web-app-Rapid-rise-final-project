# ConnectEZ

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Frontend](#frontend)
    - [Folder Structure](#folder-structure)
    - [Frontend Packages](#frontend-packages)
4. [Backend](#backend)
    - [Folder Structure](#folder-structure-1)
    - [Backend Packages](#backend-packages)
5. [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
6. [Usage](#usage)
7. [License](#license)
8. [Acknowledgments](#acknowledgments)

## Overview

**ConnectEZ** is a comprehensive web application designed to streamline contact management for users. The application allows users to create an account and securely sign in using either an email and password or the convenient "Sign in with Google" feature. In case of a forgotten password, users can easily reset it by receiving a reset link via email.

Upon logging in, users are greeted with an intuitive dashboard that provides a snapshot of all their contacts, complete with insightful statistics comparing current data with the previous month. The dashboard also features a pie chart visualizing the distribution of employees across different companies, along with a list of recent interactions.

The application includes a dedicated Contacts page where users can efficiently manage their contacts. This includes creating new contacts, updating existing ones, and deleting contacts as needed. Additionally, the Profile page allows users to view and update their personal information.

ConnectEZ also includes thoughtfully designed error handling, featuring a custom error page and a network connectivity page to ensure a smooth user experience even in adverse conditions.

## Features

- **User Authentication**: Secure login and registration using email/password and Google authentication.
- **Password Reset**: Allows users to reset their passwords via email.
- **Dashboard**: Displays an overview of contacts, monthly statistics, and recent interactions.
- **Contact Management**: Create, update, and delete contacts with ease.
- **Profile Management**: View and update user profile information.
- **Error Handling**: Custom error pages and network disconnectivity notifications.

## Frontend

The frontend of ConnectEZ is built using React and several other libraries to create a responsive and interactive user interface. Below is the folder structure for the frontend:

### Folder Structure

```
cms-client
├── src
│   ├── components
│   │   ├── authButton.jsx
│   │   ├── authFooterBottomNavigation.jsx
│   │   ├── authForm.jsx
│   │   ├── authFormHeaderLogo.jsx
│   │   ├── authProfileContainer.jsx
│   │   ├── cmsCustomDropdown.jsx
│   │   ├── cmsCustomModal.jsx
│   │   ├── contactCard.jsx
│   │   ├── contactPageButton.jsx
│   │   ├── contactsPageHeader.jsx
│   │   ├── contactsSearchField.jsx
│   │   ├── contactsTable.jsx
│   │   ├── contactsTablePagination.jsx
│   │   ├── createContactForm.jsx
│   │   ├── dashboardContactsGraph.jsx
│   │   ├── dashboardContactsPieChart.jsx
│   │   ├── dashboardHeaderTotals.jsx
│   │   ├── dashboardRecentContacts.jsx
│   │   ├── exportToCsvBtn.jsx
│   │   ├── genderRadioField.jsx
│   │   └── ...
│   ├── hooks
│   │   ├── useCreateContact.js
│   │   ├── useDeleteContact.js
│   │   ├── useFetchCompaniesList.js
│   │   ├── useFetchContactDetail.js
│   │   ├── useFetchContacts.js
│   │   ├── useFetchDashboardData.js
│   │   ├── useFetchUserDetail.js
│   │   ├── useForgotPassword.js
│   │   ├── useIsMobile.js
│   │   ├── useLogin.js
│   │   ├── useLogout.js
│   │   ├── useOnlineStatus.js
│   │   ├── useResetPassword.js
│   │   ├── useSignUp.js
│   │   ├── useUpdateContactAvatar.js
│   │   ├── useUpdateContactDetail.js
│   │   ├── useUpdateUserAvatar.js
│   │   ├── useUpdateUserDetail.js
│   │   └── ...
│   ├── pages
│   │   ├── contactEditPage.jsx
│   │   ├── contactsPage.jsx
│   │   ├── createContactPage.jsx
│   │   ├── errorPage.jsx
│   │   ├── forgotPasswordPage.jsx
│   │   ├── homePage.jsx
│   │   ├── landingPage.jsx
│   │   ├── loginPage.jsx
│   │   ├── networkConnectionErrorPage.jsx
│   │   ├── registerPage.jsx
│   │   ├── resetPasswordPage.jsx
│   │   ├── userProfilePage.jsx
│   │   └── ...
│   ├── services
│   │   ├── axiosInterceptor.js
│   │   └── ...
│   ├── store
│   │   ├── contact.reducer.js
│   │   ├── loading.reducer.js
│   │   ├── splash.reducer.js
│   │   ├── user.reducer.js
│   │   └── ...
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── public
│   ├── index.html
│   └── ...
├── .env
├── package.json
└── ...
```

### Frontend Packages

- **@hookform/resolvers**: Resolver for validation libraries like Zod in React Hook Form.
- **@json2csv/plainjs**: Convert JSON to CSV format for export functionality.
- **@reduxjs/toolkit**: Toolset for efficient Redux development.
- **@tanstack/react-table**: Headless UI for building tables with React.
- **axios**: Promise-based HTTP client for making API requests.
- **lottie-react**: A React wrapper for Lottie animations.
- **react**: Core library for building user interfaces.
- **react-dom**: Package for rendering React components in the DOM.
- **react-hook-form**: Performant and flexible form library for React.
- **react-hot-toast**: Library for displaying notifications in React apps.
- **react-icons**: Collection of popular icons as React components.
- **react-paginate**: A React component for pagination.
- **react-phone-input-2**: A React component for phone number input.
- **react-redux**: Official React bindings for Redux.
- **react-router-dom**: Declarative routing for React web applications.
- **react-select**: A flexible and customizable select input control.
- **recharts**: A charting library built on React components.
- **redux**: Predictable state container for JavaScript apps.
- **redux-persist**: Persist and rehydrate a Redux store.
- **sass**: A CSS preprocessor for styling.
- **zod**: TypeScript-first schema declaration and validation library.

## Frontend

The backend of ConnectEZ is built using Node.js and follows the MVC (Model-View-Controller) architecture. Below is the folder structure of the backend:

### Folder Structure
```
cms-server/
│
├── constants/
│   └── constants.js
│
├── controllers/
│   ├── authController.js
│   ├── contactController.js
│   └── userController.js
│
├── middlewares/
│   └── [middlewares to handle authentication, error handling, etc.]
│
├── models/
│   ├── contactModel.js
│   ├── tokenBlacklistModel.js
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── contactRoutes.js
│   └── userRoutes.js
│
├── uploaded_files/
│   └── [Directory to store uploaded files]
│
├── utils/
│   ├── errorHandler.js
│   ├── fileStorageConfig.js
│   └── helperFunctions.js
│
└── node_modules/
```

## Backend Packages

- **bcrypt**: Password hashing and salting.
- **body-parser**: Middleware to parse incoming request bodies.
- **cookie-parser**: Parse and manage cookies in requests.
- **cors**: Enable Cross-Origin Resource Sharing (CORS) for the backend.
- **date-format**: Simple date formatting utility.
- **dotenv**: Loads environment variables from a .env file into `process.env`.
- **express**: The web framework used for creating the RESTful API.
- **express-rate-limit**: Basic rate-limiting middleware for Express.
- **express-session**: Create and manage sessions in Express.
- **helmet**: Secure Express apps by setting various HTTP headers.
- **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for secure user authentication.
- **mime-types**: Handling of MIME types based on file extension or content.
- **moment**: Date and time parsing, validation, and formatting library.
- **mongoose**: MongoDB object modeling for Node.js.
- **multer**: Middleware for handling file uploads.
- **nodemailer**: Module to send emails using Node.js.
- **passport**: Authentication middleware for Node.js.
- **passport-google-oauth20**: Google OAuth 2.0 authentication strategy for Passport.
- **validator**: String validation and sanitization library.


## Installation

### Prerequisites

- Node.js (version 20.12.0)
- MongoDB

### Backend Setup

1. Clone the repository:

    ```
    git clone https://github.com/sabari570/CMS-web-app-Rapid-rise-final-project.git
    cd CMS-web-app-Rapid-rise-final-project/cms-server
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```
    cd ../cms-client
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Start the frontend:

    ```
    npm start
    ```

## Usage

- Open your browser and navigate to `http://localhost:5173` to access **ConnectEZ**.
- Register or sign in using your credentials or Google account.
- Use the dashboard to manage your contacts and view statistics.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

