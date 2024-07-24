import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://project-fur-ever-home-back-9f2ff164644f.herokuapp.com/api/v2',
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
