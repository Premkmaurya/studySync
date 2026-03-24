import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/common/Navbar"
import { useLocation } from "react-router-dom"

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];

  return (
    <> 
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <AppRoutes />
    </>
  )
}

export default App;
