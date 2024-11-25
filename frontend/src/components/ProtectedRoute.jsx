import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const userToken = localStorage.getItem("token");  // Regular user token
  const adminToken = localStorage.getItem("adminToken");  // Admin token


  if (isAdmin) {
    return adminToken ? children : <Navigate to="/admin/login" replace />;
  }
  return userToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
