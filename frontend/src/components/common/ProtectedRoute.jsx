import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectUser, selectIsInitializing } from "../../features/auth/authSelectors";

const ProtectedRoute = () => {
  const user = useSelector(selectUser);
  const isInitializing = useSelector(selectIsInitializing);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f6f5f4]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0075de]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
