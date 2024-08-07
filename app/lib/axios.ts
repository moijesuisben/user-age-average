import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://infallible-tereshkova-717266.netlify.app/.netlify/functions/server/',
  timeout: 10000,
});

export default instance;
