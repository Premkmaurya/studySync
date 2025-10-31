import React from 'react';
import { NavLink } from 'react-router-dom';
// Icons ke liye (react-icons install hai tere package.json mein)
import { HiDocumentText, HiUserGroup, HiCog } from 'react-icons/hi';
import { CiCirclePlus } from "react-icons/ci";
import { FaCompass,FaRegUserCircle  } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";

/**
 * Yeh hamara left sidebar hai.
 * Hum "NavLink" use kar rahe hain taaki active tab ko style kar sakein.
 */
export default function Sidebar() {
  
  // Yeh function NavLink ko batata hai ki active link ko kaise style karna hai
  const getNavLinkClass = ({ isActive }) => {
    return `
      flex items-center p-1.5 rounded-full transition-colors duration-200
      ${
        isActive
          ? 'bg-[#38383d] text-white' // Active link style
          : 'text-gray-400 hover:bg-[#38383d] hover:text-white' // Inactive link style
      }
    `;
  };

  return (
    <nav className="w-20 bg-[#121214] p-4 flex flex-col space-y-6 shadow-lg">

      <NavLink to="/" className={getNavLinkClass}>
        <img src="/img/vite.svg" className='w-10 h-10 rounded-full' />
      </NavLink>

      <NavLink to="/find-groups" className={getNavLinkClass}>
       <FaCompass className="w-10 h-10" />
      </NavLink>
      <NavLink to="/create-groups" className={getNavLinkClass}>
       <CiCirclePlus className="w-10 h-10" />
      </NavLink>

      <NavLink to="/settings" className={getNavLinkClass}>
        <HiCog className="h-9 w-9" />
      </NavLink>

      {/* User profile section (future mein) */}
      <div className="mt-auto">
      <NavLink to="/profile" className={getNavLinkClass}>
        <FaRegUserCircle className='w-9 h-9' />
      </NavLink>
      </div>
    </nav>
  );
}
