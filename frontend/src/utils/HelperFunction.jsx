import axiosInstance from "../api/axios";

export const isActiveLink = (path) => {
    return window.location.pathname === path;
  };



export const getUserIdFromToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedToken = JSON.parse(window.atob(base64));
  return decodedToken.id;
};

export const getUserFromToken = async (token) => {
  const userId = getUserIdFromToken(token);
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};
