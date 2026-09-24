import React from 'react';
import { useToast } from '../../hooks/useToast';

const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`} style={{ animation: 'slideIn 0.3s ease forwards' }}>
          <span style={{ fontSize: '1.2rem' }}>{icons[toast.type]}</span>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {toast.message}
            </div>
          </div>
          <button 
            onClick={() => removeToast(toast.id)} 
            style={{ 
              background: 'transparent', 
              color: 'var(--text-muted)', 
              fontSize: '1rem', 
              marginLeft: 'auto', 
              padding: 0 
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
