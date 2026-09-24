import React from 'react';
import Navbar from './Navbar';
import ToastContainer from '../ui/ToastContainer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '68px', minHeight: '100vh', paddingBottom: '4rem' }}>
        {children}
      </main>
      <ToastContainer />
    </>
  );
};

export default MainLayout;
