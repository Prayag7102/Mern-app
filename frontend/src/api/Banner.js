
import axiosInstance from "./axios";

export const uploadBanner = async (formData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axiosInstance.post('/banner/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getBanners = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axiosInstance.get('/banner', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const editBanner = async (bannerId, imageIndex, newImageFile) => {
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('imageUrl', newImageFile); 
      formData.append('imageIndex', imageIndex); 
  
      const response = await axiosInstance.put(`/banner/${bannerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, 
        },
      });
      return response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };
