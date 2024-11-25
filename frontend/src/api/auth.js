import axiosInstance from "./axios";


export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/login", { email, password });
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const registerUser = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/users/register", { name, email, password });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const adminLogin = async (username, password) => {
  try {
    const response = await axiosInstance.post("/admin/admin/login", { username, password });


    if (response.data.token) {
      localStorage.setItem("adminToken", response.data.token);
    }

    return response.data;  
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};