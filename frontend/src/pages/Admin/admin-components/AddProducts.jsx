import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../api/products';
import { toast } from 'react-toastify';

const AddProducts = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    discountedPrice: '',
    stock: '',
    categories: [],
    tags: [],
    brand: '',
    colors: '',
    sizes: '',
    features: '',
    details: '',
    specifications: ''
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

  const handleTagChange = (e, type) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      const value = e.target.value.trim();
      setProductData({
        ...productData,
        [type]: [...productData[type], value]
      });
      e.target.value = '';
    }
  };

  const handleDeleteTag = (tag, type) => {
    setProductData({
      ...productData,
      [type]: productData[type].filter((item) => item !== tag)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("You need to log in as an admin to add products");
      navigate("/admin/login");
      return;
    }

    setLoading(true);

    try {
      const response = await createProduct(productData, image);
      toast.success("Product Created Successfully!", {
        theme: 'dark',
        draggable: true
      });

      setProductData({
        name: '',
        description: '',
        price: '',
        discountedPrice: '',
        stock: '',
        categories: [],
        tags: [],
        brand: '',
        colors: '',
        sizes: '',
        features: '',
        details: '',
        specifications: ''
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

              {/* Brand Field */}
              <div>
                <label className="block mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={productData.brand}
                  onChange={handleInputChange}
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter brand name"
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block mb-1">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {productData.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-300 rounded-full text-sm flex items-center"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => handleDeleteTag(category, 'categories')}
                        className="ml-2 text-red-500"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add category and press Enter"
                  className="mt-2 px-4 py-2 border w-full rounded-md"
                  onKeyDown={(e) => handleTagChange(e, 'categories')}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block mb-1">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {productData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-300 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleDeleteTag(tag, 'tags')}
                        className="ml-2 text-red-500"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tag and press Enter"
                  className="mt-2 px-4 py-2 border w-full rounded-md"
                  onKeyDown={(e) => handleTagChange(e, 'tags')}
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
                    categories: [],
                    tags: [],
                    brand: '',
                    colors: '',
                    sizes: '',
                    features: '',
                    details: '',
                    specifications: ''
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
