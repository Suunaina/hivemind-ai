import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAdminStats = async (token) => {
  const response = await api.get('/v1/admin/stats', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAdminUsers = async (token, query = '') => {
  const response = await api.get(`/v1/admin/users${query ? `?q=${encodeURIComponent(query)}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAdminUserById = async (token, userId) => {
  const response = await api.get(`/v1/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAdminAnalytics = async (token) => {
  const response = await api.get('/v1/admin/analytics', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
