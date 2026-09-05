import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/tabs/group/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authSlice";
import {
  selectGroups,
  selectJoinedGroups,
  selectSuggestedGroups,
} from "./features/groups/groupsSelectors";
import { useState } from "react";

const GroupNavigation = ({ groupId }) => {
  const joinedGroups = useSelector(selectJoinedGroups) || [];
  const allGroups = useSelector(selectGroups) || [];
  const suggestedGroups = useSelector(selectSuggestedGroups) || [];
  const reduxGroup =
    joinedGroups.find((group) => group._id === groupId) ||
    allGroups.find((group) => group._id === groupId) ||
    suggestedGroups.find((group) => group._id === groupId);

  // Use Redux group data directly. SingleGroup.jsx fetches the group from the
  // API and calls dispatch(upsertFetchedGroup(...)) which populates the store,
  // so this component does NOT need to make its own duplicate API call.
  const group = reduxGroup || null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [groupId]);

  return (
    <>
      <div className="md:hidden flex items-center justify-between px-6 py-3 bg-[#f6f5f4] border-b border-black/[0.08] sticky top-0 z-30">
        <span className="font-bold text-[16px] text-[#000000] truncate max-w-[200px]">
          {group?.name || "Workspace"}
        </span>
        <button
          onClick={() => setIsSidebarOpen((open) => !open)}
          className="p-2 rounded-[6px] text-[#111111] hover:bg-black/5"
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
      </div>
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}
      <div className="fixed md:static inset-y-0 left-0 z-50">
        <Sidebar
          group={group}
          groupId={groupId}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  );
};

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);
  const groupMatch = location.pathname.match(/^\/group\/([^/]+)/);

  const hideNavbarRoutes = [
    "/login",
    "/register"
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

  const shouldHideNavbar = location.pathname.startsWith("/group") || hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div className={groupMatch ? "min-h-screen flex flex-col md:flex-row bg-[#f6f5f4]" : ""}>
        {groupMatch && <GroupNavigation groupId={groupMatch[1]} />}
        <div className={groupMatch ? "flex-1 min-w-0" : "w-full"}>
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
