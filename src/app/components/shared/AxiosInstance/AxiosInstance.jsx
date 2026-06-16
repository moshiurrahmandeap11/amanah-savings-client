import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: "http:api.sanchoybondhu.com/api", 
  withCredentials: true, 
});



export default axiosInstance;