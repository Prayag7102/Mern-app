// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getCartItems } from "../api/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCartItem] = useState([]);
    const [loading1, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchCartItems = async () => {
    try {
    const res = await getCartItems();
    if (res) {
        setCartItem(res);
        
    } else {
        setCartItem([]);
        }
    } catch (error) {
        setCartItem([]);
        setError(true);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);
return (
    <CartContext.Provider
        value={{ cart, setCartItem,fetchCartItems,  loading1, error }}
    >
        {children}
    </CartContext.Provider>
    );
};

export const useCarts = () => useContext(CartContext);
