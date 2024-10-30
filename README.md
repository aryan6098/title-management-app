# Frontend Home Assignment: Title Management Application

Frontend application that interacts with an firebase backend to manage user authentication and create and read (display) titles suggested by users. Additionally, integrate MetaMask for wallet functionality.


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Deployed Application](#deployed-application)

## Features

- User authentication with JWT (JSON Web Tokens)
- Connect wallet functionality using Ethereum
- Title management system with CRUD operations
- Responsive design with Material-UI

## Tech Stack

- **Frontend**: 
  - React
  - Redux (for state management)
  - React Router (for routing)
  - Material-UI (for UI components)
  - Formik (for form handling)
  - Ethers.js (for wallet integration)
  - Jest & React Testing Library (for testing)


## Project Structure
```
├── /public                  # Publicly accessible files (index.html, favicon, etc.)
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── /src                     # Main source directory for the application
│   ├── /components          # Reusable React components
│   │   ├── /Auth           # Authentication components
│   │   │   ├── Auth.tsx
│   │   ├── /Dashboard       # Dashboard components
│   │   │   ├── TitleDashboard.tsx
│   │   │   ├── TitleList.tsx
│   │   │   ├── Header.tsx
│   │   ├── /Common          # Common components used across the app
│   │   │   ├── InputField.tsx
│   │   │   ├── CommonButton.tsx
│   ├── /config              # Configuration files
│   │   ├── firebaseConfig.ts # Firebase configuration
│   ├── /context             # Context API for global state management
│   │   ├── AuthContext.tsx
│   ├── /hooks               # Custom hooks
│   │   ├── useAuth.ts       # Authentication hook
│   │   └── useWalletConnection.ts # Wallet connection hook
│   ├── /store               # Redux store and slices
│   │   ├── /services        # Service files for API calls
│   │   │   ├── authService.ts  # API calls related to authentication
│   │   ├── authSlice.ts     # Redux slice for authentication management
│   │   ├── titleSlice.ts     # Redux slice for titles management
│   │   ├── store.ts         # Redux store configuration
│   ├── /__tests__           # Unit and integration tests
│   │   ├── /components       # Tests for components
│   │   │   ├── TitleDashboard.test.tsx
│   │   ├── /hooks           # Tests for custom hooks
│   │   │   └── useAuth.test.ts
│   │   └── /store           # Tests for Redux store and slices
│   │       ├── authSlice.test.ts
│   │       └── titleSlice.test.ts
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Entry point of the application
├── package.json             # Project metadata and dependencies
├── tsconfig.json            # TypeScript configuration                   
├── .gitignore               # Ignored files in git
└── README.md                # Documentation for the project
```

- **Backend**:
  - Firebase (for authentication)


## Getting Started
1. **Clone the project**:
   ```bash
   git clone https://github.com/aryan6098/title-management-app.git

2. Navigate into the project directory

    ```bash
    cd title-management-app

       ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the app in development mode:\
    Open [http://localhost:3000](http://localhost:3000)

5. Sign Up / Login:
    - You can use the default login credentials:
        - Email: test@gmail.com
        - Password: Test@123

    - Alternatively, sign up for your own account.


Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Deployed Application
- **Deployed App**: You can view the deployed application at https://title-management-app.netlify.app/.



