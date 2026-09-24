import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <>
      <div>
  {/* ============================================================
 LOADING SCREEN
 ============================================================ */}
  <div id="loading-screen">
    <div className="loading-particles" id="loading-particles" />
    <div className="loading-paw">🐾</div>
    <div style={{textAlign: 'center'}}>
      <div className="loading-logo">ANI<span>CURE</span></div>
    </div>
    <div className="loading-subtitle">Loading Story…</div>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'}}>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" id="loading-bar" />
      </div>
      <div className="loading-pct" id="loading-pct">0%</div>
    </div>
  </div>
  {/* ============================================================
 NAVBAR — wrapped in a slide container so GSAP can
 animate translateY without breaking the CSS centerX
 ============================================================ */}
  <div id="navbar-wrap">
  </div>
  {/* ============================================================
 STORY WRAPPER — 8500px scroll canvas
 ============================================================ */}
  <div id="story-wrapper">
    <div id="story-sticky">
      <canvas id="story-canvas" />
      <div id="gradient-overlay" />
      <div id="caption-layer">
        <div className="caption" id="caption-1">
          <div className="caption-text">Every life deserves <span className="caption-accent">another chance.</span></div>
        </div>
        <div className="caption" id="caption-2">
          <div className="caption-text">No one stopped.</div>
        </div>
        <div className="caption" id="caption-3">
          <div className="caption-text">One report <span className="caption-accent">changed everything.</span></div>
        </div>
        <div className="caption" id="caption-4">
          <div className="caption-text">AI connected <span className="caption-accent">help instantly.</span></div>
        </div>
        <div className="caption" id="caption-5">
          <div className="caption-text">Care. Rescue. <span className="caption-accent">Recovery.</span></div>
        </div>
        <div className="caption" id="caption-6">
          <div className="caption-text">Welcome to <span className="caption-accent">AniCure.</span></div>
        </div>
      </div>
      <div id="initial-buttons">
        <div className="btn-row">
          <button className="btn-glass btn-glass-primary" id="btn-explore-skip">
            <i className="fa-solid fa-compass" style={{fontSize: '0.9rem'}} />
            Explore Website
          </button>
          <button className="btn-glass btn-glass-secondary" id="btn-begin-story">
            <i className="fa-solid fa-play" style={{fontSize: '0.75rem'}} />
            Begin Story
          </button>
        </div>
        <div className="scroll-hint">
          <div className="scroll-hint-line" />
          <span>scroll to begin</span>
        </div>
      </div>
    </div>
  </div>
  {/* ============================================================
 EXPLORE CTA — fixed, appears at ~85%
 ============================================================ */}
  <div id="explore-cta">
    <button id="explore-cta-btn">
      <span>Enter AniCure</span>
      <span className="cta-icon"><i className="fa-solid fa-arrow-right" /></span>
    </button>
  </div>
  {/* ============================================================
 CINEMATIC TRANSITION OVERLAY
 ============================================================ */}
  <div id="cinematic-overlay" />
  {/* ============================================================
 FOOTER — hidden until Explore transition completes
 ============================================================ */}
  <footer className="footer" id="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <a href="intro.html" onclick="sessionStorage.removeItem('intro_seen')" className="footer-brand">
            <img src="assets/images/logo.png" alt="AniCure Logo" style={{height: 44, objectFit: 'contain'}} />
          </a>
          <p className="footer-desc">
            A real-time animal rescue and care platform connecting helpers, NGOs, vets, and shelters to save more lives every day.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            <a href="#" className="social-link" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a>
            <a href="#" className="social-link" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
          </div>
        </div>
        <div>
          <div className="footer-title">Platform</div>
          <div className="footer-links">
            <a href="pages/reports.html" className="footer-link">View Reports</a>
            <a href="pages/report-form.html" className="footer-link">Report Animal</a>
            <a href="pages/adoption.html" className="footer-link">Adoption</a>
            <a href="pages/donate.html" className="footer-link">Donate</a>
          </div>
        </div>
        <div>
          <div className="footer-title">Community</div>
          <div className="footer-links">
            <a href="pages/ngos.html" className="footer-link">Our NGOs</a>
            <a href="pages/dashboard.html" className="footer-link">Dashboard</a>
            <a href="pages/auth.html" className="footer-link">Login / Register</a>
          </div>
        </div>
        <div>
          <div className="footer-newsletter">
            <div className="footer-title" style={{marginBottom: '0.5rem'}}>Stay Updated</div>
            <p style={{color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.5'}}>Get tips and rescue alerts directly to your inbox.</p>
            <form className="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed!');">
              <input type="email" className="newsletter-input" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary btn-sm">Join</button>
            </form>
            <div style={{marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem'}}>
              <a href="pages/report-form.html" className="btn btn-danger btn-sm" style={{display: 'inline-flex', justifyContent: 'center', width: '100%', textAlign: 'center'}}>
                <i className="fa-solid fa-truck-medical" style={{marginRight: 6}} /> Report Emergency
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2026 AniCure. Built with <i className="fa-solid fa-heart" style={{color: '#ef4444', margin: '0 4px'}} /> for animals everywhere. <i className="fa-solid fa-paw" style={{marginLeft: 4}} />
        </div>
        <div className="footer-legal">
          <a href="#" className="footer-legal-link">Privacy Policy</a>
          <a href="#" className="footer-legal-link">Terms of Service</a>
          <a href="#" className="footer-legal-link">Support</a>
        </div>
      </div>
    </div>
  </footer>
  {/* App JS for auth */}
</div>

    </>
  );
};

export default Intro;
