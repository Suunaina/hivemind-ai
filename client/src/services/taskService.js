import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createTask = async (prompt, experienceLevel = 'Intermediate', token) => {
  // Support legacy call signature if token is passed as 2nd arg
  let finalLevel = experienceLevel;
  let finalToken = token;
  if (typeof experienceLevel === 'string' && !['Beginner', 'Intermediate', 'Advanced'].includes(experienceLevel)) {
    finalToken = experienceLevel;
    finalLevel = 'Intermediate';
  }

  const response = await api.post(
    '/v1/tasks',
    { prompt, experienceLevel: finalLevel },
    {
      headers: {
        Authorization: `Bearer ${finalToken}`
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

export const askMentor = async (taskId, { question, stage }, token) => {
  const response = await api.post(
    `/v1/tasks/${taskId}/mentor`,
    { question, stage },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const getAchievements = async (token) => {
  const response = await api.get('/v1/achievements', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const unlockAchievement = async (badgeId, token) => {
  const response = await api.post(
    '/v1/achievements/unlock',
    { badgeId },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const updateTaskProgress = async (taskId, progressState, token) => {
  const response = await api.patch(
    `/v1/tasks/${taskId}/progress`,
    { progressState },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
