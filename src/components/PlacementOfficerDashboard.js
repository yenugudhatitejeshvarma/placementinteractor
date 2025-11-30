import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function PlacementOfficerDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    accepted: 0,
    pending: 0,
    rejected: 0
  });
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Placement Officer';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load all jobs
    const allJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]');
    setJobs(allJobs);

    // Load all applications
    const allApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    setApplications(allApplications);

    // Calculate stats
    const accepted = allApplications.filter(app => app.status === 'Accepted').length;
    const pending = allApplications.filter(app => app.status === 'Pending').length;
    const rejected = allApplications.filter(app => app.status === 'Rejected').length;

    setStats({
      totalJobs: allJobs.length,
      totalApplications: allApplications.length,
      accepted,
      pending,
      rejected
    });
  };

  const handleGenerateReport = () => {
    const report = `
PLACEMENT REPORT
================
Generated on: ${new Date().toLocaleString()}

STATISTICS:
- Total Job Postings: ${stats.totalJobs}
- Total Applications: ${stats.totalApplications}
- Accepted: ${stats.accepted}
- Pending: ${stats.pending}
- Rejected: ${stats.rejected}

Placement Rate: ${stats.totalApplications > 0 ? ((stats.accepted / stats.totalApplications) * 100).toFixed(1) : 0}%
    `;
    alert(report);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Placement Officer Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {userEmail}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'applications' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('applications')}
        >
          All Applications
        </button>
        <button 
          className={activeTab === 'jobs' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('jobs')}
        >
          All Jobs
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💼</div>
                <div className="stat-value">{stats.totalJobs}</div>
                <div className="stat-label">Total Jobs</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-value">{stats.totalApplications}</div>
                <div className="stat-label">Total Applications</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{stats.accepted}</div>
                <div className="stat-label">Accepted</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">❌</div>
                <div className="stat-value">{stats.rejected}</div>
                <div className="stat-label">Rejected</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-value">
                  {stats.totalApplications > 0 
                    ? ((stats.accepted / stats.totalApplications) * 100).toFixed(1) 
                    : 0}%
                </div>
                <div className="stat-label">Placement Rate</div>
              </div>
            </div>
            <button className="primary-button report-button" onClick={handleGenerateReport}>
              📄 Generate Report
            </button>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>All Applications</h2>
            {applications.length === 0 ? (
              <div className="empty-state">
                <p>No applications found.</p>
              </div>
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app.id} className="application-card">
                    <div className="app-header">
                      <div>
                        <h3>{app.title}</h3>
                        <p className="company-name">{app.company}</p>
                      </div>
                      <span className={`status-badge ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="app-date">Applied on: {app.appliedDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="my-jobs-section">
            <h2>All Job Postings</h2>
            {jobs.length === 0 ? (
              <div className="empty-state">
                <p>No jobs posted yet.</p>
              </div>
            ) : (
              <div className="jobs-grid">
                {jobs.map(job => (
                  <div key={job.id} className="job-card">
                    <h3>{job.title}</h3>
                    <p className="company-name">{job.company}</p>
                    <div className="job-details">
                      <span>📍 {job.location}</span>
                      <span>💰 {job.salary}</span>
                    </div>
                    <p className="job-description">{job.description}</p>
                    <p className="posted-date">Posted: {job.postedDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlacementOfficerDashboard;

