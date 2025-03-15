import axios from "axios";

// API URL should be inside .env file but in our case because we are using a public API
// and for others to run the project smoothly its hardcoded here
const baseURL = "https://api.escuelajs.co/api/v1";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
