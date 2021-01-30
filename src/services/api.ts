import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(async config => {
  const headerConfig = config;
  const token = getToken();
  if (token) {
    headerConfig.headers.Authorization = `Bearer ${token}`;
  }
  return headerConfig;
});

api.interceptors.response.use(async response => {
  if (response.data.auth === false) {
    sessionStorage.clear();
    document.location.reload();
  }

  return response;
});

export default api;
