// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getAllOrders } from "../api/Checkout";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrder] = useState([]);
    const [loading1, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const fetchOrders = async () => {
    try {
    const res = await getAllOrders();
    if (res.data.success) {
        setOrder(res.data.orders);
        const total = res.data.orders.reduce(
            (sum, order) => sum + order.totalPrice,
            0
        );
        setTotalAmount(total);
    } else {
        setOrder([]);
        setTotalAmount(0);
        }
    } catch (error) {
        setOrder([]);
        setTotalAmount(0);
        setError(true);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

return (
    <OrderContext.Provider
        value={{ orders, setOrder,fetchOrders, totalAmount, loading1, error }}
    >
        {children}
    </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);
