import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);

  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/home",
    "/find-groups",
    "/create-group",
    "/saved-notes",
    "/profile",
  ];

  // Apply theme to html element
  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('light', 'dark');
    
    // Add the theme class to the html element
    if (theme === 'light') {
      htmlElement.classList.add('light');
      // Also add the Tailwind dark: class to allow dark: utility classes to work
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    const initialPath = location.pathname;
    const fetchUser = async () => {
      const res = await dispatch(fetchCurrentUser());
      if (res.payload?.user) {
        const loginPaths = ["/", "/login", "/register"];
        if (loginPaths.includes(initialPath)) {
          navigate("/home");
        }
      }
    };
    fetchUser();
  }, [dispatch, navigate, location.pathname]);

  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/group");

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
