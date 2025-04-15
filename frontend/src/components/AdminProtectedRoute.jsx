import React from "react";
import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/admin.context";

const AdminProtected = ({ children }) => {
  const { admin, loading1 } = useAdmin();


  console.log(admin);
  

  if (loading1) return <div>Loading...</div>;

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminProtected;