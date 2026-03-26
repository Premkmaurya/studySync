import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/common/Navbar"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const hideNavbarRoutes = [
    "/login", 
    "/register", 
    "/home", 
    "/find-groups", 
    "/create-group", 
    "/saved-notes", 
    "/profile"
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const res = dispatch(fetchCurrentUser());
      console.log(res);
      if(res.payload.user) {
        navigate("/home");
      }
    }
    fetchUser();
  }, []);

  const shouldHideNavbar = 
    hideNavbarRoutes.includes(location.pathname) || 
    location.pathname.startsWith("/group");

  return (
    <> 
      {!shouldHideNavbar && <Navbar />}
      <AppRoutes />
    </>
  )
}

export default App;
