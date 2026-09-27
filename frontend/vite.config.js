import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        intro: 'intro.html',
        admin: 'pages/admin.html',
        adoption: 'pages/adoption.html',
        auth: 'pages/auth.html',
        dashboard: 'pages/dashboard.html',
        donate: 'pages/donate.html',
        'ngo-dashboard': 'pages/ngo-dashboard.html',
        ngos: 'pages/ngos.html',
        'report-form': 'pages/report-form.html',
        reports: 'pages/reports.html'
      }
    }
  }
});
