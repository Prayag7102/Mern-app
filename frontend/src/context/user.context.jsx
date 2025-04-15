// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading1, setLoading] = useState(true);

useEffect(() => {
    const fetchUser = async () => {
    try {
    const res = await axiosInstance.get("/users/user-check", {
        withCredentials: true,
    });
    if (res.data.success) {
        setUser(res.data.user);
    } else {
        setUser(null);
    }
    } catch (error) {
        setUser(null);
    } finally {
        setLoading(false);
    }
    };

    fetchUser();
}, []);

return (
    <UserContext.Provider value={{ user, setUser, loading1 }}>
        {children}
    </UserContext.Provider>
);
};

export const useUser = () => useContext(UserContext);
