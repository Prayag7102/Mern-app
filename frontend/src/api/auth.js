import axiosInstance from "./axios";


export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/login", { email, password },{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    throw error.response.data ? error.response.data : error;
  }
};


export const registerUser = async (name, email, password) => {
  try {
    const response = await axiosInstance.post("/users/register", { name, email, password },{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const adminLogin = async (username, password) => {
  try {
    const response = await axiosInstance.post("/admin/admin/login", { username, password },{
      withCredentials:true
    });
    return response.data;  
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export  const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/users",{
      withCredentials:true
    });
    return response.data
  } catch (error) {
    throw error.response ? error.responce.data : error;
  }
};