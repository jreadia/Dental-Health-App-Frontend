import axios from 'axios';

const apiClient = axios.create({
  // Pointing directly to the deployed backend since CORS is now configured
  baseURL: import.meta.env.VITE_API_URL || 'https://dental-health-backend-x7b5.onrender.com/api/v1',
  withCredentials: true,
});

export default apiClient;
