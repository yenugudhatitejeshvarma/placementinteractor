import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('jobs');
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Student';

  useEffect(() => {
    // Load sample jobs
    const sampleJobs = [
      { id: 1, title: 'Software Engineer', company: 'Tech Corp', location: 'Remote', salary: '$80k-120k', status: 'open' },
      { id: 2, title: 'Data Analyst', company: 'Data Solutions', location: 'New York', salary: '$70k-100k', status: 'open' },
      { id: 3, title: 'Product Manager', company: 'Innovate Inc', location: 'San Francisco', salary: '$100k-150k', status: 'open' },
    ];
    setJobs(sampleJobs);

    // Load applications from localStorage
    const savedApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    setApplications(savedApplications);
  }, []);

  const handleApply = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      const newApplication = {
        id: Date.now(),
        jobId: job.id,
        title: job.title,
        company: job.company,
        appliedDate: new Date().toLocaleDateString(),
        status: 'Pending'
      };
      const updatedApplications = [...applications, newApplication];
      setApplications(updatedApplications);
      localStorage.setItem('studentApplications', JSON.stringify(updatedApplications));
      alert(`Applied successfully for ${job.title} at ${job.company}!`);
    }
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
          <h1>Student Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {userEmail}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'jobs' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('jobs')}
        >
          Browse Jobs
        </button>
        <button 
          className={activeTab === 'applications' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('applications')}
        >
          My Applications ({applications.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'jobs' && (
          <div className="jobs-section">
            <h2>Available Job Opportunities</h2>
            <div className="jobs-grid">
              {jobs.map(job => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p className="company-name">{job.company}</p>
                  <div className="job-details">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                  <button 
                    className="apply-button"
                    onClick={() => handleApply(job.id)}
                    disabled={applications.some(app => app.jobId === job.id)}
                  >
                    {applications.some(app => app.jobId === job.id) ? 'Applied' : 'Apply Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>My Applications</h2>
            {applications.length === 0 ? (
              <div className="empty-state">
                <p>No applications yet. Browse jobs to apply!</p>
              </div>
            ) : (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app.id} className="application-card">
                    <div className="app-header">
                      <h3>{app.title}</h3>
                      <span className={`status-badge ${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="company-name">{app.company}</p>
                    <p className="app-date">Applied on: {app.appliedDate}</p>
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

export default StudentDashboard;

