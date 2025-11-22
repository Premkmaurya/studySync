import React from 'react';
import { Outlet } from 'react-router-dom';
import NavSidebar from '../components/NavSidebar';

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <NavSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
