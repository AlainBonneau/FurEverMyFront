import axios from 'axios';

const axiosInstance = axios.create({
  // Ip local ou public de l'API
  baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
