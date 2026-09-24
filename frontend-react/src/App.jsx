import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

import Home from './pages/Home';
import Intro from './pages/Intro';
import Auth from './pages/Auth';
import ReportForm from './pages/ReportForm';
import Reports from './pages/Reports';
import Adoption from './pages/Adoption';
import Donate from './pages/Donate';
import NGOs from './pages/NGOs';
import Dashboard from './pages/Dashboard';
import NGODashboard from './pages/NGODashboard';

// Import global styles (assuming they are in public/assets or src/assets)
// Since index.html has a link to /assets/css/style.css, we don't strictly need to import it here.

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          
          <Route path="/report-form" element={<ReportForm />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/ngos" element={<NGOs />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ngo-dashboard" element={<NGODashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
