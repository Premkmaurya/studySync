import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/common/Navbar"
import { useLocation } from "react-router-dom"

function App() {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/login", 
    "/register", 
    "/home", 
    "/find-groups", 
    "/create-group", 
    "/saved-notes", 
    "/profile"
  ];

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
