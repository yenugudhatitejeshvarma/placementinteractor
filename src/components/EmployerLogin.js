import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function EmployerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('userRole', 'employer');
      localStorage.setItem('userEmail', email);
      navigate('/dashboard/employer');
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
          <div className="login-icon">🏢</div>
          <h1>Employer Login</h1>
          <p>Manage your job postings and applications</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Company Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter company email"
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

export default EmployerLogin;

