import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import EmployerLogin from './components/EmployerLogin';
import PlacementOfficerLogin from './components/PlacementOfficerLogin';
import StudentDashboard from './components/StudentDashboard';
import EmployerDashboard from './components/EmployerDashboard';
import PlacementOfficerDashboard from './components/PlacementOfficerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/employer" element={<EmployerLogin />} />
          <Route path="/login/placement-officer" element={<PlacementOfficerLogin />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/employer" element={<EmployerDashboard />} />
          <Route path="/dashboard/placement-officer" element={<PlacementOfficerDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

