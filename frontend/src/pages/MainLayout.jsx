import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

/**
 * Yeh hamara main layout hai "Discord" style ke liye.
 * Yeh Sidebar ko left mein fix karta hai aur "Outlet" (jo hamara main content hai)
 * ko right mein render karta hai.
 */
export default function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Yahan top bar aa sakta hai (jaise Discord mein #doubts ke
          saath search bar hai), but abhi simple rakhte hain.
        */}
        
        {/* Yeh Outlet hi hamara "NotesEditor" ya "Groups" page render karega
          jo AppRoutes.jsx se aa raha hai.
        */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
