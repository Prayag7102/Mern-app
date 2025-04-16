// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getAllOrders } from "../api/Checkout";

const OrdersContext = createContext();

export const OrderProvider = ({ children }) => {
const [orders, setOrder] = useState([]);
const [loading1, setLoading] = useState(true);
const [error, setError] = useState(false);
const [totalAmount, setTotalAmount] = useState(0);


useEffect(() => {
    const fetchOrder = async () => {
        try {
            const res = await getAllOrders();
            if (res.data.success) {
                setOrder(res.data.orders);
                const total = res.data.orders.reduce((sum, order) => sum + order.totalPrice, 0);
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
    fetchOrder();
}, []);

return (
    <OrdersContext.Provider value={{ orders,totalAmount,error, setOrder, loading1 }}>
        {children}
    </OrdersContext.Provider>
);
};

export const useOrder = () => useContext(OrdersContext);
