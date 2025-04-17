// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
const [admin, setAdmin] = useState(null);
const [loading1, setLoading] = useState(true);

useEffect(() => {
    const fetchUser = async () => {
    try {
    const res = await axiosInstance.get("/admin/admin-check", {
        withCredentials: true,
    });
    if (res.data?.success && res.data?.admin) {
        setAdmin(res.data.admin);
    } else {
        setAdmin(null);
    }
    } catch (error) {
        setAdmin(null);
    } finally {
        setLoading(false);
    }
    };

    fetchUser();
}, []);

return (
    <AdminContext.Provider value={{ admin, setAdmin, loading1 }}>
        {children}
    </AdminContext.Provider>
);
};

export const useAdmin = () => useContext(AdminContext);
