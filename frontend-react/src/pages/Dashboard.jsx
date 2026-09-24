import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <div>
  {/* NAVBAR */}
  <div className="dashboard-layout">
    {/* Sidebar */}
    <aside className="sidebar">
      {/* User Card */}
      <div style={{textAlign: 'center', padding: '1rem 0 1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem', flexShrink: 0}}>
        <div style={{width: 60, height: 60, background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-dark))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', margin: '0 auto 0.75rem'}} id="avatar"><i className="fa-solid fa-user" /></div>
        <div style={{fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem'}} id="user-name">Loading...</div>
        <div style={{fontSize: '0.78rem', color: 'var(--text-muted)'}} id="user-email">...</div>
        <div style={{marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 20, padding: '0.3rem 0.75rem'}}>
          <span style={{fontSize: '0.9rem', color: '#eab308'}}><i className="fa-solid fa-gift" /></span>
          <span style={{color: 'var(--clr-primary)', fontWeight: 700, fontSize: '0.9rem'}} id="reward-points">0</span>
          <span style={{color: 'var(--text-muted)', fontSize: '0.78rem'}}>Points</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <a href="#overview" className="sidebar-link active" onclick="showSection('overview')">
          <span className="icon"><i className="fa-solid fa-chart-pie" /></span> Overview
        </a>
        <a href="#my-reports" className="sidebar-link" onclick="showSection('my-reports')">
          <span className="icon"><i className="fa-solid fa-clipboard-list" /></span> My Reports
        </a>
        <a href="#notifications" className="sidebar-link" onclick="showSection('notifications')">
          <span className="icon"><i className="fa-solid fa-bell" /></span> Notifications
          <span id="notif-badge" style={{display: 'none', background: 'var(--clr-danger)', color: '#fff', borderRadius: 20, padding: '1px 7px', fontSize: '0.72rem', marginLeft: 'auto'}}>0</span>
        </a>
        <a href="#rewards" className="sidebar-link" onclick="showSection('rewards')">
          <span className="icon"><i className="fa-solid fa-gift" /></span> Rewards
        </a>
        <a href="report-form.html" className="sidebar-link">
          <span className="icon"><i className="fa-solid fa-truck-medical" style={{color: '#ef4444'}} /></span> Report Animal
        </a>
        <a href="adoption.html" className="sidebar-link">
          <span className="icon"><i className="fa-solid fa-paw" style={{color: '#f97316'}} /></span> Adoption
        </a>
        <a href="donate.html" className="sidebar-link">
          <span className="icon"><i className="fa-solid fa-hand-holding-dollar" style={{color: '#3b82f6'}} /></span> Donate
        </a>
      </nav>
    </aside>
    {/* Main Content */}
    <main className="dashboard-main">
      <div id="loading" style={{textAlign: 'center', padding: '4rem'}}>
        <div className="loading-spinner" />
        <p style={{color: 'var(--text-muted)', marginTop: '1rem'}}>Loading your dashboard...</p>
      </div>
      {/* Overview Section */}
      <section id="section-overview" style={{display: 'none'}}>
        <div style={{marginBottom: '2rem', flexShrink: 0}}>
          <h1 style={{fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)'}} id="welcome-msg">Welcome back!</h1>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Here's a summary of your animal rescue activity</p>
        </div>
        <div className="grid grid-4" style={{marginBottom: '2rem', flexShrink: 0}}>
          <div className="stat-card">
            <div className="stat-icon green"><i className="fa-solid fa-clipboard-list" /></div>
            <div>
              <div className="stat-value" id="total-reports">0</div>
              <div className="stat-label">Total Reports</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber"><i className="fa-solid fa-circle-check" /></div>
            <div>
              <div className="stat-value" id="rescued-count">0</div>
              <div className="stat-label">Animals Rescued</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><i className="fa-solid fa-gift" /></div>
            <div>
              <div className="stat-value" id="pts-stat">0</div>
              <div className="stat-label">Reward Points</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><i className="fa-solid fa-trophy" /></div>
            <div>
              <div className="stat-value" id="rank-stat">Hero</div>
              <div className="stat-label">Your Rank</div>
            </div>
          </div>
        </div>
        {/* Recent Reports */}
        <div className="card" style={{padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1}}>
          <div style={{padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0}}>
            <h3 style={{fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)'}}>Recent Reports</h3>
            <button onclick="showSection('my-reports')" className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div id="recent-reports-table">
            <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-muted)'}}>Loading reports...</div>
          </div>
        </div>
      </section>
      {/* My Reports Section */}
      <section id="section-my-reports" style={{display: 'none'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', flexShrink: 0}}>
          <div>
            <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}}>My Reports</h2>
            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Track all the animals you've reported</p>
          </div>
          <a href="report-form.html" className="btn btn-primary btn-sm">+ New Report</a>
        </div>
        <div id="my-reports-list" className="grid grid-auto" style={{alignContent: 'start'}}>
          <div style={{textAlign: 'center', color: 'var(--text-muted)', padding: '4rem', gridColumn: '1/-1'}}>
            <div className="loading-spinner" />
          </div>
        </div>
      </section>
      {/* Notifications Section */}
      <section id="section-notifications" style={{display: 'none'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexShrink: 0}}>
          <div>
            <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}}>Notifications</h2>
            <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Updates on your animal reports and rewards</p>
          </div>
          <button onclick="markAllRead()" className="btn btn-ghost btn-sm">Mark all read</button>
        </div>
        <div id="notifications-list" style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          <div style={{textAlign: 'center', color: 'var(--text-muted)', padding: '4rem'}}>
            <div className="loading-spinner" />
          </div>
        </div>
      </section>
      {/* Rewards Section */}
      <section id="section-rewards" style={{display: 'none', overflowY: 'auto', paddingBottom: '2rem'}}>
        <div style={{marginBottom: '2rem', flexShrink: 0}}>
          <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}}>Reward Program</h2>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Earn points by helping animals and climb the hero leaderboard</p>
        </div>
        <div className="grid grid-2" style={{marginBottom: '2rem', flexShrink: 0}}>
          <div className="card" style={{textAlign: 'center', padding: '2.5rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '0.75rem', color: '#eab308'}}><i className="fa-solid fa-gift" /></div>
            <div style={{fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'var(--clr-primary)'}} id="rewards-points">0</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem'}}>Total Points Earned</div>
            <div style={{marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(34,197,94,0.08)', borderRadius: 10, fontSize: '0.85rem', color: 'var(--text-muted)'}}>
              <i className="fa-solid fa-trophy" style={{color: '#eab308', marginRight: 4}} /> Rank: <strong style={{color: 'var(--clr-primary)'}} id="hero-rank">Animal Hero</strong>
            </div>
          </div>
          <div className="card" style={{padding: '2rem'}}>
            <h4 style={{fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem'}}>How to Earn Points</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              <div className="flex items-center gap-3" style={{fontSize: '0.88rem'}}>
                <span style={{background: 'rgba(34,197,94,0.15)', padding: '0.4rem 0.8rem', borderRadius: 20, color: 'var(--clr-primary)', fontWeight: 700}}>+50</span>
                <span style={{color: 'var(--text-muted)'}}>Submit a verified animal report</span>
              </div>
              <div className="flex items-center gap-3" style={{fontSize: '0.88rem'}}>
                <span style={{background: 'rgba(34,197,94,0.15)', padding: '0.4rem 0.8rem', borderRadius: 20, color: 'var(--clr-primary)', fontWeight: 700}}>+100</span>
                <span style={{color: 'var(--text-muted)'}}>Animal from your report gets rescued</span>
              </div>
              <div className="flex items-center gap-3" style={{fontSize: '0.88rem'}}>
                <span style={{background: 'rgba(59,130,246,0.15)', padding: '0.4rem 0.8rem', borderRadius: 20, color: '#60a5fa', fontWeight: 700}}>+25</span>
                <span style={{color: 'var(--text-muted)'}}>Report complete with photos</span>
              </div>
            </div>
            <div style={{marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)'}}>
              <h5 style={{fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem'}}>Rank Milestones</h5>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)'}}>
                <div><i className="fa-solid fa-seedling" style={{color: '#22c55e', width: 16}} /> <strong style={{color: 'var(--text-primary)'}}>Sprout</strong> – 0–99 pts</div>
                <div><i className="fa-solid fa-leaf" style={{color: '#10b981', width: 16}} /> <strong style={{color: 'var(--text-primary)'}}>Helper</strong> – 100–499 pts</div>
                <div><strong style={{color: 'var(--text-primary)', marginLeft: 20}}>Rescuer</strong> – 500–999 pts</div>
                <div><i className="fa-solid fa-star" style={{color: '#eab308', width: 16}} /> <strong style={{color: 'var(--text-primary)'}}>Animal Hero</strong> – 1000–4999 pts</div>
                <div><i className="fa-solid fa-crown" style={{color: '#f59e0b', width: 16}} /> <strong style={{color: 'var(--text-primary)'}}>Guardian Angel</strong> – 5000+ pts</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
  <div className="toast-container" />
</div>

    </>
  );
};

export default Dashboard;
