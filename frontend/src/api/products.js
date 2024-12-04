import axiosInstance from './axios'; // Assuming you have axiosInstance set up

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