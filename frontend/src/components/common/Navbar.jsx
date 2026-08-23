import React from "react";
import FloatingNavbar from "./FloatingNavbar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSelectors";

/**
 * Public Floating Navbar Wrapper
 * Renders the compact floating pill navigation control for public website pages.
 */
const Navbar = () => {
  const user = useSelector(selectUser);
  const location = window.location.pathname;
  return <FloatingNavbar variant={user && location.startsWith("/dashboard") ? "authenticated" : "public"} />;
};

export default Navbar;
