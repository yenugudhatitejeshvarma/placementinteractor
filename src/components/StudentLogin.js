import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simulate login - in real app, this would authenticate with backend
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('userEmail', email);
      navigate('/dashboard/student');
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
          <div className="login-icon">👨‍🎓</div>
          <h1>Student Login</h1>
          <p>Access your placement portal</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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

export default StudentLogin;

