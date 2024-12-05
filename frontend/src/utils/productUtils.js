import { deleteProduct } from "../api/products";

// utils/productUtils.js
export const handleEditSave = async (selectedProduct, setProducts, setEditModalOpen, toast) => {
    try {
      let imageUrl = selectedProduct.image;
      const adminToken = localStorage.getItem("adminToken");
  
      if (!adminToken) {
        throw new Error("Admin is not authenticated.");
      }
  
      if (selectedProduct.image instanceof File) {
        const formData = new FormData();
        formData.append("image", selectedProduct.image);
  
        const uploadResponse = await fetch("http://localhost:5000/api/products/" + selectedProduct._id, {
          method: "PUT",
          body: formData,
          headers: {
            "Authorization": `Bearer ${adminToken}`,
          },
        });
  
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image");
        }
  
        const updatedProduct = await uploadResponse.json();
        imageUrl = updatedProduct.image;
      }
  
      const updatedProduct = {
        ...selectedProduct,
        image: imageUrl,
      };
  
      const updateResponse = await fetch("http://localhost:5000/api/products/" + selectedProduct._id, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`,
        },
      });
  
      if (!updateResponse.ok) {
        throw new Error("Failed to update product.");
      }
  
      const productData = await updateResponse.json();
      setProducts((prev) =>
        prev.map((product) =>
          product._id === selectedProduct._id ? productData : product
        )
      );
      setEditModalOpen(false);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update the product.");
    }
  };
  
  export const handleDelete = async (id, setProducts, toast) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete the product.");
    }
  };
  