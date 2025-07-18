import axiosInstance from './axios';


export const createProduct = async (productData, image, otherImages) => {

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

  otherImages.forEach((file) => {
    formData.append("otherImages", file);
  });

  const response = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials:true
  });

  return response.data;
};


export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;  
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/all",{
      withCredentials:true
    });
    return response.data;  
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const deleteProduct = async (id) => {
  try {

    const response = await axiosInstance.delete(`/products/${id}`, {
      withCredentials:true
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};


