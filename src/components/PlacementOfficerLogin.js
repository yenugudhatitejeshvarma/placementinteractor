import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function PlacementOfficerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('userRole', 'placement-officer');
      localStorage.setItem('userEmail', email);
      navigate('/dashboard/placement-officer');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <div className="login-header">
          <div className="login-icon">👔</div>
          <h1>Placement Officer Login</h1>
          <p>Track placements and generate reports</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Officer Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter officer email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>Demo: Use any email and password to login</p>
        </div>
      </div>
    </div>
  );
}

export default PlacementOfficerLogin;

