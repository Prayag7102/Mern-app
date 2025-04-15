import axiosInstance from "./axios";

export const submitContactForm = async (formData) => {
    try {
        const response = await axiosInstance.post('/contact/inquiry', formData,
            {
                withCredentials:true
            }
        );
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const getInquiry = async () => {
    try {
        const response = await axiosInstance.get(`/contact/get-inquiry`, {
            withCredentials:true
        });
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const deleteInquiry = async (id) => {
    try {
        const response = await axiosInstance.delete(`/contact/delete-inquiry/${id}`, {
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Network Error');
    }
};