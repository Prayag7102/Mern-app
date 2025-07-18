// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading1, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
        const res = await axiosInstance.get("/users/user-check", {
            withCredentials: true,
        });

        if (res.data?.success && res.data?.user) {
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
    useEffect(() => {
        fetchUser();
    }, []);



return (
    <UserContext.Provider value={{ user, setUser,fetchUser, loading1 }}>
        {children}
    </UserContext.Provider>
);
};

export const useUser = () => useContext(UserContext);
