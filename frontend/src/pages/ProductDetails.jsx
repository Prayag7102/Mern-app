import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { addToCart } from "../api/cart";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        toast.error("Error fetching product details.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      toast.success("Product added to cart successfully!", {
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to add product to cart.");
    }
  };

  if (!product) return <div className="flex justify-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="rounded-lg shadow-md max-h-96 object-contain"
          />
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-500">Brand: <span className="font-semibold">{product.brand}</span></p>
          <div className="flex items-center space-x-4">
            <p className="text-2xl font-bold text-red-600">Rs. {product.discountedPrice}</p>
            <p className="text-lg text-gray-400 line-through">Rs. {product.price}</p>
          </div>
          <p className="text-gray-700">{product.description}</p>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Features:</h3>
            <ul className="list-disc list-inside text-gray-600">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Specifications:</h3>
            <p className="text-sm text-gray-500">Weight: {product.specifications?.weight}</p>
            <p className="text-sm text-gray-500">Dimensions: {product.specifications?.dimensions}</p>
            <p className="text-sm text-gray-500">Material: {product.specifications?.material}</p>
            <p className="text-sm text-gray-500">Other: {product.specifications?.other}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div key={review._id} className="border-b py-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{review.user.name}</p>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
              <p className="text-gray-700 mt-1">{review.comment}</p>
              <div className="flex items-center mt-1">
                {"★".repeat(review.rating).padEnd(5, "☆").split("").map((star, idx) => (
                  <span key={idx} className={star === "★" ? "text-yellow-500" : "text-gray-400"}>
                    {star}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
