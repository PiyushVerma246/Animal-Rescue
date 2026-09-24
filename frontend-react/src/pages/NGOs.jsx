import React from 'react';
import { Link } from 'react-router-dom';

const NGOs = () => {
  return (
    <>
      <div>
  <main style={{paddingTop: 68, minHeight: '100vh', paddingBottom: '4rem'}}>
    <div style={{background: 'linear-gradient(135deg,#0d2010,#142018)', borderBottom: '1px solid var(--border)', padding: '3rem 0'}}>
      <div className="container">
        <div className="section-tag" style={{display: 'inline-flex', marginBottom: '0.75rem'}}>🏥 Partner Network</div>
        <h1 className="section-title" style={{marginBottom: '0.5rem'}}>Our <span>NGO &amp; Vet Network</span></h1>
        <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>183+ verified animal welfare organizations ready to respond to emergencies in your area</p>
        <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', maxWidth: 600}}>
          <input type="text" className="form-control" id="search-query" placeholder="Search by name or city..." style={{flex: 1}} oninput="filterNGOs()" />
          <select className="form-control" id="filter-role" style={{width: 'auto'}} onchange="filterNGOs()">
            <option value>All Types</option>
            <option value="ngo">NGO</option>
            <option value="vet">Veterinarian</option>
            <option value="shelter">Shelter</option>
          </select>
          <button onclick="findNearby()" className="btn btn-primary btn-sm">📍 Find Near Me</button>
        </div>
      </div>
    </div>
    <div className="container" style={{paddingTop: '2.5rem'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'}}>
        <div style={{fontSize: '0.88rem', color: 'var(--text-muted)'}} id="result-info">Loading organizations...</div>
      </div>
      <div id="ngos-grid" className="grid grid-3">
        <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)'}}>
          <div className="loading-spinner" />
          <p style={{marginTop: '1rem'}}>Loading organizations...</p>
        </div>
      </div>
    </div>
  </main>
  <div className="toast-container" />
</div>

    </>
  );
};

export default NGOs;
