import React from 'react'
import { OrderSummaryCards } from './OrderSummaryCards';
import { useOrder } from '../../../context/order.context';



const DashCards = () => {
    const { orders, totalAmount } = useOrder();
    return (
        <div>
            <OrderSummaryCards orders={orders} totalAmount={totalAmount} />
        </div>
    )
}

export default DashCards