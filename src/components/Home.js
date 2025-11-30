import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Placement Portal</h1>
        <p className="home-subtitle">Track and manage student placements efficiently</p>
        
        <div className="login-cards">
          <div className="login-card" onClick={() => navigate('/login/student')}>
            <div className="card-icon">👨‍🎓</div>
            <h2>Student</h2>
            <p>Explore job opportunities and track your applications</p>
            <button className="card-button">Login as Student</button>
          </div>

          <div className="login-card" onClick={() => navigate('/login/employer')}>
            <div className="card-icon">🏢</div>
            <h2>Employer</h2>
            <p>Post job listings and review applications</p>
            <button className="card-button">Login as Employer</button>
          </div>

          <div className="login-card" onClick={() => navigate('/login/placement-officer')}>
            <div className="card-icon">👔</div>
            <h2>Placement Officer</h2>
            <p>Track placements and generate reports</p>
            <button className="card-button">Login as Officer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

