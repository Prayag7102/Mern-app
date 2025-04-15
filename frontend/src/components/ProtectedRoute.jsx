import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/user.context";

const ProtectedRoute = ({ children }) => {
  const { user, loading1 } = useUser();
  

  if (loading1) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
