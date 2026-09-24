import React from 'react';
import { Link } from 'react-router-dom';

const Auth = () => {
  return (
    <>
      <div>
  <a href="../intro.html" onclick="sessionStorage.removeItem('intro_seen')" className="navbar-brand" style={{marginBottom: '2rem'}}>
    <div className="brand-icon">🐾</div>
    Ani<span>Cure</span>
  </a>
  <div style={{width: '100%', maxWidth: 440}}>
    {/* Tabs */}
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0.25rem', marginBottom: '1.5rem'}}>
      <button id="tab-login" onclick="switchTab('login')" className="btn" style={{borderRadius: 'calc(var(--radius-lg) - 4px)', background: 'linear-gradient(135deg,var(--clr-primary),var(--clr-primary-dark))', color: '#fff', fontSize: '0.9rem', justifyContent: 'center'}} data-i18n="auth_signin_tab">Sign In</button>
      <button id="tab-register" onclick="switchTab('register')" className="btn" style={{borderRadius: 'calc(var(--radius-lg) - 4px)', background: 'transparent', color: 'var(--text-muted)', fontSize: '0.9rem', justifyContent: 'center'}} data-i18n="auth_create_tab">Create Account</button>
    </div>
    {/* Login Form */}
    <div className="card" id="login-panel" style={{padding: '2rem'}}>
      <div style={{textAlign: 'center', marginBottom: '1.75rem'}}>
        <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>👋</div>
        <h1 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}} data-i18n="auth_welcome">Welcome back!</h1>
        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem'}} data-i18n="auth_welcome_sub">Sign in to your AniCure account</p>
      </div>
      <form id="login-form" onsubmit="handleLogin(event)">
        <div className="form-group">
          <label className="form-label" htmlFor="login-email" data-i18n="auth_email">Email Address</label>
          <input type="email" className="form-control" id="login-email" placeholder="you@example.com" required autoComplete="email" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="login-password" data-i18n="auth_password">Password</label>
          <div style={{position: 'relative'}}>
            <input type="password" className="form-control" id="login-password" placeholder="Your password" required autoComplete="current-password" style={{paddingRight: '2.5rem'}} />
            <button type="button" onclick="togglePw('login-password')" style={{position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: 'var(--text-muted)', fontSize: '1rem'}}>👁</button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full" id="login-btn" style={{justifyContent: 'center', marginTop: '0.5rem'}} data-i18n="auth_signin_btn">
          Sign In to AniCure
        </button>
      </form>
      <div style={{textAlign: 'center', marginTop: '1.25rem'}}>
        <p style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>
          <span data-i18n="auth_no_account">Don't have an account?</span> 
          <button onclick="switchTab('register')" style={{background: 'transparent', color: 'var(--clr-primary)', fontWeight: 600}} data-i18n="auth_create_free">Create one free</button>
        </p>
      </div>
      {/* Demo accounts */}
      <div style={{marginTop: '1.5rem', padding: '1rem', background: 'rgba(34,197,94,0.05)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)'}}>
        <div style={{fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem'}}>Demo Accounts</div>
        <div>User: <span style={{color: 'var(--clr-primary)'}}>user@demo.com</span> / demo1234</div>
        <div>NGO: <span style={{color: 'var(--clr-primary)'}}>ngo@demo.com</span> / demo1234</div>
      </div>
    </div>
    {/* Register Form */}
    <div className="card" id="register-panel" style={{padding: '2rem', display: 'none'}}>
      <div style={{textAlign: 'center', marginBottom: '1.75rem'}}>
        <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>🌿</div>
        <h1 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)'}} data-i18n="auth_join">Join AniCure</h1>
        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem'}} data-i18n="auth_join_sub">Create an account and start saving lives</p>
      </div>
      <form id="register-form" onsubmit="handleRegister(event)">
        <div className="form-group">
          <label className="form-label" htmlFor="reg-name" data-i18n="auth_name_lbl">Full Name *</label>
          <input type="text" className="form-control" id="reg-name" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="reg-email" data-i18n="auth_email">Email Address *</label>
          <input type="email" className="form-control" id="reg-email" placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="reg-phone">Phone Number</label>
          <input type="tel" className="form-control" id="reg-phone" placeholder="+91 98765 43210" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="reg-role" data-i18n="auth_type_lbl">Account Type *</label>
          <select className="form-control" id="reg-role" onchange="toggleOrgFields(this.value)" required>
            <option value="user">👤 Regular User</option>
            <option value="ngo">🏥 NGO / Animal Welfare Org</option>
            <option value="vet">ðŸ‘¨â€âš•ï¸ Veterinarian</option>
            <option value="shelter">🏠 Animal Shelter</option>
          </select>
        </div>
        <div id="org-fields" style={{display: 'none'}}>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-org-name">Organization Name</label>
            <input type="text" className="form-control" id="reg-org-name" placeholder="e.g., Happy Paws Foundation" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-license">License / Registration Number</label>
            <input type="text" className="form-control" id="reg-license" placeholder="e.g., NGO-2024-XXXX" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="reg-password">Password *</label>
          <div style={{position: 'relative'}}>
            <input type="password" className="form-control" id="reg-password" placeholder="Min 6 characters" required minLength={6} style={{paddingRight: '2.5rem'}} />
            <button type="button" onclick="togglePw('reg-password')" style={{position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: 'var(--text-muted)', fontSize: '1rem'}}>👁</button>
          </div>
        </div>
        {/* Password strength */}
        <div style={{display: 'flex', gap: 3, marginTop: '-0.75rem', marginBottom: '1rem'}} id="strength-bars">
          <div id="pb1" style={{height: 3, flex: 1, background: 'var(--border)', borderRadius: 2, transition: 'var(--transition)'}} />
          <div id="pb2" style={{height: 3, flex: 1, background: 'var(--border)', borderRadius: 2, transition: 'var(--transition)'}} />
          <div id="pb3" style={{height: 3, flex: 1, background: 'var(--border)', borderRadius: 2, transition: 'var(--transition)'}} />
          <div id="pb4" style={{height: 3, flex: 1, background: 'var(--border)', borderRadius: 2, transition: 'var(--transition)'}} />
        </div>
        <button type="submit" className="btn btn-primary w-full" id="register-btn" style={{justifyContent: 'center'}} data-i18n="auth_create_btn">
          Create Account 🐾
        </button>
      </form>
      <div style={{textAlign: 'center', marginTop: '1.25rem'}}>
        <p style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>Already have an account? <button onclick="switchTab('login')" style={{background: 'transparent', color: 'var(--clr-primary)', fontWeight: 600}}>Sign in</button></p>
      </div>
    </div>
  </div>
  <div className="toast-container" />
</div>

    </>
  );
};

export default Auth;
