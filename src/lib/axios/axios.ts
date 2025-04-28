import axios from 'axios';

const axiosInstance = axios.create({
  // Ip local ou public de l'API
  baseURL: 'https://fureverhome-api.sparcky-dev.fr',
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
