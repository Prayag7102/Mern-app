import React from 'react';
import Loading from './LoaderSpinner';

const OrderHistory = ({ orders, loading, navigate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No orders found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, orderIndex) => (
            <div key={orderIndex} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{order.totalPrice.toFixed(2)}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="space-y-4 mt-6">
                {order.products.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 border-b pb-4">
                    <img
                      src={`https://ecommerce-backend-uqpq.onrender.com/uploads/${item.productId.image}`}
                      alt={item.productId.name}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.productId.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="mt-1 font-bold flex items-center gap-2 text-xs text-blue-900">
                        Color:
                        <span
                          className="inline-block w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                          aria-label={`Color: ${item.color}`}
                        />
                      </p>
                      <p className="text-xs text-black">
                        <span className="font-bold">Size:</span> {item.size}
                      </p>
                      <p className="text-sm font-medium">
                        Price: ₹{(item.productId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Delivery Address</h4>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{order.address.fullName}</p>
                  <p>{order.address.addressLine1}</p>
                  {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
                  <p>
                    {order.address.city}, {order.address.state} {order.address.pinCode}
                  </p>
                  <p>Phone: {order.address.phone}</p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Payment Information</h4>
                <div className="text-sm text-gray-600">
                  <p>Method: {order.paymentMethod}</p>
                  <p className="mt-2 font-medium">Total Amount: ₹{order.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 