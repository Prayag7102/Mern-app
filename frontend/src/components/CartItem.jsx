import React from 'react';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <Link to={`/products/${item.product._id}`}>
        <img
          src={item.product.image ? `https://ecommerce-backend-uqpq.onrender.com/uploads/${item.product.image}` : '/path/to/default-image.jpg'}
          alt={item.product.name}
          className="w-full rounded-lg sm:w-40"
        />
      </Link>
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{item.product.name}</h2>
          <p className="mt-1 text-xs text-gray-700">{item.product.description}</p>
          <p className="mt-1 font-bold text-xs flex items-center gap-2 text-blue-900">
            Color: 
            <span 
              className="inline-block w-4 h-4 rounded-full" 
              style={{ backgroundColor: item.color }} 
              aria-label={`Color: ${item.color}`} 
            />
          </p>
          <p className="mt-1 font-bold text-xs text-blue-900">Size: {item.size}</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <QuantityControl 
            quantity={item.quantity}
            onDecrease={() => onQuantityChange(item._id, item.product._id, -1)}
            onIncrease={() => onQuantityChange(item._id, item.product._id, 1)}
          />
          <PriceSection 
            price={item.product.discountedPrice}
            quantity={item.quantity}
            onRemove={() => onRemove(item._id, item.product._id)}
          />
        </div>
      </div>
    </div>
  );
};

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => (
  <div className="flex items-center border-gray-100">
    <button
      onClick={onDecrease}
      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
    >
      -
    </button>
    <input
      className="h-8 w-8 border bg-white text-center text-xs outline-none"
      type="number"
      value={quantity}
      min={1}
      readOnly
    />
    <button
      onClick={onIncrease}
      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
    >
      +
    </button>
  </div>
);

const PriceSection = ({ price, quantity, onRemove }) => (
  <div className="flex items-center space-x-4">
    <div>
      <p className="text-sm">Rs. {price}</p>
      <p className="text-lg mt-3">Total: Rs.{price * quantity}</p>
    </div>
    <button onClick={onRemove} className="remove_btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

export default CartItem; 