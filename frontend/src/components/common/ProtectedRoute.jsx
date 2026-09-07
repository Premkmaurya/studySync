import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectUser, selectIsInitializing } from "../../features/auth/authSelectors";
import { Skeleton } from "../design-system/States";

/**
 * GroupPageSkeleton
 * Rendered while auth is initialising on a /group/... route.
 * Matches the App.jsx layout exactly (sidebar + main content) so the browser
 * has LCP candidates to paint immediately instead of a blank screen.
 * Uses no heavy imports — only the existing Skeleton primitive.
 */
const GroupPageSkeleton = () => (
  <div className="min-h-screen flex flex-col md:flex-row bg-[#f6f5f4]">
    {/* Sidebar skeleton — matches Sidebar.jsx dimensions */}
    <aside className="hidden md:flex flex-col gap-6 w-64 lg:w-72 h-screen p-6 border-r border-black/[0.08] bg-[#f6f5f4] shrink-0">
      {/* Back link */}
      <Skeleton className="w-24 h-4 rounded-full" />
      {/* Group identity */}
      <div className="flex items-start gap-3 pb-4 border-b border-black/[0.08]">
        <Skeleton className="w-9 h-9 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-32 h-4 rounded" />
          <Skeleton className="w-16 h-3 rounded-full" />
        </div>
      </div>
      {/* Nav items */}
      <div className="flex flex-col gap-1">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="w-full h-9 rounded-[8px]" />
        ))}
      </div>
    </aside>

    {/* Main content skeleton */}
    <div className="flex-1 p-6 md:p-10 max-w-5xl mx-auto animate-pulse">
      <div className="flex flex-col gap-2 mb-8 pb-6 border-b border-black/[0.08]">
        <Skeleton className="w-20 h-4 rounded-full" />
        <Skeleton className="w-56 h-8 rounded-[8px]" />
        <Skeleton className="w-80 h-4 rounded-full mt-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-[12px] border border-black/[0.08] p-5 flex flex-col gap-3 min-h-[160px]">
            <Skeleton className="w-24 h-3 rounded-full" />
            <Skeleton className="w-full h-5 rounded" />
            <Skeleton className="w-3/4 h-4 rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * FullPageSpinner
 * Used for non-group protected routes (dashboard/home, profile, etc.) where we
 * do not have a known layout shape to skeleton.
 */
const FullPageSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#f6f5f4]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0075de]" />
  </div>
);

const ProtectedRoute = () => {
  const user = useSelector(selectUser);
  const isInitializing = useSelector(selectIsInitializing);
  const location = useLocation();

  if (isInitializing) {
    // Show a layout-matching skeleton for group routes so the browser paints
    // the sidebar + content shell immediately rather than a blank screen.
    // For other protected routes (dashboard, profile) show the generic spinner.
    const isGroupRoute = location.pathname.startsWith("/group/");
    return isGroupRoute ? <GroupPageSkeleton /> : <FullPageSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
