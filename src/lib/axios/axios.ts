import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export function addTokenJwtToAxiosInstance(token: string) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeTokenJwtFromAxiosInstance() {
  delete axiosInstance.defaults.headers.common.Authorization;
}

export default axiosInstance;
