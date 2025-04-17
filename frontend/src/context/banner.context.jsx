// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { getBanners } from "../api/Banner";

const BannerContext = createContext();

export const BannerProvider = ({ children }) => {
const [banner, setBanner] = useState([]);
const [loading1, setLoading] = useState(true);

    const fetchbanners = async () => {
        try {
        const res = await getBanners();
        console.log(res.data);
        
        if (res?.data && res.data?.banners) {
            setBanner(res.data.banners);
        } else {
            setBanner(null);
        }
        } catch (error) {
            setBanner(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchbanners();
    }, []);



return (
    <BannerContext.Provider value={{ banner, setBanner,fetchbanners, loading1 }}>
        {children}
    </BannerContext.Provider>
);
};

export const useBanner = () => useContext(BannerContext);
