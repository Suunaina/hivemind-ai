import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createTask = async (prompt, token) => {
  const response = await api.post(
    '/v1/tasks',
    { prompt },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const getUserTasks = async (token) => {
  const response = await api.get('/v1/tasks', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getTaskById = async (id, token) => {
  const response = await api.get(`/v1/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
