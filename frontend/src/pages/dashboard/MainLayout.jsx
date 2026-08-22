import React from 'react'
import { Outlet,useLocation } from 'react-router-dom';
import FloatingNavbar from '../../components/common/FloatingNavbar';

const MainLayout = () => {
    const location = useLocation();
    const isGroupRoute = location.pathname.startsWith('/group');
    return (
        <div className="min-h-screen bg-[#f6f5f4] text-[#000000] flex flex-col antialiased">
            {!isGroupRoute && <FloatingNavbar variant="authenticated" />}
            <main className="flex-1 w-full flex flex-col overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;
