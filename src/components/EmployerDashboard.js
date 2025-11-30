import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('post-job');
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: ''
  });
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Employer';

  useEffect(() => {
    // Load jobs from localStorage
    const savedJobs = JSON.parse(localStorage.getItem('employerJobs') || '[]');
    setJobs(savedJobs);

    // Load all applications (from students)
    const allApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    setApplications(allApplications);
  }, []);

  const handlePostJob = (e) => {
    e.preventDefault();
    const job = {
      id: Date.now(),
      ...newJob,
      postedDate: new Date().toLocaleDateString(),
      status: 'open'
    };
    const updatedJobs = [...jobs, job];
    setJobs(updatedJobs);
    localStorage.setItem('employerJobs', JSON.stringify(updatedJobs));
    setNewJob({ title: '', company: '', location: '', salary: '', description: '' });
    setShowJobForm(false);
    alert('Job posted successfully!');
  };

  const handleUpdateApplicationStatus = (appId, newStatus) => {
    const allApplications = JSON.parse(localStorage.getItem('studentApplications') || '[]');
    const updated = allApplications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    );
    localStorage.setItem('studentApplications', JSON.stringify(updated));
    setApplications(updated);
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
          <h1>Employer Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">Welcome, {userEmail}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'post-job' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('post-job')}
        >
          Post Job
        </button>
        <button 
          className={activeTab === 'my-jobs' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('my-jobs')}
        >
          My Jobs ({jobs.length})
        </button>
        <button 
          className={activeTab === 'applications' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('applications')}
        >
          Applications ({applications.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'post-job' && (
          <div className="post-job-section">
            <h2>Post a New Job</h2>
            {!showJobForm ? (
              <button className="primary-button" onClick={() => setShowJobForm(true)}>
                + Create New Job Posting
              </button>
            ) : (
              <form onSubmit={handlePostJob} className="job-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title *</label>
                    <input
                      type="text"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input
                      type="text"
                      value={newJob.company}
                      onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location *</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Salary Range *</label>
                    <input
                      type="text"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                      placeholder="e.g., $80k-120k"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Job Description *</label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    rows="5"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="primary-button">Post Job</button>
                  <button type="button" className="secondary-button" onClick={() => setShowJobForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'my-jobs' && (
          <div className="my-jobs-section">
            <h2>My Job Postings</h2>
            {jobs.length === 0 ? (
              <div className="empty-state">
                <p>No jobs posted yet. Create your first job posting!</p>
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

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>Job Applications</h2>
            {applications.length === 0 ? (
              <div className="empty-state">
                <p>No applications received yet.</p>
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
                    <div className="app-actions">
                      <button 
                        className="action-button accept"
                        onClick={() => handleUpdateApplicationStatus(app.id, 'Accepted')}
                      >
                        Accept
                      </button>
                      <button 
                        className="action-button reject"
                        onClick={() => handleUpdateApplicationStatus(app.id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </div>
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

export default EmployerDashboard;

