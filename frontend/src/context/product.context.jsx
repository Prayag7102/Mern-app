// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../api/products";

const ProductContext = createContext();

export const ProductsProvider = ({ children }) => {
const [products, setProducts] = useState(null);
const [loading1, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
        const res = await getProducts();
        if (res) {
            setProducts(res);
        } else {
            setProducts(null);
        }
        } catch (error) {
            setProducts(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
return (
    <ProductContext.Provider value={{ products, setProducts,fetchProducts, loading1 }}>
        {children}
    </ProductContext.Provider>
);
};

export const useProducts = () => useContext(ProductContext);
