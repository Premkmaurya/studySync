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
    "/dashboard/home",
    "/dashboard/find-groups",
    "/dashboard/create-group",
    "/dashboard/notes",
    "/dashboard/profile",
  ];

  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  let mouseX = 9999;
  let mouseY = 9999;

  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let cx = mouseX;
    let cy = mouseY;
    let lastX = mouseX;
    let lastY = mouseY;

    function animate() {
      cx = lerp(cx, mouseX, 0.18);
      cy = lerp(cy, mouseY, 0.18);

      const vx = mouseX - lastX;
      const vy = mouseY - lastY;
      lastX = mouseX;
      lastY = mouseY;

      const speed = clamp(Math.hypot(vx, vy), 0, 40);
      const stretch = 1 + speed / 60;
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);

      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) rotate(${angle}deg) scaleX(${stretch}) scaleY(${1 / stretch * 0.4 + 0.6})`;

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
    const fetchUser = async () => {
      const initialPath = window.location.pathname;
      const res = await dispatch(fetchCurrentUser());
      if (fetchCurrentUser.fulfilled.match(res) && res.payload?.user) {
        const loginPaths = ["/login", "/register"];
        if (loginPaths.includes(initialPath)) {
          navigate("/dashboard/home");
        }
      }
    };

    fetchUser();
  }, [dispatch, navigate]);

  const shouldHideNavbar =location.pathname.startsWith("/group")

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
