import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavSidebar from './NavSidebar';

export default function MainLayout() {
  const location = useLocation();
  const isGroupRoute = location.pathname.startsWith('/group');

  return (
    <div className="min-h-screen bg-[#f6f5f4] text-[#000000] flex flex-col antialiased">
      {/* Top Navigation Header for App Pages */}
      {!isGroupRoute && <NavSidebar />}

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
