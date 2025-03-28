import axiosInstance from "./axios";


export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/login", { email, password });
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);
    }
    return response.data;
  } catch (error) {
    throw error.response.data ? error.response.data : error;
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
      localStorage.setItem("admin", response.data.admin.username);
      localStorage.setItem("adminToken", response.data.token);
    }

    return response.data;  
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export  const fetchAllUsers = async () => {
  try {
    const token = localStorage.getItem("adminToken")
    const response = await axiosInstance.get("/users",{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return response.data
  } catch (error) {
    throw error.response ? error.responce.data : error;
  }
};