import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/home",
    "/find-groups",
    "/create-group",
    "/saved-notes",
    "/profile",
  ];

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
