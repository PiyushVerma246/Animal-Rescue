/* ============================================================
   AniCure - Global JavaScript Utilities
   ============================================================ */

const API_URL = 'http://localhost:5000/api';

// ---- Auth Helpers ----
const Auth = {
  getToken: () => localStorage.getItem('anicure_token'),
  getUser: () => {
    const u = localStorage.getItem('anicure_user');
    return u ? JSON.parse(u) : null;
  },
  setSession: (token, user) => {
    localStorage.setItem('anicure_token', token);
    localStorage.setItem('anicure_user', JSON.stringify(user));
  },
  clearSession: () => {
    localStorage.removeItem('anicure_token');
    localStorage.removeItem('anicure_user');
  },
  isLoggedIn: () => !!localStorage.getItem('anicure_token'),
  isNGO: () => {
    const u = Auth.getUser();
    return u && ['ngo', 'vet', 'shelter', 'admin'].includes(u.role);
  },
};

// ---- API Helper ----
const api = {
  request: async (endpoint, options = {}) => {
    const token = Auth.getToken();
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const config = { ...options, headers };
    if (config.body && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }
    if (config.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  },

  get: (endpoint) => api.request(endpoint, { method: 'GET' }),
  post: (endpoint, body) => api.request(endpoint, { method: 'POST', body }),
  put: (endpoint, body) => api.request(endpoint, { method: 'PUT', body }),
  delete: (endpoint) => api.request(endpoint, { method: 'DELETE' }),
  upload: (endpoint, formData) => api.request(endpoint, { method: 'POST', body: formData }),
};

// ---- Toast Notifications ----
const Toast = {
  container: null,

  init() {
    this.container = document.querySelector('.toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'info', duration = 4000) {
    if (!this.container) this.init();

    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span style="font-size:1.2rem">${icons[type]}</span>
      <div>
        <div style="font-size:0.9rem;font-weight:600;color:var(--text-primary)">${message}</div>
      </div>
      <button onclick="this.parentElement.remove()" style="background:transparent;color:var(--text-muted);font-size:1rem;margin-left:auto;padding:0">✕</button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success: (msg) => Toast.show(msg, 'success'),
  error: (msg) => Toast.show(msg, 'error'),
  warning: (msg) => Toast.show(msg, 'warning'),
  info: (msg) => Toast.show(msg, 'info'),
};

// ---- Loading State ----
const Loading = {
  show: (btn, text = 'Loading...') => {
    if (btn) {
      btn.dataset.originalText = btn.innerHTML;
      btn.innerHTML = `<span class="loading-spinner" style="width:16px;height:16px;border-width:2px;margin:0"></span> ${text}`;
      btn.disabled = true;
    }
  },
  hide: (btn) => {
    if (btn) {
      btn.innerHTML = btn.dataset.originalText || 'Submit';
      btn.disabled = false;
    }
  },
};

// ---- Format Helpers ----
const Format = {
  date: (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return dateStr; }
  },
  relativeTime: (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return Format.date(dateStr);
  },
  currency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  },
  capitalize: (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ') : '',
};

// ---- Status badge helper ----
const statusBadge = (status) => {
  const map = {
    'reported': ['warning', '📋 Reported'],
    'accepted': ['info', '✅ Accepted'],
    'under_treatment': ['info', '💊 Under Treatment'],
    'rescued': ['success', '🦅 Rescued'],
    'closed': ['muted', '🔒 Closed'],
    'available': ['success', '🐾 Available'],
    'adopted': ['muted', '🏠 Adopted'],
    'pending': ['warning', '⏳ Pending'],
  };
  const [type, label] = map[status] || ['muted', status];
  return `<span class="badge badge-${type}">${label}</span>`;
};

// ---- Severity badge ----
const severityBadge = (severity) => {
  const map = {
    'low': 'badge-info',
    'medium': 'badge-warning',
    'high': 'badge-danger',
    'critical': 'badge-danger',
  };
  return `<span class="badge ${map[severity] || 'badge-muted'}">${Format.capitalize(severity)}</span>`;
};

// ---- Animal emoji map ----  
const animalEmoji = {
  dog: '🐕', cat: '🐈', bird: '🦜', cow: '🐄',
  horse: '🐎', monkey: '🐒', rabbit: '🐇', other: '🦎',
};

// ---- Update Navbar Auth State ----
function updateNavbar() {
  const user = Auth.getUser();
  const loginBtn = document.getElementById('nav-login-btn');
  const dashBtn = document.getElementById('nav-dash-btn');
  const logoutBtn = document.getElementById('nav-logout-btn');
  const userNameEl = document.getElementById('nav-user-name');

  if (!loginBtn) return;

  if (user) {
    loginBtn.style.display = 'none';
    if (dashBtn) dashBtn.style.display = 'flex';
    if (logoutBtn) logoutBtn.style.display = 'flex';
    if (userNameEl) userNameEl.textContent = user.name.split(' ')[0];
    if (dashBtn) dashBtn.href = Auth.isNGO() ? 'pages/ngo-dashboard.html' : 'pages/dashboard.html';
  } else {
    loginBtn.style.display = 'flex';
    if (dashBtn) dashBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

function logout() {
  Auth.clearSession();
  window.location.href = '../index.html';
}

// Initialize toast and navbar
document.addEventListener('DOMContentLoaded', () => {
  Toast.init();
  updateNavbar();
});
