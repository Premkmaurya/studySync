import React from 'react'
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#f6f5f4] text-[#000000] flex flex-col antialiased">
            <main className="flex-1 w-full flex flex-col overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;
