import React from 'react';
import { Link } from 'react-router-dom';

const NGODashboard = () => {
  return (
    <>
      <div>
  <div className="dashboard-layout">
    {/* Sidebar */}
    <aside className="sidebar">
      <div style={{textAlign: 'center', padding: '1rem 0 1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem'}}>
        <div style={{width: 60, height: 60, background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-dark))', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 0.75rem'}}>🏥</div>
        <div style={{fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem'}} id="org-name">Loading...</div>
        <div style={{fontSize: '0.78rem', color: 'var(--text-muted)'}} id="org-role">NGO</div>
        <span className="badge badge-success" style={{marginTop: '0.5rem'}} id="verified-badge">✅ Verified</span>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="sidebar-link active" onclick="showSection('overview',this)">
          <span className="icon">📊</span> Overview
        </a>
        <a href="#" className="sidebar-link" onclick="showSection('nearby',this)">
          <span className="icon">📍</span> Nearby Cases
        </a>
        <a href="#" className="sidebar-link" onclick="showSection('active',this)">
          <span className="icon">🏥</span> Active Cases
        </a>
        <a href="#" className="sidebar-link" onclick="showSection('notifications',this)">
          <span className="icon">🔔</span> Notifications
          <span id="notif-badge" style={{display: 'none', background: 'var(--clr-danger)', color: '#fff', borderRadius: 20, padding: '1px 7px', fontSize: '0.72rem', marginLeft: 'auto'}}>0</span>
        </a>
        <a href="adoption.html" className="sidebar-link">
          <span className="icon">🐾</span> Manage Adoptions
        </a>
        {/* AI Duplicate Detection Panel */}
        <a href="#" className="sidebar-link" onclick="showSection('duplicates',this)">
          <span className="icon">🤖</span> Duplicate Detection
        </a>
        <a href="#" className="sidebar-link" onclick="showSection('profile',this)">
          <span className="icon">⚙️</span> Profile/Settings
        </a>
      </nav>
    </aside>
    {/* Main */}
    <main className="dashboard-main">
      <div id="loading" style={{textAlign: 'center', padding: '4rem'}}>
        <div className="loading-spinner" />
        <p style={{color: 'var(--text-muted)', marginTop: '1rem'}}>Loading NGO dashboard...</p>
      </div>
      {/* Overview */}
      <section id="section-overview" style={{display: 'none'}}>
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)'}} id="welcome-msg">Welcome!</h1>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Manage animal rescue cases and make a difference</p>
        </div>
        <div className="grid grid-4" style={{marginBottom: '2rem'}}>
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <div>
              <div className="stat-value" id="accepted-cases">0</div>
              <div className="stat-label">Cases Accepted</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">🏥</div>
            <div>
              <div className="stat-value" id="active-cases-stat">0</div>
              <div className="stat-label">Active Cases</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber">🦅</div>
            <div>
              <div className="stat-value" id="rescued-stat">0</div>
              <div className="stat-label">Animals Rescued</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">🔔</div>
            <div>
              <div className="stat-value" id="pending-notifs">0</div>
              <div className="stat-label">Pending Alerts</div>
            </div>
          </div>
        </div>
        {/* Active Cases List */}
        <div className="card" style={{padding: 0, overflow: 'hidden'}}>
          <div style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)'}}>Active Cases</h3>
            <button onclick="showSection('nearby', document.querySelector('.sidebar-link:nth-child(2)'))" className="btn btn-primary btn-sm">View Nearby Cases</button>
          </div>
          <div id="active-cases-list">
            <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>Loading active cases...</div>
          </div>
        </div>
      </section>
      {/* Nearby Reports Section */}
      <section id="section-nearby" style={{display: 'none'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
            <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}}>📍 Nearby Case Reports</h2>
            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Animal emergencies requiring immediate attention near your location</p>
          </div>
          <div style={{display: 'flex', gap: '0.75rem', alignItems: 'center'}}>
            <select id="radius-select" className="form-control" style={{width: 'auto'}} onchange="loadNearbyReports()">
              <option value={10}>10 km</option>
              <option value={20} selected>20 km</option>
              <option value={50}>50 km</option>
            </select>
            <button onclick="loadNearbyReports()" className="btn btn-ghost btn-sm">🔄 Refresh</button>
          </div>
        </div>
        <div id="nearby-reports" className="grid grid-auto">
          <div style={{textAlign: 'center', color: 'var(--text-muted)', padding: '4rem', gridColumn: '1/-1'}}>
            <div className="loading-spinner" />
            <p style={{marginTop: '1rem'}}>Finding nearby cases...</p>
          </div>
        </div>
      </section>
      {/* Active Cases Section */}
      <section id="section-active" style={{display: 'none'}}>
        <div style={{marginBottom: '1.5rem'}}>
          <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}}>🏥 Active Cases</h2>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Cases you are currently handling</p>
        </div>
        <div id="active-section-list">
          <div style={{textAlign: 'center', padding: '4rem', color: 'var(--text-muted)'}}><div className="loading-spinner" /></div>
        </div>
      </section>
      {/* Notifications */}
      <section id="section-notifications" style={{display: 'none'}}>
        <div style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}}>🔔 Notifications</h2>
          <button onclick="markAllRead()" className="btn btn-ghost btn-sm">Mark all read</button>
        </div>
        <div id="ngo-notifs-list" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          <div style={{textAlign: 'center', color: 'var(--text-muted)', padding: '4rem'}}><div className="loading-spinner" /></div>
        </div>
      </section>
      {/* Profile Section */}
      <section id="section-profile" style={{display: 'none'}}>
        <div style={{marginBottom: '2rem'}}>
          <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}}>⚙️ Organization Profile</h2>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Manage your NGO profile and location settings</p>
        </div>
        <div className="card" style={{maxWidth: 600, padding: '2rem'}}>
          <div className="form-group">
            <label className="form-label">Update Location</label>
            <button onclick="updateNGOLocation()" className="btn btn-ghost btn-sm">📡 Use Current Location</button>
          </div>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="p-city">City</label>
              <input type="text" className="form-control" id="p-city" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="p-state">State</label>
              <input type="text" className="form-control" id="p-state" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="p-address">Address</label>
            <input type="text" className="form-control" id="p-address" />
          </div>
          <button onclick="saveProfile()" className="btn btn-primary">Save Changes</button>
        </div>
      </section>
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   AI DUPLICATE DETECTION PANEL
   Shows merged duplicate reports, witness counts, and similarity
   scores. Calls GET /api/rescue and GET /api/rescue/stats.
    â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="section-duplicates" style={{display: 'none'}}>
        <div style={{marginBottom: '2rem'}}>
          <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}}>🤖 AI Duplicate Rescue Detection</h2>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Monitor how the system merges duplicate animal rescue reports in real-time</p>
        </div>
        {/* Stats Row */}
        <div className="grid grid-4" style={{marginBottom: '2rem'}} id="dup-stats-row">
          <div className="stat-card">
            <div className="stat-icon green">📋</div>
            <div><div className="stat-value" id="dup-total-rescues">–</div><div className="stat-label">Total Rescues</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">👁️</div>
            <div><div className="stat-value" id="dup-total-witnesses">–</div><div className="stat-label">Total Witnesses</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber">🔀</div>
            <div><div className="stat-value" id="dup-merged">–</div><div className="stat-label">Duplicates Merged</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">🎯</div>
            <div><div className="stat-value" id="dup-avg-sim">–</div><div className="stat-label">Avg Similarity</div></div>
          </div>
        </div>
        {/* AI Service Status Banner */}
        <div id="ai-status-banner" style={{marginBottom: '1.5rem', padding: '0.75rem 1rem', borderRadius: 10, fontSize: '0.85rem', display: 'none'}} />
        {/* Rescue Cases Table */}
        <div className="card" style={{padding: 0, overflow: 'hidden'}}>
          <div style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem'}}>
            <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)'}}>Rescue Cases &amp; Witness Log</h3>
            <div style={{display: 'flex', gap: '0.75rem', alignItems: 'center'}}>
              <select id="dup-filter-status" className="form-control" style={{width: 'auto'}} onchange="loadDuplicatePanel()">
                <option value>All Statuses</option>
                <option value="open">Open</option>
                <option value="assigned">Assigned</option>
                <option value="in_progress">In Progress</option>
                <option value="rescued">Rescued</option>
                <option value="closed">Closed</option>
              </select>
              <button onclick="loadDuplicatePanel()" className="btn btn-ghost btn-sm">🔄 Refresh</button>
            </div>
          </div>
          <div id="dup-rescues-table">
            <div style={{padding: '3rem', textAlign: 'center', color: 'var(--text-muted)'}}>
              <div className="loading-spinner" />
              <p style={{marginTop: '1rem'}}>Loading rescue data...</p>
            </div>
          </div>
        </div>
        {/* Top Witnessed Rescues */}
        <div className="card" style={{padding: 0, overflow: 'hidden', marginTop: '1.5rem'}}>
          <div style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)'}}>
            <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)'}}>🏆 Most-Witnessed Rescues</h3>
            <p style={{color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: 2}}>Cases with the highest number of confirmed witnesses</p>
          </div>
          <div id="dup-top-witnessed" style={{padding: '1rem'}}>
            <div style={{textAlign: 'center', color: 'var(--text-muted)', padding: '2rem'}}>
              <div className="loading-spinner" />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  {/* Status Update Modal */}
  <div id="status-modal" className="modal-overlay" style={{display: 'none'}}>
    <div className="modal">
      <div className="modal-header">
        <h3 className="modal-title">Update Case Status</h3>
        <button className="modal-close" onclick="closeModal()">✕</button>
      </div>
      <input type="hidden" id="modal-report-id" />
      <div className="form-group">
        <label className="form-label">New Status *</label>
        <select className="form-control" id="modal-status">
          <option value="accepted">✅ Accept Case</option>
          <option value="under_treatment">💊 Under Treatment</option>
          <option value="rescued">🦅 Rescued</option>
          <option value="closed">🔒 Close Case</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Note</label>
        <textarea className="form-control" id="modal-note" placeholder="Add a note about the status update..." rows={3} defaultValue={""} />
      </div>
      <div style={{display: 'flex', gap: '0.75rem'}}>
        <button onclick="submitStatusUpdate()" className="btn btn-primary flex-1" style={{justifyContent: 'center'}}>Update Status</button>
        <button onclick="closeModal()" className="btn btn-ghost">Cancel</button>
      </div>
    </div>
  </div>
  <div className="toast-container" />
</div>

    </>
  );
};

export default NGODashboard;
