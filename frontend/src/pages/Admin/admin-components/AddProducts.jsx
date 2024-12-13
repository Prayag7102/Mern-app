import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../api/products';
import { toast } from 'react-toastify';
import { Button, Input, Box, Typography } from '@mui/material';

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
    colors: [],
    sizes: [],
    features: [],
    details: '',
    specifications: { weight: '', dimensions: '', material: '', other: '' }
  });

  const [image, setImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);
  const [otherImagesPreviews, setOtherImagesPreviews] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSpecificationChange = (e) => {
    setProductData({
      ...productData,
      specifications: { ...productData.specifications, [e.target.name]: e.target.value }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setOtherImages(files); // Store file objects for upload
    setOtherImagesPreviews(previews); // Generate preview URLs for display
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

    if (!productData.name || !productData.description || !productData.price || !image || otherImages.length === 0) {
      toast.error("Please fill in all required fields", { theme: "dark" });
      return;
    }

    setLoading(true);

    try {
      const response = await createProduct(productData, image, otherImages);
      toast.success("Product Created Successfully!", { theme: "dark" });

      setProductData({
        name: '',
        description: '',
        price: '',
        discountedPrice: '',
        stock: '',
        categories: [],
        tags: [],
        brand: '',
        colors: [],
        sizes: [],
        features: [],
        details: '',
        specifications: { weight: '', dimensions: '', material: '', other: '' },
      });
      setImage(null);
      setOtherImages([]);
      setOtherImagesPreviews([]);
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center">
      <div className="relative py-3">
        <div className="relative px-4 py-10 bg-white md:mx-0 shadow rounded-3xl sm:p-10">
          <div>
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="lg:flex flex-wrap gap-5 items-baseline">
              {/* Product Name */}
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
                <input
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price */}
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

              {/* Discounted Price */}
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

              {/* Stock */}
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

              {/* Brand */}
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
                <label className="block mb-1">Colors</label>
                <div className="flex flex-wrap gap-2">
                  {productData.colors.map((color, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-300 rounded-full text-sm flex items-center"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => handleDeleteTag(color, 'colors')}
                        className="ml-2 text-red-500"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add color and press Enter"
                  className="mt-2 px-4 py-2 border w-full rounded-md"
                  onKeyDown={(e) => handleTagChange(e, 'colors')}
                />
              </div>
              <div>
                <label className="block mb-1">Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {productData.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-300 rounded-full text-sm flex items-center"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => handleDeleteTag(size, 'sizes')}
                        className="ml-2 text-red-500"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add size and press Enter"
                  className="mt-2 px-4 py-2 border w-full rounded-md"
                  onKeyDown={(e) => handleTagChange(e, 'sizes')}
                />
              </div>
              <div>
                <label className="block mb-1">Specifications</label>
                <input
                  type="text"
                  name="weight"
                  value={productData.specifications.weight}
                  onChange={handleSpecificationChange}
                  className="px-4 py-2 border w-full rounded-md mb-2"
                  placeholder="Enter weight"
                />
                <input
                  type="text"
                  name="dimensions"
                  value={productData.specifications.dimensions}
                  onChange={handleSpecificationChange}
                  className="px-4 py-2 border w-full rounded-md mb-2"
                  placeholder="Enter dimensions"
                />
                <input
                  type="text"
                  name="material"
                  value={productData.specifications.material}
                  onChange={handleSpecificationChange}
                  className="px-4 py-2 border w-full rounded-md mb-2"
                  placeholder="Enter material"
                />
                <input
                  type="text"
                  name="other"
                  value={productData.specifications.other}
                  onChange={handleSpecificationChange}
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter other specifications"
                />
              </div>
              <div>
                <label className="block mb-1">Details</label>
                <textarea
                  name="details"
                  value={productData.details}
                  onChange={handleInputChange}
                  className="px-4 py-2 border w-full rounded-md"
                  placeholder="Enter product details"
                ></textarea>
              </div>
              <div className=''>
              <div>
                <Typography variant="body1" className="mb-3">Upload Image:</Typography>
                <Input
                  type="file"
                  onChange={handleImageChange}
                  required
                  inputProps={{ accept: 'image/*' }}
                  sx={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="contained" color="primary" component="span" sx={{ px: 2, py: 1 }}>
                    Choose File
                  </Button>
                </label>
                {preview && (
                  <Box mt={2}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100px',
                        objectFit: 'contain',
                        marginTop: '10px',
                      }}
                    />
                  </Box>
                )}
              </div>

              {/* Other Images Upload */}
              <div>
                <label>Other Images</label>
                <input
                  type="file"
                  multiple
                  onChange={handleOtherImagesChange}
                  accept="image/*"
                />
                <div>
                  {otherImagesPreviews.length > 0 ? (
                    otherImagesPreviews.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Preview ${index + 1}`}
                        style={{ width: "100px", marginRight: "10px" }}
                      />
                    ))
                  ) : (
                    <p>No images selected</p>
                  )}
                </div>
              </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-5"
                >
                  {loading ? 'Adding Product...' : 'Add Product'}
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
