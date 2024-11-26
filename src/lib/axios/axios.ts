import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://fureverhome-backend-c50cba18c4a6.herokuapp.com/api/v1',
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
