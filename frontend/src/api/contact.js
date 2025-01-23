import axiosInstance from "./axios";

export const submitContactForm = async (formData) => {
    try {
        const token = localStorage.getItem("token")
        const response = await axiosInstance.post('/contact/inquiry', formData,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        );
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};