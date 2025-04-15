import { toast } from "react-toastify";
import axiosInstance from "./axios";


export const editReview = async (productId, reviewId, rating, comment) => {
    try {
      const response = await axiosInstance.put(
        `/products/${productId}/review/${reviewId}`,
        { rating, comment },
        {
          withCredentials:true
        }
      );
      return response.data; 
    } catch (error) {
      toast.error('Failed to update review', error);
      throw error; 
    }
  };


  export const deleteReview = async (productId, reviewId) => {
    try {
      const response = await axiosInstance.delete(
        `/products/${productId}/review/${reviewId}`,
        {
          withCredentials:true
        }
      );
      return response.data; 
    } catch (error) {
      toast.error('Failed to delete review', error);
      throw error;
    }
  };