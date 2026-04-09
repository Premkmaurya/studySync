import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavSidebar from './NavSidebar';

export default function MainLayout() {
  const location = useLocation();
  const isGroupRoute = location.pathname.startsWith('/group');

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      {!isGroupRoute && <NavSidebar />}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto" style={{ WebkitTransform: 'translate3d(0,0,0)', willChange: 'scroll-position' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
