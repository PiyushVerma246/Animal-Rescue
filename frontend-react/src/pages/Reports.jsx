import React from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
  return (
    <>
      <div>
  <main style={{paddingTop: 68, minHeight: '100vh', paddingBottom: '4rem'}}>
    <div style={{background: 'linear-gradient(135deg,#0d2010,#142018)', borderBottom: '1px solid var(--border)', padding: '3rem 0'}}>
      <div className="container">
        <div className="section-tag" style={{display: 'inline-flex', marginBottom: '0.75rem'}}>📋 Live Reports</div>
        <h1 className="section-title" style={{marginBottom: '0.5rem'}}>Animal <span>Emergency Reports</span></h1>
        <p style={{color: 'var(--text-muted)'}}>Real-time reports of injured and abandoned animals needing help</p>
      </div>
    </div>
    <div className="container" style={{paddingTop: '2rem'}}>
      {/* Stats Bar */}
      <div className="grid grid-4" style={{marginBottom: '2rem'}} id="stats-bar">
        <div className="stat-card"><div className="stat-icon green">📋</div><div><div className="stat-value" id="total-stat">–</div><div className="stat-label">Total Reports</div></div></div>
        <div className="stat-card"><div className="stat-icon red">⏳</div><div><div className="stat-value" id="pending-stat">–</div><div className="stat-label">Pending</div></div></div>
        <div className="stat-card"><div className="stat-icon blue">🏥</div><div><div className="stat-value" id="inprog-stat">–</div><div className="stat-label">In Progress</div></div></div>
        <div className="stat-card"><div className="stat-icon amber">✅</div><div><div className="stat-value" id="rescued-stat">–</div><div className="stat-label">Rescued</div></div></div>
      </div>
      {/* Filters */}
      <div className="card" style={{padding: '1.25rem', marginBottom: '2rem'}}>
        <div style={{display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap'}}>
          <select id="filter-status" className="form-control" style={{width: 'auto'}} onchange="applyFilters()">
            <option value>All Status</option>
            <option value="reported">Reported</option>
            <option value="accepted">Accepted</option>
            <option value="under_treatment">Under Treatment</option>
            <option value="rescued">Rescued</option>
          </select>
          <select id="filter-type" className="form-control" style={{width: 'auto'}} onchange="applyFilters()">
            <option value>All Animals</option>
            <option value="dog">🐕 Dog</option>
            <option value="cat">🐈 Cat</option>
            <option value="bird">🦜 Bird</option>
            <option value="cow">🐄 Cow</option>
            <option value="other">🦎 Other</option>
          </select>
          <select id="filter-severity" className="form-control" style={{width: 'auto'}} onchange="applyFilters()">
            <option value>All Severity</option>
            <option value="critical">🔴 Critical</option>
            <option value="high">🟠 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <button onclick="resetFilters()" className="btn btn-ghost btn-sm">Reset</button>
          <div style={{marginLeft: 'auto'}}>
            <a href="report-form.html" className="btn btn-primary btn-sm">+ Report Animal</a>
          </div>
        </div>
      </div>
      {/* Reports Grid */}
      <div id="reports-grid" className="grid grid-3">
        <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)'}}>
          <div className="loading-spinner" />
          <p style={{marginTop: '1rem'}}>Loading reports...</p>
        </div>
      </div>
      {/* Pagination */}
      <div id="pagination" style={{display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem'}} />
    </div>
  </main>
  <div className="toast-container" />
</div>

    </>
  );
};

export default Reports;
