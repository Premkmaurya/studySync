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

  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const getLuminance = (color) => {
    if (!color || color === "transparent") return null;

    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!rgbMatch) return null;

    const [, r, g, b] = rgbMatch.map(Number);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const updateCursorTextState = (x, y) => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;

    const el = document.elementFromPoint(x, y);
    if (!el) {
      cursor.classList.remove("cursor--light");
      cursor.classList.remove("cursor--dark");
      cursor.style.backgroundColor = "#111";
      return;
    }

    const ignored = el.closest("[data-cursor-ignore]");
    if (ignored) {
      cursor.classList.remove("cursor--light");
      cursor.classList.remove("cursor--dark");
      cursor.style.backgroundColor = "#111";
      return;
    }

    const excluded = el.closest("button, input, textarea, select, option, [role='button'], svg, canvas, img, [data-cursor-ignore]");
    if (excluded) {
      cursor.classList.remove("cursor--light");
      cursor.classList.remove("cursor--dark");
      cursor.style.backgroundColor = "#111";
      return;
    }

    const directTextElement = el.closest("[data-cursor-text]");
    const textSelector = "h1, h2, h3, h4, h5, h6, p, span, small, strong, em, label, blockquote, li, a";
    const textTarget = directTextElement || el.closest(textSelector);

    if (!textTarget) {
      cursor.classList.remove("cursor--light");
      cursor.classList.remove("cursor--dark");
      cursor.style.backgroundColor = "#111";
      return;
    }

    const textContent = textTarget.textContent?.trim();
    const style = window.getComputedStyle(textTarget);
    const visible =
      !!textContent &&
      style.visibility !== "hidden" &&
      style.display !== "none" &&
      Number.parseFloat(style.opacity || "1") > 0 &&
      textTarget.getClientRects().length > 0 &&
      textTarget.getBoundingClientRect().width > 0 &&
      textTarget.getBoundingClientRect().height > 0;

    if (!visible) {
      cursor.classList.remove("cursor--light");
      cursor.classList.remove("cursor--dark");
      cursor.style.backgroundColor = "#111";
      return;
    }

    const color = style.color || "rgb(0, 0, 0)";
    const luminance = getLuminance(color);

    if (luminance === null) {
      cursor.classList.remove("cursor--light");
      cursor.classList.remove("cursor--dark");
      cursor.style.backgroundColor = "#111";
      return;
    }

    if (luminance < 128) {
      cursor.classList.add("cursor--light");
      cursor.classList.remove("cursor--dark");
      cursor.style.backgroundColor = "#fff";
    } else {
      cursor.classList.remove("cursor--light");
      cursor.classList.add("cursor--dark");
      cursor.style.backgroundColor = "#111";
    }
  };

  let mouseX = 9999;
  let mouseY = 9999;

  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateCursorTextState(mouseX, mouseY);
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
