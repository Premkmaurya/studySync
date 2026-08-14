import React from "react";
import FloatingNavbar from "../../common/FloatingNavbar";

/**
 * Authenticated Floating Navbar Wrapper (NavSidebar)
 * Renders the compact floating pill navigation control for logged-in application routes.
 */
const NavSidebar = () => {
  return <FloatingNavbar variant="authenticated" />;
};

export default NavSidebar;
