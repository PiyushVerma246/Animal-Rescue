import React from 'react';
import { Link } from 'react-router-dom';

const Donate = () => {
  return (
    <>
      <div>
  <main style={{paddingTop: 68, minHeight: '100vh', paddingBottom: '4rem'}}>
    {/* Hero */}
    <div style={{background: 'linear-gradient(135deg,#0d2010,#142018)', borderBottom: '1px solid var(--border)', padding: '3.5rem 0', textAlign: 'center'}}>
      <div className="container">
        <div className="section-tag" style={{display: 'inline-flex', marginBottom: '1rem'}}>💚 Make a Difference</div>
        <h1 className="section-title" style={{marginBottom: '0.75rem'}}>Support <span>Animal Rescue NGOs</span></h1>
        <p style={{color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 2rem'}}>Your donation funds emergency medical care, food, shelter, and rehabilitation for injured and abandoned animals.</p>
        <div style={{display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap'}}>
          <div><div style={{fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)'}}>₹24L+</div><div style={{fontSize: '0.82rem', color: 'var(--text-muted)'}}>Donations raised</div></div>
          <div style={{width: 1, background: 'var(--border)'}} />
          <div><div style={{fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)'}}>183</div><div style={{fontSize: '0.82rem', color: 'var(--text-muted)'}}>NGOs supported</div></div>
          <div style={{width: 1, background: 'var(--border)'}} />
          <div><div style={{fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)'}}>2,847</div><div style={{fontSize: '0.82rem', color: 'var(--text-muted)'}}>Animals saved</div></div>
        </div>
      </div>
    </div>
    <div className="container" style={{paddingTop: '3rem'}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start'}}>
        {/* NGO List */}
        <div>
          <h2 style={{fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem'}}>Choose an Organization to Support</h2>
          <div id="ngo-list" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}><div className="loading-spinner" /></div>
          </div>
        </div>
        {/* Donation Form */}
        <div className="sticky-top">
          <div className="card" style={{padding: '2rem'}} id="donation-form-card">
            <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem'}}>💰 Make a Donation</h3>
            <div id="selected-ngo-info" style={{background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)'}}>
              ← Select an NGO from the list
            </div>
            <input type="hidden" id="selected-ngo-id" />
            {/* Amount Presets */}
            <div className="form-group">
              <label className="form-label">Donation Amount</label>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem', marginBottom: '0.75rem'}}>
                <button type="button" className="btn btn-ghost btn-sm amount-btn" onclick="setAmount(100, this)">₹100</button>
                <button type="button" className="btn btn-primary btn-sm amount-btn" onclick="setAmount(500, this)">₹500</button>
                <button type="button" className="btn btn-ghost btn-sm amount-btn" onclick="setAmount(1000, this)">₹1K</button>
                <button type="button" className="btn btn-ghost btn-sm amount-btn" onclick="setAmount(5000, this)">₹5K</button>
              </div>
              <input type="number" className="form-control" id="donation-amount" placeholder="Or enter custom amount" min={1} defaultValue={500} />
            </div>
            <div className="form-group">
              <label className="form-label">Message (Optional)</label>
              <textarea className="form-control" id="donation-message" rows={2} placeholder="Leave an encouraging message for the NGO..." defaultValue={""} />
            </div>
            <div style={{background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 'var(--radius-md)', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)'}}>
              🔒 Secure payment powered by Stripe. Your card details are never stored.
            </div>
            <button onclick="processDonation()" className="btn btn-primary w-full btn-lg" style={{justifyContent: 'center'}} id="donate-btn">
              💚 Donate Now
            </button>
            <div style={{textAlign: 'center', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)'}}>
              100% of your donation goes to the selected NGO
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <div className="toast-container" />
  <style dangerouslySetInnerHTML={{__html: "\n  @media (max-width: 768px) {\n    [style*=\"grid-template-columns:1fr 380px\"] { grid-template-columns: 1fr !important; }\n    .sticky-top { position: static; }\n  }\n" }} />
</div>

    </>
  );
};

export default Donate;
