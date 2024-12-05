import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material"; // Import Autocomplete for categories and tags

const EditModal = ({ 
  open, 
  onClose, 
  product, 
  setProduct, 
  onSave 
}) => {
  const [previewImage, setPreviewImage] = useState("");
  
  // For tags and categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  // For brand
  const [brand, setBrand] = useState("");

  useEffect(() => {
    if (product?.image && typeof product.image === "string") {
      setPreviewImage(`http://localhost:5000/uploads/${product.image}`);
    } else if (product?.image instanceof File) {
      setPreviewImage(URL.createObjectURL(product.image));
    }

    if (product?.categories) {
      setSelectedCategories(product.categories);
    }
    
    if (product?.tags) {
      setSelectedTags(product.tags);
    }
    
    if (product?.brand) {
      setBrand(product.brand);
    }
  }, [product]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategories(newValue);
    setProduct({ ...product, categories: newValue });
  };

  const handleTagChange = (event, newValue) => {
    setSelectedTags(newValue);
    setProduct({ ...product, tags: newValue });
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setProduct({ ...product, brand: e.target.value });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-product"
      aria-describedby="edit-product-details"
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-4xl mx-auto mt-16 overflow-y-auto"
        style={{
          maxWidth: "900px",
          maxHeight: "80vh", // Set max height for the modal
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextField
            label="Name"
            fullWidth
            value={product?.name || ""}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={product?.description || ""}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={product?.price || ""}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Discounted Price"
            fullWidth
            type="number"
            value={product?.discountedPrice || ""}
            onChange={(e) =>
              setProduct({
                ...product,
                discountedPrice: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            label="Stock"
            fullWidth
            type="number"
            value={product?.stock || ""}
            onChange={(e) =>
              setProduct({ ...product, stock: e.target.value })
            }
            margin="normal"
          />
        </div>

        {/* Brand Field */}
        <TextField
          label="Brand"
          fullWidth
          value={brand || ""}
          onChange={handleBrandChange}
          margin="normal"
        />

        {/* Categories Field */}
        <Autocomplete
          multiple
          options={["Electronics", "Clothing", "Home", "Books"]} // Example category options, replace with your actual categories
          value={selectedCategories}
          onChange={handleCategoryChange}
          renderInput={(params) => (
            <TextField {...params} label="Categories" margin="normal" />
          )}
          getOptionLabel={(option) => option} // Customize this based on your category structure
        />

        {/* Tags Field */}
        <Autocomplete
          multiple
          options={["Sale", "New", "Featured", "Limited"]} // Example tag options, replace with your actual tags
          value={selectedTags}
          onChange={handleTagChange}
          renderInput={(params) => (
            <TextField {...params} label="Tags" margin="normal" />
          )}
          getOptionLabel={(option) => option} // Customize this based on your tag structure
        />

        {/* Image Upload Section */}
        <div className="mt-6">
          <label className="block mb-2">Current Image:</label>
          <div>
            {previewImage && (
              <img
                src={previewImage}
                alt="Current Product"
                className="max-h-24 object-contain mb-4"
              />
            )}
          </div>
          <label className="block mb-2">Update Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          className="mt-4"
          fullWidth
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditModal;
