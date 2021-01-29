import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(async response => {
  if (response.data.auth == false) {
    sessionStorage.clear();
    document.location.reload();
  }
  
  return response;
})


export default api;