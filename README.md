# Placement Portal

A comprehensive placement interaction system to track and manage student placements. Built with React, HTML, CSS, and JavaScript.

## Features

### Three User Roles:

1. **Student**
   - Browse available job opportunities
   - Apply for positions
   - Track application status

2. **Employer**
   - Post job listings
   - Review student applications
   - Accept or reject applications

3. **Placement Officer**
   - View all job postings and applications
   - Track placement statistics
   - Generate placement reports

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Home Page**: Select your role (Student, Employer, or Placement Officer)
2. **Login**: Use any email and password (demo mode)
3. **Dashboard**: Access role-specific features and functionalities

## Technologies Used

- React 18
- React Router DOM
- HTML5
- CSS3
- JavaScript (ES6+)

## Project Structure

```
src/
  ├── components/
  │   ├── Home.js
  │   ├── StudentLogin.js
  │   ├── EmployerLogin.js
  │   ├── PlacementOfficerLogin.js
  │   ├── StudentDashboard.js
  │   ├── EmployerDashboard.js
  │   └── PlacementOfficerDashboard.js
  ├── App.js
  ├── App.css
  ├── index.js
  └── index.css
```

## Features Implemented

✅ Separate login portals for each role
✅ Clean and modern UI design
✅ Fully functional buttons and interactions
✅ Job posting and application system
✅ Application status tracking
✅ Placement statistics and reports
✅ Responsive design

## Demo Credentials

For demo purposes, you can use any email and password to login. The system uses localStorage to maintain session state.

