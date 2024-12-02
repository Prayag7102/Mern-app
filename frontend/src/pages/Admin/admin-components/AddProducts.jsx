import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createProduct } from '../../../api/products';

const AddProducts = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    discountedPrice: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("You need to log in as an admin to add products");
      navigate("/admin/login");  // Redirect to login if no admin token
      return;
    }

    setLoading(true);

    try {
      const response = await createProduct(productData, image);  // Call the API function to create product
      console.log("Product added:", response);
      alert("Product added successfully!");
      setProductData({
        name: '',
        description: '',
        price: '',
        discountedPrice: '',
        stock: '',
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block mb-1">Discounted Price</label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={productData.discountedPrice}
                  onChange={handleInputChange}
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter discounted price"
                />
              </div>
              <div>
                <label className="block mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter stock quantity"
                />
              </div>
              <div>
                <label className="block mb-1">Upload Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  required
                  className="px-4 py-2 border w-full rounded-md"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-md text-gray-700"
                  onClick={() => setProductData({
                    name: '',
                    description: '',
                    price: '',
                    discountedPrice: '',
                    stock: '',
                  })}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {loading ? 'Adding...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
