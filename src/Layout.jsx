import React from 'react';
import { Outlet } from 'react-router-dom';
import LateralNavbar from './components/LateralNavbar/index.jsx';
import './RootLayout.css';

const Layout = () => {
  return (
    <div className="root-container">
      <LateralNavbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

