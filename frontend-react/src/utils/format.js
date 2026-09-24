export const Format = {
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

export const statusBadge = (status) => {
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
  return map[status] || ['muted', status];
};

export const severityBadge = (severity) => {
  const map = {
    'low': 'badge-info',
    'medium': 'badge-warning',
    'high': 'badge-danger',
    'critical': 'badge-danger',
  };
  return map[severity] || 'badge-muted';
};

export const animalEmoji = {
  dog: '🐕', cat: '🐈', bird: '🦜', cow: '🐄',
  horse: '🐎', monkey: '🐒', rabbit: '🐇', other: '🦎',
};
