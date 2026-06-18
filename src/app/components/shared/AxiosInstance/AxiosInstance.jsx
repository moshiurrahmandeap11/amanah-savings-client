import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, 
  withCredentials: true, 
});



export default axiosInstance;