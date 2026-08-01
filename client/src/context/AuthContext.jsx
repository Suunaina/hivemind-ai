import React, { createContext, useContext, useState, useEffect } from 'react';
import { registerUser as registerApi, loginUser as loginApi, getMe as getMeApi } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('hivemind_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('hivemind_token') || null;
  });

  const [loading, setLoading] = useState(true);

  // Validate stored token on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('hivemind_token');
      if (storedToken) {
        try {
          const res = await getMeApi(storedToken);
          if (res.success && res.data) {
            setUser(res.data);
            localStorage.setItem('hivemind_user', JSON.stringify(res.data));
          }
        } catch {
          // Token expired or invalid
          localStorage.removeItem('hivemind_token');
          localStorage.removeItem('hivemind_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await loginApi(email, password);
    if (response.success && response.data) {
      const userData = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role || 'user'
      };
      const authToken = response.data.token;

      setUser(userData);
      setToken(authToken);
      localStorage.setItem('hivemind_token', authToken);
      localStorage.setItem('hivemind_user', JSON.stringify(userData));
      return response.data;
    }
    throw new Error(response.message || 'Login failed');
  };

  const register = async (name, email, password) => {
    const response = await registerApi(name, email, password);
    if (response.success && response.data) {
      const userData = {
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role || 'user'
      };
      const authToken = response.data.token;

      setUser(userData);
      setToken(authToken);
      localStorage.setItem('hivemind_token', authToken);
      localStorage.setItem('hivemind_user', JSON.stringify(userData));
      return response.data;
    }
    throw new Error(response.message || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hivemind_token');
    localStorage.removeItem('hivemind_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
