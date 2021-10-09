import axios from 'axios';

const request = axios.create({
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
