import axiosInstance from './axios';

// Create a new product (with image upload, categories, tags)
export const createProduct = async (productData, image) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error("You must be logged in as an admin to add a product");
  }

  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("discountedPrice", productData.discountedPrice);
  formData.append("stock", productData.stock);

  // Adding categories and tags
  productData.categories.forEach(category => {
    formData.append("categories[]", category);
  });

  productData.tags.forEach(tag => {
    formData.append("tags[]", tag);
  });

  // Adding the brand field
  formData.append("brand", productData.brand); 

  // Adding the image and other fields
  formData.append("rating", productData.rating);  // Initial rating if applicable
  formData.append("image", image);

  try {
    const response = await axiosInstance.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;  
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      throw new Error("You must be logged in as an admin to delete a product.");
    }

    const response = await axiosInstance.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update product details (like categories, tags, etc.)
export const updateProduct = async (id, productData) => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      throw new Error("You must be logged in as an admin to update a product.");
    }

    const response = await axiosInstance.put(`/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Add a review for a product
export const addReview = async (productId, reviewData, userId) => {
  const token = localStorage.getItem("userToken"); // Assuming user token is stored

  if (!token) {
    throw new Error("You must be logged in to add a review");
  }

  try {
    const response = await axiosInstance.post(`/products/${productId}/reviews`, reviewData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      params: { userId },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Edit an existing review
export const editReview = async (productId, reviewId, userId, reviewData) => {
  const token = localStorage.getItem("userToken"); // Assuming user token is stored

  if (!token) {
    throw new Error("You must be logged in to edit a review");
  }

  try {
    const response = await axiosInstance.put(`/products/${productId}/reviews/${reviewId}/user/${userId}`, reviewData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete an existing review
export const deleteReview = async (productId, reviewId, userId) => {
  const token = localStorage.getItem("userToken"); // Assuming user token is stored

  if (!token) {
    throw new Error("You must be logged in to delete a review");
  }

  try {
    const response = await axiosInstance.delete(`/products/${productId}/reviews/${reviewId}/user/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
