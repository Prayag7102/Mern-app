import { toast } from "react-toastify";
import axiosInstance from "./axios";

export const decodeToken = (token) => {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      toast.error("Error decoding token:", error);
      return null;
    }
  };

export const editReview = async (productId, reviewId, rating, comment) => {
    try {
      const response = await axiosInstance.put(
        `/products/${productId}/review/${reviewId}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      toast.error('Failed to delete review', error);
      throw error;
    }
  };