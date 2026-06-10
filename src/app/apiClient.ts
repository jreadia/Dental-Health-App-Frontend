import axios from 'axios';

const apiClient = axios.create({
  // Use a relative path to route through the Vite proxy in development or Vercel proxy in production
  // This completely avoids SameSite cookie issues across domains.
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
});

export default apiClient;
