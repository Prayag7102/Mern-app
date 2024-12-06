import axiosInstance from './axios';


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

  productData.categories.forEach((category) => {
    formData.append("categories[]", category);
  });

  productData.tags.forEach((tag) => {
    formData.append("tags[]", tag);
  });

  productData.colors.forEach((color) => {
    formData.append("colors[]", color);
  });

  productData.sizes.forEach((size) => {
    formData.append("sizes[]", size);
  });

  productData.features.forEach((feature) => {
    formData.append("features[]", feature);
  });

  formData.append("details", productData.details);
  formData.append("brand", productData.brand);

  formData.append("specifications[weight]", productData.specifications.weight);
  formData.append(
    "specifications[dimensions]",
    productData.specifications.dimensions
  );
  formData.append(
    "specifications[material]",
    productData.specifications.material
  );
  formData.append("specifications[other]", productData.specifications.other);

  formData.append("rating", productData.rating);
  formData.append("image", image);

  const response = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
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


export const addReview = async (productId, reviewData, userId) => {
  const token = localStorage.getItem("userToken"); 

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


export const editReview = async (productId, reviewId, userId, reviewData) => {
  const token = localStorage.getItem("userToken"); 

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


export const deleteReview = async (productId, reviewId, userId) => {
  const token = localStorage.getItem("userToken"); 

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
