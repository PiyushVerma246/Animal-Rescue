import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div>
  {/* ============== NAVBAR ============== */}
  {/* ============== HERO ============== */}
  <section className="hero">
    <div className="hero-bg" />
    <div className="hero-grid-overlay" />
    {/* Ambient Mesh Glows */}
    <div className="mesh-blob" style={{width: 600, height: 600, background: 'rgba(239,153,52,0.15)', top: '-150px', left: '-100px'}}>
    </div>
    <div className="mesh-blob" style={{width: 500, height: 500, background: 'rgba(30,131,197,0.16)', top: '30%', right: '5%', animationDelay: '-6s'}} />
    <div className="mesh-blob" style={{width: 300, height: 300, background: 'rgba(239,153,52,0.1)', bottom: '5%', left: '25%', animationDelay: '-3s'}} />
    <div className="container">
      <div className="hero-grid-layout">
        <div className="hero-content">
          <div className="hero-badge" data-i18n="hero_badge">
            <i className="fa-solid fa-leaf" /> Real-time Animal Rescue Network
          </div>
          <h1 className="hero-title" style={{marginBottom: '1rem'}}>
            <span data-i18n="hero_title_1">Every Life</span><br /><span data-i18n="hero_title_2">Deserves a</span><br />
            <span className="highlight" data-i18n="hero_highlight">Second Chance</span>
          </h1>
          <p className="hero-subtitle" style={{marginBottom: '1.5rem'}} data-i18n="hero_subtitle">
            Report injured animals instantly. Connect with nearby NGOs, vets &amp; shelters.
            Track rescues in real-time and give abandoned animals a loving home.
          </p>
          <div className="hero-actions">
            <a href="pages/report-form.html" className="btn btn-primary btn-xl" data-i18n="hero_btn_report"><i className="fa-solid fa-truck-medical" style={{marginRight: 6}} /> Report an Animal</a>
            <a href="pages/adoption.html" className="btn btn-accent btn-xl" data-i18n="hero_btn_adopt"><i className="fa-solid fa-paw" style={{marginRight: 6}} /> Adopt a Pet</a>
          </div>
        </div>
        {/* Hero visual composite (3D Isometric Card) */}
        <style dangerouslySetInnerHTML={{__html: "\n          .hero-grid-layout {\n            display: grid;\n            grid-template-columns: 1.1fr 0.9fr;\n            gap: 4rem;\n            align-items: center;\n            min-height: calc(100vh - 68px);\n          }\n          .hero-3d-container { \n            width:100%; height:100%; display:flex; align-items:center; justify-content:flex-end; \n            perspective:1200px; \n          }\n          .hero-3d-card {\n            position:relative; width:90%; max-width:460px; height:540px; \n            transform-style:preserve-3d; \n            transform: rotateY(-18deg) rotateX(10deg) translateZ(0); \n            transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);\n            animation: float3DIdle 8s ease-in-out infinite;\n          }\n          .hero-3d-card:hover {\n            transform: rotateY(-5deg) rotateX(5deg) translateZ(20px) scale(1.02);\n            animation-play-state: paused;\n          }\n          .live-pill {\n            position:absolute;top:2.5rem;right:-3rem;background:rgba(20,24,30,0.65);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.1);padding:0.75rem 1.25rem;border-radius:100px;display:flex;align-items:center;gap:0.75rem;box-shadow:-10px 15px 35px rgba(0,0,0,0.5);transform:translateZ(80px);animation:floatCard 5s ease-in-out infinite reverse;\n          }\n          .vet-pill {\n            position:absolute;bottom:4rem;left:-3.5rem;background:rgba(20,24,30,0.65);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(30,131,197,0.3);padding:0.75rem 1.15rem;border-radius:100px;display:flex;align-items:center;gap:0.85rem;box-shadow:15px 25px 45px rgba(0,0,0,0.6);transform:translateZ(140px);animation:floatCard 6s ease-in-out infinite 1s;\n          }\n\n          @keyframes float3DIdle {\n            0%, 100% { transform: rotateY(-18deg) rotateX(10deg) translateY(0); }\n            50% { transform: rotateY(-15deg) rotateX(12deg) translateY(-15px); }\n          }\n\n          /* RESPONSIVE DESIGN FOR HERO */\n          @media (max-width: 992px) {\n            .hero-grid-layout {\n              grid-template-columns: 1fr;\n              text-align: center;\n              gap: 2rem;\n              padding-top: 5rem;\n              padding-bottom: 3rem;\n              min-height: auto;\n            }\n            .hero-content {\n              margin: 0 auto;\n            }\n            .hero-actions {\n              justify-content: center;\n            }\n            .hero-stats {\n              justify-content: center;\n              flex-wrap: wrap;\n            }\n            .hero-3d-container {\n              justify-content: center;\n              margin-top: 1rem;\n              perspective: none;\n            }\n            .hero-3d-card {\n              transform: none !important;\n              animation: floatCard 6s ease-in-out infinite !important;\n              height: 400px;\n            }\n            .hero-3d-card:hover {\n              transform: none !important;\n              animation-play-state: running;\n            }\n            .live-pill {\n              right: 1.5rem;\n              top: 1.5rem;\n              transform: none !important;\n            }\n            .vet-pill {\n              left: 1.5rem;\n              bottom: 1.5rem;\n              transform: none !important;\n            }\n          }\n          @media (max-width: 576px) {\n            .hero-3d-card {\n              height: 320px;\n              width: 95%;\n            }\n            .live-pill { right: -0.5rem; top: 1rem; transform: scale(0.85) !important; transform-origin: right top; }\n            .vet-pill { left: -0.5rem; bottom: 1rem; transform: scale(0.85) !important; transform-origin: left bottom; }\n          }\n        " }} />
        <div className="hero-3d-container">
          <div className="hero-3d-card">
            {/* Abstract glowing back-shadow layer pushed deep back */}
            <div style={{position: 'absolute', inset: '-20px', background: 'radial-gradient(circle at center, rgba(30,131,197,0.4) 0%, transparent 70%)', transform: 'translateZ(-80px)', filter: 'blur(40px)', borderRadius: '2rem'}} />
            {/* Main Glass Card Body */}
            <div style={{position: 'absolute', inset: 0, borderRadius: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '30px 40px 60px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05)', transform: 'translateZ(0)'}}>
              {/* Dark overlay for text contrast */}
              <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark), transparent 60%)', zIndex: 2, mixBlendMode: 'multiply'}} />
              <img src="assets/images/hero_dog_clean.png" alt="Rescued Happy Dog" style={{width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, position: 'relative'}} />
            </div>
            {/* Floating Live Status Pill (Pops out in 3D: translateZ(80px)) */}
            <div className="live-pill">
              <span style={{display: 'block', width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981', animation: 'pulseStatus 2s infinite'}} />
              <span style={{fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', letterSpacing: '0.04em', textTransform: 'uppercase'}}>12 Active Rescues</span>
            </div>
            {/* Floating Vet Connect Pill (Pops out further: translateZ(140px)) */}
            <div className="vet-pill">
              <div style={{width: 34, height: 34, borderRadius: '50%', background: 'rgba(30,131,197,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', border: '1px solid rgba(30,131,197,0.4)'}}>🏥</div>
              <div>
                <div style={{fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.2'}}>Vets Online</div>
                <div style={{fontSize: '0.65rem', color: 'var(--text-muted)'}}>Ready to dispatch</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ============== SERVICES WE PROVIDE ============== */}
  <style dangerouslySetInnerHTML={{__html: "\n    .services-grid .feature-card {\n      background: linear-gradient(145deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005));\n      border: 1px solid rgba(255, 255, 255, 0.04);\n      border-radius: 24px;\n      padding: 2.5rem 2rem;\n      backdrop-filter: blur(10px);\n      -webkit-backdrop-filter: blur(10px);\n      display: flex;\n      flex-direction: column;\n      justify-content: space-between;\n      height: 100%;\n    }\n\n    .services-grid .feature-icon {\n      width: 64px;\n      height: 64px;\n      border-radius: 18px;\n      font-size: 1.8rem;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      margin-bottom: 1.5rem;\n      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n    }\n\n    .services-grid .feature-card:hover .feature-icon {\n      transform: scale(1.12) rotate(6deg);\n    }\n\n    /* Individual card glows on hover */\n    .card-crisis:hover {\n      box-shadow: 0 15px 40px rgba(239, 68, 68, 0.12) !important;\n      border-color: rgba(239, 68, 68, 0.25) !important;\n    }\n\n    .card-crisis::before {\n      background: linear-gradient(90deg, transparent, #ef4444, transparent) !important;\n    }\n\n    .card-medical:hover {\n      box-shadow: 0 15px 40px rgba(59, 130, 246, 0.12) !important;\n      border-color: rgba(59, 130, 246, 0.25) !important;\n    }\n\n    .card-medical::before {\n      background: linear-gradient(90deg, transparent, #3b82f6, transparent) !important;\n    }\n\n    .card-adopt:hover {\n      box-shadow: 0 15px 40px rgba(34, 197, 94, 0.12) !important;\n      border-color: rgba(34, 197, 94, 0.25) !important;\n    }\n\n    .card-adopt::before {\n      background: linear-gradient(90deg, transparent, var(--clr-primary), transparent) !important;\n    }\n\n    .card-fund:hover {\n      box-shadow: 0 15px 40px rgba(245, 158, 11, 0.12) !important;\n      border-color: rgba(245, 158, 11, 0.25) !important;\n    }\n\n    .card-fund::before {\n      background: linear-gradient(90deg, transparent, #f59e0b, transparent) !important;\n    }\n  " }} />
  <section className="section" style={{background: 'linear-gradient(180deg, var(--bg-dark) 0%, rgba(34,197,94,0.03) 50%, var(--bg-dark) 100%)'}}>
    <div className="container">
      <div className="section-header">
        <div className="section-tag" data-i18n="services_tag"><i className="fa-solid fa-lightbulb" /> Our Offerings</div>
        <h2 className="section-title" data-i18n="services_title">Services We Provide</h2>
        <p className="section-subtitle" data-i18n="services_subtitle">Empowering communities to secure, treat, and find loving homes for animals in distress</p>
      </div>
      <div className="grid grid-4 services-grid">
        <div className="feature-card card-crisis">
          <div>
            <div className="feature-icon" style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444'}}><i className="fa-solid fa-truck-medical" /></div>
            <div className="feature-title" data-i18n="service_crisis">24/7 Crisis Reporting</div>
            <p className="feature-desc" data-i18n="service_crisis_desc">Interactive live reporting module connecting nearest users dropping precise coordinates tags for swift responses.</p>
          </div>
          <div style={{marginTop: '1.5rem'}}><a href="pages/report-form.html" style={{fontSize: '0.85rem', color: '#ef4444', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem'}} data-i18n="service_crisis_link">File Report →</a></div>
        </div>
        <div className="feature-card card-medical">
          <div>
            <div className="feature-icon" style={{background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6'}}><i className="fa-solid fa-house-medical" /></div>
            <div className="feature-title" data-i18n="service_medical">Medical Connectivity Grid</div>
            <p className="feature-desc" data-i18n="service_medical_desc">Direct interface to veterinary centers and clinics dispatching rescue professionals to critical hazards location spots.</p>
          </div>
          <div style={{marginTop: '1.5rem'}}><a href="pages/ngos.html" style={{fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem'}} data-i18n="service_medical_link">View Clinics →</a></div>
        </div>
        <div className="feature-card card-adopt">
          <div>
            <div className="feature-icon" style={{background: 'rgba(34, 197, 94, 0.1)', color: 'var(--clr-primary)'}}><i className="fa-solid fa-paw" /></div>
            <div className="feature-title" data-i18n="service_adopt">Verified Adoption Portal</div>
            <p className="feature-desc" data-i18n="service_adopt_desc">Matching rescued animals awaiting support items connecting caring owners directly to rescue networks safely.</p>
          </div>
          <div style={{marginTop: '1.5rem'}}><a href="pages/adoption.html" style={{fontSize: '0.85rem', color: 'var(--clr-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem'}} data-i18n="service_adopt_link">Browse Adoptions →</a></div>
        </div>
        <div className="feature-card card-fund">
          <div>
            <div className="feature-icon" style={{background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b'}}><i className="fa-solid fa-hand-holding-heart" /></div>
            <div className="feature-title" data-i18n="service_fund">Secured NGO Crowd-Funding</div>
            <p className="feature-desc" data-i18n="service_fund_desc">Streamlined verified payment pipelines empowering single click support systems assisting NGOs medical treatments buffers.</p>
          </div>
          <div style={{marginTop: '1.5rem'}}><a href="pages/donate.html" style={{fontSize: '0.85rem', color: '#f59e0b', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem'}} data-i18n="service_fund_link">Donate Now →</a></div>
        </div>
      </div>
    </div>
  </section>
  {/* ============== LIVE REPORTS ============== */}
  <section className="section">
    <div className="container">
      <div className="section-header">
        <div className="section-tag" data-i18n="reports_tag"><i className="fa-solid fa-location-dot" /> Live Reports</div>
        <h2 className="section-title" data-i18n="reports_title">Recent Animal Reports</h2>
        <p className="section-subtitle" data-i18n="reports_subtitle">Animals currently in need of help near you</p>
      </div>
      <div className="grid grid-3" id="recent-reports">
        {/* Will be populated by JS, showing skeleton first */}
        <div className="report-card">
          <div className="report-card-image">
            <img src="https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=600&q=80" alt="Injured Dog" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
          <div className="report-card-body">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem'}}>
              <span className="badge badge-danger">Critical</span>
              <span className="badge badge-warning"><i className="fa-solid fa-clipboard-list" style={{marginRight: 4}} /> Reported</span>
            </div>
            <div className="report-card-title">Injured Dog on Highway</div>
            <p className="report-card-desc">Adult dog found on the side of highway 4, limping and in distress. Needs
              immediate medical care.</p>
            <div className="report-card-meta">
              <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>📍 Mumbai • 15 min ago</span>
              <button type="button" onclick="openDetailsModal(0)" className="btn btn-primary btn-sm">View</button>
            </div>
          </div>
        </div>
        <div className="report-card">
          <div className="report-card-image">
            <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=80" alt="Abandoned Kittens" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
          <div className="report-card-body">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem'}}>
              <span className="badge badge-warning">Medium</span>
              <span className="badge badge-info"><i className="fa-solid fa-check" style={{marginRight: 4}} /> Accepted</span>
            </div>
            <div className="report-card-title">Abandoned Kittens</div>
            <p className="report-card-desc">Three kittens abandoned in a box near the railway station. Estimated 4-5 weeks
              old, need care.</p>
            <div className="report-card-meta">
              <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>📍 Delhi • 2 hrs ago</span>
              <button type="button" onclick="openDetailsModal(1)" className="btn btn-primary btn-sm">View</button>
            </div>
          </div>
        </div>
        <div className="report-card">
          <div className="report-card-image">
            <img src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80" alt="Injured Bird" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          </div>
          <div className="report-card-body">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem'}}>
              <span className="badge badge-info">Low</span>
              <span className="badge badge-success"><i className="fa-solid fa-dove" style={{marginRight: 4}} /> Rescued</span>
            </div>
            <div className="report-card-title">Injured Bird - Wing Fracture</div>
            <p className="report-card-desc">Parrot with injured wing found in the park. Now under treatment at PetCare
              Animal Hospital.</p>
            <div className="report-card-meta">
              <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>📍 Pune • Yesterday</span>
              <button type="button" onclick="openDetailsModal(2)" className="btn btn-primary btn-sm">View</button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <a href="pages/reports.html" className="btn btn-outline" data-i18n="reports_btn_all">View All Reports →</a>
      </div>
    </div>
  </section>
  {/* ============== REWARD SYSTEM ============== */}
  <section className="section" style={{background: 'linear-gradient(135deg, rgba(34,197,94,0.04) 0%, var(--bg-dark) 40%, var(--bg-dark) 100%)'}}>
    <div className="container">
      <div className="rewards-grid">
        {/* Left: Info */}
        <div>
          <div className="section-tag" data-i18n="rewards_tag"><i className="fa-solid fa-gift" /> Earn Rewards</div>
          <h2 className="section-title" style={{fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem'}} data-i18n="rewards_title">Be an Animal Hero &amp; Get Rewarded</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.75'}} data-i18n="rewards_desc">Every valid report you file contributes to saving a life. Track your acts of kindness on your dashboard, climb the ranks, and redeem exclusive rewards for your care.</p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem'}}>
            <div className="flex items-start gap-4" style={{background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.04)'}}>
              <div style={{background: 'rgba(34,197,94,0.1)', color: 'var(--clr-primary)', width: 45, height: 45, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0}}>
                50</div>
              <div>
                <div style={{fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem'}} data-i18n="reward_1_title">Report an Incident</div>
                <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}} data-i18n="reward_1_desc">Points given on precise markers drop verifying locations correctly.</p>
              </div>
            </div>
            <div className="flex items-start gap-4" style={{background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.04)'}}>
              <div style={{background: 'rgba(59,130,246,0.1)', color: '#3b82f6', width: 45, height: 45, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0}}>
                100</div>
              <div>
                <div style={{fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem'}} data-i18n="reward_2_title">Case Accepted by NGO</div>
                <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}} data-i18n="reward_2_desc">Extra benefits awarded after provider dispatches initial check maps schedules.</p>
              </div>
            </div>
            <div className="flex items-start gap-4" style={{background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: 16, border: '1px solid rgba(255,255,255,0.04)'}}>
              <div style={{background: 'rgba(245,158,11,0.1)', color: '#f59e0b', width: 45, height: 45, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0}}>
                250</div>
              <div>
                <div style={{fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem'}} data-i18n="reward_3_title">Successful Rescue</div>
                <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}} data-i18n="reward_3_desc">Massive boosts for continuous tracks solving critical hazards successfully.</p>
              </div>
            </div>
          </div>
          <a href="pages/report-form.html" className="btn btn-primary btn-lg" data-i18n="rewards_btn">Start Reporting <i className="fa-solid fa-paw" style={{marginLeft: 6}} /></a>
        </div>
        {/* Right: Gamified Card Preview */}
        <div style={{position: 'relative'}}>
          <div style={{position: 'absolute', top: '-20px', right: '-20px', width: 100, height: 100, background: 'var(--clr-primary-glow)', filter: 'blur(50px)', zIndex: 1}}>
          </div>
          <div className="card" style={{position: 'relative', zIndex: 2, background: 'rgba(20,28,24,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(34,197,94,0.15)', padding: '2.5rem', overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: 'linear-gradient(135deg,rgba(34,197,94,0.15),transparent)', borderBottomLeftRadius: '100%'}}>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem'}}>
              <div>
                <div style={{fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em'}} data-i18n="rewards_standing">
                  Current Standing</div>
                <div style={{fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem'}} data-i18n="rewards_tier">
                  <i className="fa-solid fa-trophy" style={{color: '#fcd34d'}} /> Silver Hero</div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600}}>Your Balance</div>
                <div style={{fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--clr-primary)'}}>
                  1,450 <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>PTS</span></div>
              </div>
            </div>
            {/* Progress Bar */}
            <div style={{marginBottom: '2.5rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem'}}>
                <span style={{color: 'var(--text-muted)'}} data-i18n="rewards_remaining">To Gold Hero Tier</span>
                <span style={{fontWeight: 700, color: 'var(--text-primary)'}} data-i18n="rewards_pts_req">550 pts remaining</span>
              </div>
              <div style={{height: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 10, overflow: 'hidden'}}>
                <div style={{width: '70%', height: '100%', background: 'linear-gradient(90deg, var(--clr-primary), var(--clr-primary-light))', borderRadius: 10, boxShadow: '0 0 15px var(--clr-primary-glow)'}}>
                </div>
              </div>
            </div>
            {/* Rewards Redeemables */}
            <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em'}} data-i18n="rewards_redeemable">
              Redeemable Rewards</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
              <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, padding: '1rem', textAlign: 'center', position: 'relative'}}>
                <div style={{fontSize: '1.75rem', marginBottom: '0.5rem', color: '#3b82f6'}}><i className="fa-solid fa-stethoscope" /></div>
                <div style={{fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.85rem', marginBottom: '0.25rem'}}>Free Vet
                  Checkup</div>
                <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem'}}>Valid at 80+ Partner Clinics
                </p>
                <span className="badge" style={{background: 'rgba(34,197,94,0.12)', color: 'var(--clr-primary)', fontSize: '0.68rem'}}>500 PTS</span>
              </div>
              <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, padding: '1rem', textAlign: 'center'}}>
                <div style={{fontSize: '1.75rem', marginBottom: '0.5rem', color: '#ef4444'}}><i className="fa-solid fa-bowl-food" /></div>
                <div style={{fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.85rem', marginBottom: '0.25rem'}}>Feed a
                  Shelter</div>
                <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem'}}>Sponsor Meals for 10 Rescues
                </p>
                <span className="badge" style={{background: 'rgba(34,197,94,0.12)', color: 'var(--clr-primary)', fontSize: '0.68rem'}}>800 PTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ============== ADOPTION PREVIEW ============== */}
  <section className="section">
    <div className="container">
      <div className="section-header">
        <div className="section-tag" data-i18n="adopt_tag"><i className="fa-solid fa-paw" /> Find Your Companion</div>
        <h2 className="section-title" data-i18n="adopt_title">Animals Ready for Adoption</h2>
        <p className="section-subtitle" data-i18n="adopt_subtitle">These beautiful souls have been rescued and rehabilitated. They're waiting for a forever home.</p>
      </div>
      {/* Search & Filter Bar */}
      <div className="adopt-filter-bar">
        <div className="adopt-filter-search">
          <span className="adopt-filter-icon"><i className="fa-solid fa-magnifying-glass" /></span>
          <input type="text" id="adopt-search" className="adopt-filter-input" placeholder="Search by name or breed..." oninput="filterAdoptionCards()" />
        </div>
        <select id="filter-species" className="adopt-filter-select" onchange="filterAdoptionCards()">
          <option value>🐾 All Species</option>
          <option value="dog">🐶 Dogs</option>
          <option value="cat">🐱 Cats</option>
          <option value="rabbit">🐰 Rabbits</option>
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
        <button className="adopt-filter-clear" onclick="clearFilters()">✕ Clear</button>
      </div>
      <div className="grid grid-4" id="adoption-grid">
        <div className="adoption-card">
          <div style={{position: 'relative'}}>
            <div style={{height: 200, overflow: 'hidden'}}>
              <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80" alt="Bruno" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="adoption-card-badge"><span className="badge badge-success">Available</span></div>
          </div>
          <div className="adoption-card-body">
            <div className="adoption-card-name">Bruno</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.82rem'}}>Labrador Mix • Male • 2 Years</div>
            <div className="adoption-tags">
              <span className="tag"><i className="fa-solid fa-syringe" style={{marginRight: 4}} /> Vaccinated</span>
              <span className="tag"><i className="fa-solid fa-heart-pulse" style={{marginRight: 4}} /> Healthy</span>
            </div>
            <button type="button" onclick="openPetModal(0)" className="btn btn-outline w-full" style={{display: 'flex', justifyContent: 'center'}}>View Details</button>
          </div>
        </div>
        <div className="adoption-card">
          <div style={{position: 'relative'}}>
            <div style={{height: 200, overflow: 'hidden'}}>
              <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80" alt="Luna" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="adoption-card-badge"><span className="badge badge-success">Available</span></div>
          </div>
          <div className="adoption-card-body">
            <div className="adoption-card-name">Luna</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.82rem'}}>Persian Mix • Female • 1 Year</div>
            <div className="adoption-tags">
              <span className="tag"><i className="fa-solid fa-syringe" style={{marginRight: 4}} /> Vaccinated</span>
              <span className="tag"><i className="fa-solid fa-scissors" style={{marginRight: 4}} /> Neutered</span>
            </div>
            <button type="button" onclick="openPetModal(1)" className="btn btn-outline w-full" style={{display: 'flex', justifyContent: 'center'}}>View Details</button>
          </div>
        </div>
        <div className="adoption-card">
          <div style={{position: 'relative'}}>
            <div style={{height: 200, overflow: 'hidden'}}>
              <img src="https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=500&q=80" alt="Max" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="adoption-card-badge"><span className="badge badge-warning">Pending</span></div>
          </div>
          <div className="adoption-card-body">
            <div className="adoption-card-name">Max</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.82rem'}}>German Shepherd • Male • 3 Years</div>
            <div className="adoption-tags">
              <span className="tag"><i className="fa-solid fa-syringe" style={{marginRight: 4}} /> Vaccinated</span>
              <span className="tag"><i className="fa-solid fa-graduation-cap" style={{marginRight: 4}} /> Trained</span>
            </div>
            <button type="button" onclick="openPetModal(2)" className="btn btn-outline w-full" style={{display: 'flex', justifyContent: 'center'}}>View Details</button>
          </div>
        </div>
        <div className="adoption-card">
          <div style={{position: 'relative'}}>
            <div style={{height: 200, overflow: 'hidden'}}>
              <img src="https://images.unsplash.com/photo-1594818032999-1b37fa3763df?auto=format&fit=crop&w=500&q=80" alt="Snowball" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="adoption-card-badge"><span className="badge badge-success">Available</span></div>
          </div>
          <div className="adoption-card-body">
            <div className="adoption-card-name">Snowball</div>
            <div style={{color: 'var(--text-muted)', fontSize: '0.82rem'}}>Rabbit • Female • 8 Months</div>
            <div className="adoption-tags">
              <span className="tag"><i className="fa-solid fa-heart-pulse" style={{marginRight: 4}} /> Healthy</span>
              <span className="tag"><i className="fa-solid fa-carrot" style={{marginRight: 4}} /> Friendly</span>
            </div>
            <button type="button" onclick="openPetModal(3)" className="btn btn-outline w-full" style={{display: 'flex', justifyContent: 'center'}}>View Details</button>
          </div>
        </div>
      </div>
      <div id="adopt-no-results" style={{display: 'none', textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)', fontSize: '1rem'}}><i className="fa-regular fa-face-frown" style={{marginRight: 6}} /> No animals match your filters. <button onclick="clearFilters()" style={{color: 'var(--clr-primary)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '1rem'}}>Clear filters</button></div>
      <div className="text-center mt-8">
        <a href="pages/adoption.html" className="btn btn-outline" data-i18n="adopt_btn_all">See All Available Animals →</a>
      </div>
    </div>
  </section>
  {/* ============== DONATE CTA ============== */}
  <section className="section">
    <div className="container">
      <div style={{background: 'linear-gradient(135deg, #0f141a 0%, #151b23 50%, #0f141a 100%)', border: '1px solid rgba(30,131,197,0.15)', borderRadius: 'var(--radius-xl)', padding: '4rem', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(30,131,197,0.05) 0%, transparent 70%)', pointerEvents: 'none'}}>
        </div>
        <div style={{fontSize: '2.8rem', marginBottom: '1rem'}}><i className="fa-solid fa-heart" style={{color: '#f97316'}} /></div>
        <h2 className="section-title" style={{marginBottom: '1rem'}} data-i18n="donate_title">Support Animal Rescue NGOs</h2>
        <p style={{color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 2rem'}} data-i18n="donate_desc">Your donation funds medical care, food, and shelter for rescued animals. Every contribution makes a life-changing difference.</p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a href="pages/donate.html" className="btn btn-primary btn-xl" data-i18n="donate_btn"><i className="fa-solid fa-hand-holding-dollar" style={{marginRight: 6}} /> Donate Now</a>
          <a href="pages/ngos.html" className="btn btn-outline btn-xl" data-i18n="donate_btn_view"><i className="fa-solid fa-house-medical" style={{marginRight: 6}} /> View NGOs</a>
        </div>
      </div>
    </div>
  </section>
  {/* ============== FOOTER ============== */}
  {/* ============== FOOTER ============== */}
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <a href="index.html" className="footer-brand">
            <img src="assets/images/logo.png" alt="AniCure Logo" style={{height: 44, objectFit: 'contain'}} />
          </a>
          <p className="footer-desc" data-i18n="footer_desc">
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
          <div className="footer-title" data-i18n="footer_platform">Platform</div>
          <div className="footer-links">
            <a href="pages/reports.html" className="footer-link">View Reports</a>
            <a href="pages/report-form.html" className="footer-link">Report Animal</a>
            <a href="pages/adoption.html" className="footer-link">Adoption</a>
            <a href="pages/donate.html" className="footer-link">Donate</a>
          </div>
        </div>
        <div>
          <div className="footer-title" data-i18n="footer_community">Community</div>
          <div className="footer-links">
            <a href="pages/ngos.html" className="footer-link">Our NGOs</a>
            <a href="pages/dashboard.html" className="footer-link">Dashboard</a>
            <a href="pages/auth.html" className="footer-link">Login / Register</a>
          </div>
        </div>
        <div>
          <div className="footer-newsletter">
            <div className="footer-title" style={{marginBottom: '0.5rem'}} data-i18n="footer_stay_updated">Stay Updated</div>
            <p style={{color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.5'}} data-i18n="footer_newsletter_hint">Get instructions, tips, and rescue alerts directly to your inbox.</p>
            <form className="newsletter-form" onsubmit="event.preventDefault(); Toast.success('Subscribed successfully!');">
              <input type="email" className="newsletter-input" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary btn-sm">Join</button>
            </form>
            <div style={{marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1rem'}}>
              <a href="pages/report-form.html" className="btn btn-danger btn-sm w-full" style={{justifyContent: 'center'}} data-i18n="footer_emerg"><i className="fa-solid fa-truck-medical" style={{marginRight: 6}} /> Report Emergency</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright">
          <span data-i18n="footer_copyright_1">© 2026 AniCure. Built with</span> <i className="fa-solid fa-heart" style={{color: '#ef4444', margin: '0 4px'}} /> <span data-i18n="footer_copyright_2">for animals everywhere.</span> <i className="fa-solid fa-paw" style={{marginLeft: 4}} />
        </div>
        <div className="footer-legal">
          <a href="#" className="footer-legal-link">Privacy Policy</a>
          <a href="#" className="footer-legal-link">Terms of Service</a>
          <a href="#" className="footer-legal-link">Support</a>
        </div>
      </div>
    </div>
  </footer>
  {/* Modal for Pet Details */}
  {/* Modal for Pet Details (Requirement met) */}
  <div id="pet-modal" style={{display: 'none', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, backdropFilter: 'blur(8px)', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'}}>
    <div id="pet-modal-container" className="card" style={{maxWidth: 800, width: '100%', background: '#111814', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, overflow: 'hidden', position: 'relative', animation: 'zoomIn 0.3s ease', display: 'grid', gridTemplateColumns: '1fr 1fr', height: 520}}>
      <button onclick="closePetModal()" style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', zIndex: 1000, cursor: 'pointer'}}>✕</button>
      {/* Left Column: Full-Height Media */}
      <div style={{height: '100%', borderRight: '1px solid rgba(255,255,255,0.04)'}}>
        <img id="p-image" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      {/* Right Column: ALL Details & Forms */}
      <div id="p-right-col" style={{padding: '2.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', overflowY: 'auto'}}>
        {/* Core Pet Identity Wrapped */}
        <div id="p-identity">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem'}}>
            <div>
              <h3 id="p-name" style={{fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.25rem', letterSpacing: '-0.02em'}}>
              </h3>
              <p id="p-breed" style={{color: 'var(--text-muted)', fontSize: '0.85rem'}} />
            </div>
            <span id="p-status" className="badge" />
          </div>
          {/* Attributes */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem'}}>
            <div style={{background: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.8rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)'}}>
              <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Age</div>
              <div id="p-age" style={{fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem'}} />
            </div>
            <div style={{background: 'rgba(255,255,255,0.02)', padding: '0.6rem 0.8rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)'}}>
              <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Gender</div>
              <div id="p-gender" style={{fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem'}} />
            </div>
          </div>
          <div id="p-tags" style={{display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem'}} />
        </div>
        {/* Step 1: Details */}
        <div id="p-step-1">
          <div style={{fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '0.88rem'}}>About this Pet
          </div>
          <p id="p-bio" style={{fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem'}} />
          <button type="button" onclick="showAdoptForm()" id="p-adopt-btn" className="btn btn-primary btn-sm w-full" style={{justifyContent: 'center', borderRadius: 10}}>Adopt Now <i className="fa-solid fa-paw" style={{marginLeft: 6}} /></button>
        </div>
        {/* Step 2: Request Form */}
        <div id="p-step-2" style={{display: 'none'}}>
          <div style={{fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '0.88rem'}}><i className="fa-solid fa-location-dot" style={{marginRight: 6}} /> Pickup
            Location</div>
          <div style={{background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 12, padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div style={{fontSize: '1.5rem'}}><i className="fa-solid fa-house-medical" /></div>
            <div style={{lineHeight: '1.4'}}>
              <div id="p-shelter-name" style={{fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.88rem'}}>Happy Paws
                NGO</div>
              <div id="p-shelter-address" style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>12, Linking Road, Bandra
                West, Mumbai</div>
            </div>
          </div>
          <form onsubmit="submitModalAdoption(event)" style={{display: 'flex', flexDirection: 'column', gap: '0.6rem'}}>
            <input type="text" id="p-form-name" placeholder="Your Name" className="form-control" style={{fontSize: '0.85rem', padding: '0.6rem', borderRadius: 8}} required />
            <input type="tel" id="p-form-phone" placeholder="Contact Number" className="form-control" style={{fontSize: '0.85rem', padding: '0.6rem', borderRadius: 8}} required />
            <textarea id="p-form-reason" placeholder="Why do you want to adopt?" className="form-control" rows={2} style={{fontSize: '0.85rem', padding: '0.6rem', borderRadius: 8, resize: 'none'}} required defaultValue={""} />
            <div style={{display: 'flex', gap: '0.75rem', marginTop: '0.3rem'}}>
              <button type="button" onclick="showAdoptDetails()" className="btn btn-outline btn-sm" style={{flex: 1}}>Back</button>
              <button type="submit" className="btn btn-primary btn-sm" style={{flex: 2, justifyContent: 'center'}}>Submit
                Request</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Details Structure */}
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <div id="details-modal" style={{display: 'none', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, backdropFilter: 'blur(8px)', alignItems: 'center', justifyContent: 'center', padding: '1.5rem'}}>
    <div id="modal-container" className="card" style={{maxWidth: 800, width: '100%', height: 450, background: '#111814', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative'}}>
      <button onclick="closeDetailsModal()" style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', zIndex: 1000, cursor: 'pointer'}}>✕</button>
      {/* Left: Image & Description */}
      <div style={{display: 'flex', flexDirection: 'column', height: '100%', borderRight: '1px solid rgba(255,255,255,0.04)'}}>
        <img id="m-image" style={{width: '100%', height: 220, objectFit: 'cover'}} />
        <div style={{padding: '1.5rem', flex: 1, overflowY: 'auto'}}>
          <div style={{display: 'flex', gap: '0.5rem', marginBottom: '0.75rem'}}>
            <span id="m-severity" className="badge" />
            <span id="m-status" className="badge badge-info" />
          </div>
          <h3 id="m-title" style={{fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem'}}>
          </h3>
          <p id="m-desc" style={{fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6'}} />
        </div>
      </div>
      {/* Right: Map */}
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <div id="mini-map" style={{flex: 1, height: '100%'}} />
        <div style={{padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center'}}>
          <a id="m-direct" href="#" target="_blank" className="btn btn-primary btn-sm w-full" style={{justifyContent: 'center'}}><i className="fa-solid fa-car" style={{marginRight: 6}} /> Get Directions on Maps</a>
        </div>
      </div>
    </div>
  </div>
  {/* ============== FLOATING SOS BUTTON ============== */}
  <div className="sos-fab" id="sos-fab" onclick="toggleSOSPanel()" aria-label="Emergency Helpline">
    <span className="sos-fab-pulse" />
    <span className="sos-fab-pulse sos-fab-pulse-2" />
    <svg className="sos-fab-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.5 8.5H20L14.5 12.5L16.5 19L12 15L7.5 19L9.5 12.5L4 8.5H10.5L12 2Z" fill="white" opacity="0.9" />
    </svg>
    <span className="sos-fab-text" id="sos-fab-icon">SOS</span>
    <span className="sos-fab-tooltip">Emergency Help</span>
  </div>
  <div className="sos-panel" id="sos-panel">
    <div className="sos-panel-banner">
      <div className="sos-panel-banner-dots" />
      <div style={{position: 'relative', zIndex: 1}}>
        <div style={{fontSize: '1.6rem', marginBottom: '0.3rem'}}><i className="fa-solid fa-truck-medical" /></div>
        <div style={{fontWeight: 900, fontSize: '1rem', letterSpacing: '0.04em'}}>EMERGENCY HELPLINE</div>
        <div style={{fontSize: '0.72rem', opacity: '0.8', marginTop: '0.15rem'}}>Tap an option below for instant help</div>
      </div>
      <button onclick="toggleSOSPanel()" className="sos-panel-close">✕</button>
    </div>
    <div className="sos-panel-body">
      <a href="tel:+1800001234" className="sos-action sos-action-call">
        <div className="sos-action-num">1</div>
        <div className="sos-action-icon-wrap sos-icon-red"><i className="fa-solid fa-phone" /></div>
        <div className="sos-action-info">
          <div className="sos-action-title">Call Helpline</div>
          <div className="sos-action-sub">1800-00-1234 • 24/7 Free</div>
        </div>
        <div className="sos-action-arrow">›</div>
      </a>
      <a href="pages/report-form.html" className="sos-action sos-action-report">
        <div className="sos-action-num">2</div>
        <div className="sos-action-icon-wrap sos-icon-amber"><i className="fa-solid fa-clipboard-list" /></div>
        <div className="sos-action-info">
          <div className="sos-action-title">Report Incident</div>
          <div className="sos-action-sub">File an emergency report</div>
        </div>
        <div className="sos-action-arrow">›</div>
      </a>
      <a href="pages/ngos.html" className="sos-action sos-action-ngo">
        <div className="sos-action-num">3</div>
        <div className="sos-action-icon-wrap sos-icon-blue"><i className="fa-solid fa-house-medical" /></div>
        <div className="sos-action-info">
          <div className="sos-action-title">Find Nearby NGO</div>
          <div className="sos-action-sub">Locate rescue centres near you</div>
        </div>
        <div className="sos-action-arrow">›</div>
      </a>
    </div>
  </div>
  {/* Toast Container */}
  <div className="toast-container" />
  <style dangerouslySetInnerHTML={{__html: "\n    @keyframes progressAnim {\n      0% {\n        width: 10%;\n      }\n\n      50% {\n        width: 60%;\n      }\n\n      100% {\n        width: 30%;\n      }\n    }\n\n    @media (max-width: 768px) {\n      #modal-container {\n        grid-template-columns: 1fr !important;\n        height: auto !important;\n        max-height: 90vh;\n        overflow-y: auto;\n      }\n\n      #mini-map {\n        height: 250px !important;\n      }\n    }\n  " }} />
  {/* Translations Dictionary */}
  <style dangerouslySetInnerHTML={{__html: "\n    /* ============================================================\n       REDESIGNED SOS — Circular FAB + Premium Panel\n    ============================================================ */\n\n    /* --- FAB Button --- */\n    .sos-fab {\n      position: fixed;\n      bottom: 2.2rem;\n      right: 2.2rem;\n      z-index: 9000;\n      width: 64px;\n      height: 64px;\n      border-radius: 50%;\n      background: conic-gradient(from 180deg, #ff2a2a, #ff6b6b, #ff2a2a);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n      user-select: none;\n      box-shadow: 0 0 0 3px rgba(255,42,42,0.25), 0 10px 32px rgba(239,68,68,0.55);\n      transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;\n    }\n    .sos-fab:hover {\n      transform: scale(1.1);\n      box-shadow: 0 0 0 5px rgba(255,42,42,0.2), 0 16px 40px rgba(239,68,68,0.65);\n    }\n    .sos-fab-svg {\n      width: 22px;\n      height: 22px;\n      filter: drop-shadow(0 1px 3px rgba(0,0,0,0.4));\n      display: none; /* using text label instead */\n    }\n    .sos-fab-text {\n      font-family: var(--font-display);\n      font-size: 1rem;\n      font-weight: 900;\n      color: #fff;\n      letter-spacing: 0.08em;\n      line-height: 1;\n      text-shadow: 0 1px 4px rgba(0,0,0,0.4);\n      transition: opacity 0.2s;\n    }\n    /* Tooltip label */\n    .sos-fab-tooltip {\n      position: absolute;\n      right: calc(100% + 12px);\n      top: 50%;\n      transform: translateY(-50%);\n      background: #1a1d24;\n      border: 1px solid rgba(239,68,68,0.25);\n      color: #f87171;\n      font-size: 0.74rem;\n      font-weight: 700;\n      white-space: nowrap;\n      padding: 0.3rem 0.7rem;\n      border-radius: 8px;\n      pointer-events: none;\n      opacity: 0;\n      transition: opacity 0.2s;\n      box-shadow: 0 4px 12px rgba(0,0,0,0.4);\n    }\n    .sos-fab:hover .sos-fab-tooltip { opacity: 1; }\n    /* Pulse rings */\n    .sos-fab-pulse {\n      position: absolute;\n      inset: 0;\n      border-radius: 50%;\n      border: 2px solid rgba(239,68,68,0.55);\n      animation: sosPulse 2.2s ease-out infinite;\n      pointer-events: none;\n    }\n    .sos-fab-pulse-2 { animation-delay: 1.1s; }\n    @keyframes sosPulse {\n      0%   { transform: scale(1);    opacity: 0.7; }\n      80%  { transform: scale(1.65); opacity: 0;   }\n      100% { transform: scale(1.65); opacity: 0;   }\n    }\n\n    /* --- SOS Panel --- */\n    .sos-panel {\n      position: fixed;\n      bottom: 8rem;\n      right: 2.2rem;\n      z-index: 8999;\n      width: 310px;\n      background: #0f1117;\n      border: 1px solid rgba(239,68,68,0.18);\n      border-radius: 22px;\n      overflow: hidden;\n      box-shadow: 0 24px 70px rgba(0,0,0,0.7), 0 0 0 1px rgba(239,68,68,0.06);\n      transform: translateY(16px) scale(0.96);\n      opacity: 0;\n      pointer-events: none;\n      transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);\n    }\n    .sos-panel.open {\n      transform: translateY(0) scale(1);\n      opacity: 1;\n      pointer-events: all;\n    }\n    /* Red gradient header banner */\n    .sos-panel-banner {\n      position: relative;\n      background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #b91c1c 100%);\n      padding: 1.1rem 1.25rem 1rem;\n      color: #fff;\n      overflow: hidden;\n    }\n    .sos-panel-banner-dots {\n      position: absolute;\n      inset: 0;\n      background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px);\n      background-size: 12px 12px;\n    }\n    .sos-panel-close {\n      position: absolute;\n      top: 0.85rem;\n      right: 0.85rem;\n      background: rgba(255,255,255,0.12);\n      border: 1px solid rgba(255,255,255,0.15);\n      color: rgba(255,255,255,0.7);\n      border-radius: 50%;\n      width: 26px;\n      height: 26px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 0.7rem;\n      cursor: pointer;\n      transition: background 0.2s, color 0.2s;\n      z-index: 2;\n    }\n    .sos-panel-close:hover { background: rgba(255,255,255,0.22); color: #fff; }\n    /* Panel body */\n    .sos-panel-body {\n      display: flex;\n      flex-direction: column;\n      gap: 0;\n      padding: 0.5rem 0.75rem 0.75rem;\n    }\n    .sos-action {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.7rem 0.65rem;\n      border-radius: 14px;\n      border: 1px solid transparent;\n      text-decoration: none;\n      transition: background 0.18s, border-color 0.18s, transform 0.18s;\n      position: relative;\n    }\n    .sos-action + .sos-action { border-top: 1px solid rgba(255,255,255,0.04); border-radius: 0; }\n    .sos-action:first-child { border-radius: 14px 14px 0 0; }\n    .sos-action:last-child  { border-radius: 0 0 14px 14px; }\n    .sos-action:hover { background: rgba(255,255,255,0.04); transform: translateX(3px); }\n    /* Step number badge */\n    .sos-action-num {\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      background: rgba(255,255,255,0.06);\n      border: 1px solid rgba(255,255,255,0.1);\n      color: var(--text-muted);\n      font-size: 0.68rem;\n      font-weight: 800;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      flex-shrink: 0;\n    }\n    /* Icon pill */\n    .sos-action-icon-wrap {\n      width: 38px;\n      height: 38px;\n      border-radius: 12px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 1.2rem;\n      flex-shrink: 0;\n    }\n    .sos-icon-red   { background: rgba(239,68,68,0.15);  }\n    .sos-icon-amber { background: rgba(239,153,52,0.15); }\n    .sos-icon-blue  { background: rgba(30,131,197,0.15); }\n    .sos-action-info { flex: 1; }\n    .sos-action-title { font-size: 0.87rem; font-weight: 700; color: var(--text-primary); }\n    .sos-action-sub   { font-size: 0.72rem; color: var(--text-muted); margin-top: 1px; }\n    .sos-action-arrow {\n      font-size: 1.3rem;\n      color: var(--text-muted);\n      line-height: 1;\n      transition: transform 0.18s, color 0.18s;\n    }\n    .sos-action:hover .sos-action-arrow { transform: translateX(3px); color: var(--text-secondary); }\n\n    /* ---- Adoption Filter Bar ---- */\n    .adopt-filter-bar {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      background: rgba(255,255,255,0.025);\n      border: 1px solid rgba(255,255,255,0.06);\n      border-radius: 16px;\n      padding: 0.75rem 1rem;\n      margin-bottom: 2rem;\n      flex-wrap: wrap;\n    }\n    .adopt-filter-search {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex: 1;\n      min-width: 180px;\n      background: rgba(255,255,255,0.04);\n      border: 1px solid rgba(255,255,255,0.07);\n      border-radius: 10px;\n      padding: 0.4rem 0.75rem;\n    }\n    .adopt-filter-icon { font-size: 0.9rem; color: var(--text-muted); }\n    .adopt-filter-input {\n      background: none;\n      border: none;\n      color: var(--text-primary);\n      font-size: 0.88rem;\n      width: 100%;\n      font-family: var(--font-sans);\n    }\n    .adopt-filter-input::placeholder { color: var(--text-muted); }\n    .adopt-filter-select {\n      background: rgba(255,255,255,0.04);\n      border: 1px solid rgba(255,255,255,0.07);\n      border-radius: 10px;\n      color: var(--text-secondary);\n      padding: 0.4rem 0.75rem;\n      font-size: 0.82rem;\n      font-family: var(--font-sans);\n      cursor: pointer;\n      transition: border-color 0.2s;\n    }\n    .adopt-filter-select:focus { border-color: var(--clr-primary); outline: none; }\n    .adopt-filter-clear {\n      background: rgba(239,68,68,0.08);\n      border: 1px solid rgba(239,68,68,0.15);\n      color: #f87171;\n      border-radius: 10px;\n      padding: 0.4rem 0.85rem;\n      font-size: 0.82rem;\n      font-weight: 700;\n      cursor: pointer;\n      transition: background 0.2s;\n    }\n    .adopt-filter-clear:hover { background: rgba(239,68,68,0.18); }\n  " }} />
</div>

    </>
  );
};

export default Home;
