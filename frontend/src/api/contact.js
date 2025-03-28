import axiosInstance from "./axios";

export const submitContactForm = async (formData) => {
    const token = localStorage.getItem("token")
    if(!token) {
        throw new Error('Please login to submit the form');
    }
    try {


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

export const getInquiry = async () => {
    try {
        const token = localStorage.getItem("adminToken");
        const response = await axiosInstance.get(`/contact/get-inquiry`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network Error');
    }
};

export const deleteInquiry = async (id) => {
    try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            throw new Error('Unauthorized: Admin token is missing');
        }

        const response = await axiosInstance.delete(`/contact/delete-inquiry/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Network Error');
    }
};