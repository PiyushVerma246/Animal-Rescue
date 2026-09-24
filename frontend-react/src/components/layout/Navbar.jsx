import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, isAuthenticated, logout, isNGO } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path) && path !== '/';
  };

  return (
    <nav className="navbar">
      <Link to="/intro" onClick={() => sessionStorage.removeItem('intro_seen')} className="navbar-brand">
        <img src="/assets/images/logo.png" alt="AniCure Logo" style={{ height: '52px', objectFit: 'contain' }} />
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/reports" className={`nav-link ${isActive('/reports') ? 'active' : ''}`}>
            Reports
          </Link>
        </li>
        <li>
          <Link to="/adoption" className={`nav-link ${isActive('/adoption') ? 'active' : ''}`}>
            Adoption
          </Link>
        </li>
        <li>
          <Link to="/donate" className={`nav-link ${isActive('/donate') ? 'active' : ''}`}>
            Donate
          </Link>
        </li>
        <li>
          <Link to="/ngos" className={`nav-link ${isActive('/ngos') ? 'active' : ''}`}>
            NGOs
          </Link>
        </li>
      </ul>

      <div className="nav-actions">
        {/* Language Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0 0.4rem 0 0.6rem' }}>
          <i className="fa-solid fa-globe" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}></i>
          <select id="lang-select" style={{ background: 'transparent', color: 'var(--text-primary)', border: 'none', padding: '0.4rem 0.2rem 0.4rem 0.4rem', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}>
            <option value="en" style={{ background: '#1a1d24', color: '#fff' }}>EN</option>
            <option value="hi" style={{ background: '#1a1d24', color: '#fff' }}>HI</option>
          </select>
        </div>

        {!isAuthenticated ? (
          <Link to="/login" className="btn btn-outline btn-sm">
            Sign In
          </Link>
        ) : (
          <>
            <Link to={isNGO() ? '/ngo-dashboard' : '/dashboard'} className="btn btn-ghost btn-sm">
              <i className="fa-solid fa-user"></i> <span>{user?.name?.split(' ')[0] || 'User'}</span>
            </Link>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm">
              <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: '4px' }}></i> Sign Out
            </button>
          </>
        )}
        <Link to="/report-form" className="btn btn-primary btn-sm">
          <i className="fa-solid fa-truck-medical" style={{ marginRight: '4px' }}></i> Report Animal
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
