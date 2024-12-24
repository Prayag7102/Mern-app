import React from 'react';
import { useCart } from '../hooks/useCart';
import CartItem from './CartItem';

const CartCard = ({ updateSubtotal }) => {
  const { cartItems, handleRemoveItem, handleQuantityChange } = useCart(updateSubtotal);

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveItem}
        />
      ))}
    </div>
  );
};

export default CartCard;
