import React from 'react';
import { useCart } from '../hooks/useCart';
import CartItem from './CartItem';
import { TailSpin } from 'react-loader-spinner';

const CartCard = ({ updateSubtotal }) => {
  const { cartItems, handleRemoveItem, handleQuantityChange, loading } = useCart(updateSubtotal);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

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
