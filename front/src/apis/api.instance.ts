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
  (response) => {
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return Promise.reject(
        new Error('Invalid response type: expected application/json')
      );
    }
    return response;
  },
  (error) => handleError(error),
);

export default api;
