import React from 'react';
import { Link } from 'react-router-dom';

const ReportForm = () => {
  return (
    <>
      <div>
  {/* NAVBAR */}
  <main style={{paddingTop: 68, minHeight: '100vh', paddingBottom: '4rem'}}>
    <div className="container" style={{maxWidth: 800, paddingTop: '3rem'}}>
      {/* Header */}
      <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
        <div style={{width: 70, height: 70, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem'}}>🆘</div>
        <h1 className="section-title" style={{marginBottom: '0.5rem'}}>Report an <span>Injured Animal</span></h1>
        <p style={{color: 'var(--text-muted)'}}>Fill in the details below. Nearby NGOs and vets will be notified immediately.</p>
      </div>
      {/* Reward Incentive Banner */}
      <div id="reward-banner" className="card" style={{borderColor: 'rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.05)', marginBottom: '1.5rem'}}>
        <div className="flex items-center gap-3">
          <span style={{fontSize: '1.75rem'}}>🎁</span>
          <div className="flex-1">
            <div style={{fontWeight: 700, color: 'var(--text-primary)'}}>Reporting is open to everyone – no login needed!</div>
            <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 2}}>
              <span id="reward-msg-loggedin" style={{display: 'none', color: 'var(--clr-primary)'}}>✅ You're signed in! You'll earn <strong>reward points</strong> for this report.</span>
              <span id="reward-msg-guest"><a href="auth.html" style={{color: 'var(--clr-primary)', fontWeight: 600}}>Sign in or create a free account</a> to earn 🎁 reward points &amp; track your rescue impact!</span>
            </div>
          </div>
        </div>
      </div>
      <form id="report-form" className="card" style={{padding: '2.5rem'}}>
        {/* Animal Details */}
        <div style={{marginBottom: '2rem'}}>
          <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)'}}>🐾 Animal Details</h3>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="animalType">Animal Type *</label>
              <select className="form-control" id="animalType" name="animalType" required>
                <option value>Select animal type</option>
                <option value="dog">🐕 Dog</option>
                <option value="cat">🐈 Cat</option>
                <option value="bird">🦜 Bird</option>
                <option value="cow">🐄 Cow</option>
                <option value="horse">🐎 Horse</option>
                <option value="monkey">🐒 Monkey</option>
                <option value="rabbit">🐇 Rabbit</option>
                <option value="other">🦎 Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="severity">Severity Level *</label>
              <select className="form-control" id="severity" name="severity" required>
                <option value="low">🟢 Low – Needs attention</option>
                <option value="medium" selected>🟡 Medium – Injured</option>
                <option value="high">🟠 High – Serious Injury</option>
                <option value="critical">🔴 Critical – Life Threatening</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="description">Description *</label>
            <textarea className="form-control" id="description" name="description" placeholder="Describe the animal's condition, behavior, and any visible injuries. Include color, size, and any other identifying features..." rows={4} required minLength={20} defaultValue={""} />
            <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}} id="desc-count">0 / 1000 characters</span>
          </div>
        </div>
        {/* Location: Interactive Map */}
        <div style={{marginBottom: '2rem'}}>
          <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)'}}>📍 Pin the Location on the Map</h3>
          {/* Map toolbar */}
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap'}}>
            <button type="button" className="btn btn-primary btn-sm" id="get-location-btn" onclick="getLocation()">
              📡 Use My GPS Location
            </button>
            <span style={{fontSize: '0.82rem', color: 'var(--text-muted)'}}>or click anywhere on the map to drop a pin</span>
          </div>
          {/* Location status badge */}
          <div id="location-status" style={{display: 'none', alignItems: 'center', gap: '0.5rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 'var(--radius-md)', padding: '0.6rem 1rem', marginBottom: '0.75rem', fontSize: '0.85rem', color: 'var(--clr-primary)', fontWeight: 600}}>
            📍 <span id="location-status-text">Location selected</span>
          </div>
          {/* Hidden inputs for form submission */}
          <input type="hidden" id="lat" />
          <input type="hidden" id="lng" />
          {/* Leaflet Map */}
          <div id="report-map" style={{height: 360, borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden', position: 'relative'}}>
            <div id="map-loading" style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,20,12,0.85)', zIndex: 500, gap: '0.75rem'}}>
              <div className="loading-spinner" />
              <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>Loading map...</span>
            </div>
          </div>
          {/* Auto-filled address fields */}
          <div style={{marginTop: '1rem'}}>
            <div style={{fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem'}}>📝 Location Details (auto-filled from map pin)</div>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label" htmlFor="address">Address / Landmark</label>
                <input type="text" className="form-control" id="address" name="address" placeholder="Auto-filled from map" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="city">City *</label>
                <input type="text" className="form-control" id="city" name="city" placeholder="Auto-filled from map" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="state">State</label>
              <input type="text" className="form-control" id="state" name="state" placeholder="Auto-filled from map" />
            </div>
          </div>
        </div>
        {/* Image Capture (Strict Camera Only) */}
        <div style={{marginBottom: '2rem'}}>
          <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)'}}>📸 Image Verification *</h3>
          <div style={{maxWidth: 400, margin: '0 auto', textAlign: 'center'}}>
            {/* Video Stream */}
            <div style={{position: 'relative', background: '#000', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center'}} id="video-container">
              <video id="video-feed" autoPlay playsInline style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              <canvas id="canvas-capture" style={{display: 'none'}} />
              <div id="camera-loading" style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', gap: '0.75rem'}}>
                <div className="loading-spinner" />
                <span style={{color: 'var(--text-muted)', fontSize: '0.82rem'}}>Accessing camera...</span>
              </div>
            </div>
            {/* Captured Preview */}
            <div id="capture-preview-container" style={{display: 'none', marginTop: '1rem', position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--clr-primary)'}}>
              <img id="capture-preview-img" style={{width: '100%', height: 'auto', aspectRatio: '4/3', objectFit: 'cover'}} />
              <div style={{position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(34,197,94,0.9)', color: '#fff', padding: '0.25rem 0.6rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600}}>✅ Captured</div>
            </div>
            {/* Controls */}
            <div style={{marginTop: '1rem', display: 'flex', gap: '0.75rem', justifyContent: 'center'}}>
              <button type="button" className="btn btn-primary btn-sm" id="capture-btn" onclick="takePhoto()">📷 Capture Photo</button>
              <button type="button" className="btn btn-outline btn-sm" id="retake-btn" onclick="startCamera()" style={{display: 'none'}}>🔄 Retake</button>
            </div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem'}}>⚠️ Camera capture is required. Gallery uploads are disabled.</div>
          </div>
        </div>
        {/* Submit */}
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap'}}>
          <button type="submit" className="btn btn-primary btn-lg" id="submit-btn">
            🆘 Submit Report
          </button>
          <p style={{fontSize: '0.82rem', color: 'var(--text-muted)'}}>
            Your report will immediately notify nearby animal welfare organizations.
          </p>
        </div>
      </form>
      {/* Success Card (hidden) */}
      <div id="success-card" className="card" style={{display: 'none', borderColor: 'rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.05)', textAlign: 'center', padding: '3rem'}}>
        <div style={{fontSize: '4rem', marginBottom: '1rem'}}>✅</div>
        <h2 style={{fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '0.5rem'}}>Report Submitted!</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '0.5rem'}}>Your report has been submitted. Nearby NGOs and vets have been notified!</p>
        <p id="notif-count" style={{color: 'var(--clr-primary)', fontWeight: 600, marginBottom: '1rem'}} />
        {/* Guest upsell */}
        <div id="guest-upsell" style={{display: 'none', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--text-muted)'}}>
          🎁 <strong style={{color: 'var(--text-primary)'}}>Did you know?</strong> If you had been signed in, you'd earn <strong style={{color: 'var(--clr-primary)'}}>+50 reward points</strong> for this report and +100 more when the animal gets rescued!<br />
          <a href="auth.html" className="btn btn-primary btn-sm" style={{marginTop: '0.75rem', display: 'inline-flex'}}>Create Free Account →</a>
        </div>
        {/* Logged-in reward notice */}
        <div id="points-awarded" style={{display: 'none', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.88rem'}}>
          🎁 <strong style={{color: 'var(--clr-primary)'}}>+50 reward points added to your account!</strong> You'll earn another +100 when the animal is rescued.
        </div>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a href="reports.html" className="btn btn-primary">View All Reports</a>
          <button onclick="resetForm()" className="btn btn-outline">Submit Another</button>
        </div>
      </div>
    </div>
  </main>
  <div className="toast-container" />
  {/* Leaflet.js – Open Source Maps (no API key needed) */}
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</div>

    </>
  );
};

export default ReportForm;
