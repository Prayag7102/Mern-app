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


export  const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    console.log("All users:", response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};