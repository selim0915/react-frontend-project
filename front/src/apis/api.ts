import axios, { AxiosError, AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create();

const handleError = (error: AxiosError): Promise<AxiosError> => {
  const token = localStorage.getItem('token');
  if (token) {
    localStorage.removeItem('token');
  }
  return Promise.reject(error);
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      const { headers } = config;
      headers.Authorization = token;
    }
    return config;
  },
  (error) => handleError(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => handleError(error),
);

export default api;
