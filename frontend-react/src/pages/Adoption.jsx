import React from 'react';
import { Link } from 'react-router-dom';

const Adoption = () => {
  return (
    <>
      <div>
  <main style={{paddingTop: 68, minHeight: '100vh', paddingBottom: '4rem'}}>
    {/* Hero */}
    <div style={{background: 'linear-gradient(135deg,#0d2010,#142018)', borderBottom: '1px solid var(--border)', padding: '3.5rem 0'}}>
      <div className="container" style={{textAlign: 'center'}}>
        <div className="section-tag" style={{display: 'inline-flex', marginBottom: '1rem'}}>🐾 Adoption Center</div>
        <h1 className="section-title" style={{marginBottom: '0.75rem'}}>Find Your <span>Forever Friend</span></h1>
        <p style={{color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto'}}>Every animal listed here has been rescued and rehabilitated. They deserve a loving home – maybe yours!</p>
      </div>
    </div>
    <div className="container" style={{paddingTop: '2.5rem'}}>
      {/* Full Search & Filter Bar from Homepage */}
      <div className="adopt-filter-bar">
        <div className="adopt-filter-search">
          <span className="adopt-filter-icon"><i className="fa-solid fa-magnifying-glass" /></span>
          <input type="text" id="adopt-search" className="adopt-filter-input" placeholder="Search by name or breed..." oninput="filterAdoptionCards()" />
        </div>
        <select id="filter-species" className="adopt-filter-select" onchange="filterAdoptionCards()">
          <option value>🐾 All Species</option>
          <option value="dog">🐶 Dogs</option>
          <option value="cat">🐱 Cats</option>
          <option value="bird">🦜 Birds</option>
          <option value="rabbit">🐰 Rabbits</option>
          <option value="other">🦎 Other</option>
        </select>
        <select id="filter-gender" className="adopt-filter-select" onchange="filterAdoptionCards()">
          <option value>⚥ All Genders</option>
          <option value="male">♂ Male</option>
          <option value="female">♀ Female</option>
        </select>
        <select id="filter-status" className="adopt-filter-select" onchange="filterAdoptionCards()">
          <option value>✅ All Status</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
        </select>
        <button className="adopt-filter-clear" onclick="clearFilters()"><i className="fa-solid fa-xmark" style={{marginRight: 4}} /> Clear</button>
      </div>
      <div style={{textAlign: 'right', marginBottom: '1rem'}}>
        <span id="adoption-count" style={{fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600}}>Loading...</span>
      </div>
      <div id="adoptions-grid" className="grid grid-4">
        <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)'}}>
          <div className="loading-spinner" />
          <p style={{marginTop: '1rem'}}>Loading animals...</p>
        </div>
      </div>
      <div id="adopt-no-results" style={{display: 'none', textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '1rem'}}><i className="fa-regular fa-face-frown" style={{marginRight: 6}} /> No animals match your filters. <button onclick="clearFilters()" style={{color: 'var(--clr-primary)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '1rem'}}>Clear filters</button></div>
    </div>
  </main>
  {/* Adoption Request Modal */}
  <div id="adopt-modal" className="modal-overlay" style={{display: 'none'}}>
    <div className="modal">
      <div className="modal-header">
        <h3 className="modal-title">🐾 Request Adoption</h3>
        <button className="modal-close" onclick="closeAdoptModal()">✕</button>
      </div>
      <input type="hidden" id="adopt-animal-id" />
      <div id="adopt-animal-info" style={{background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem'}} />
      <div className="form-group">
        <label className="form-label">Tell us about yourself &amp; why you'd like to adopt *</label>
        <textarea className="form-control" id="adopt-message" rows={4} placeholder="Tell us about your home environment, experience with animals, why you want to adopt this pet, etc." required defaultValue={""} />
      </div>
      <div style={{background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.83rem', color: 'var(--text-muted)'}}>
        ⚠️ The NGO/shelter will review your request. You'll receive a notification on the outcome.
      </div>
      <div style={{display: 'flex', gap: '0.75rem'}}>
        <button onclick="submitAdoptionRequest()" className="btn btn-primary flex-1" style={{justifyContent: 'center'}} id="adopt-submit-btn">Submit Request</button>
        <button onclick="closeAdoptModal()" className="btn btn-ghost">Cancel</button>
      </div>
    </div>
  </div>
  <div className="toast-container" />
</div>

    </>
  );
};

export default Adoption;
