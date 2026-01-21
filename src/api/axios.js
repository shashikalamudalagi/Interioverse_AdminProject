import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://interioverse-backend-bpf6.onrender.com/",
  withCredentials: true,    // cookies (JWT)
});

export default api;


//http://localhost:5000/api