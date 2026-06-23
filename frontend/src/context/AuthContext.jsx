import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data on startup if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await API.get('/users/profile');
        if (res.data && res.data.success) {
          setUser(res.data.data);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Failed to load user profile on startup', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data && res.data.success) {
        const userData = res.data.data;
        localStorage.setItem('token', userData.token);
        setUser({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar,
          preferences: userData.preferences,
          stats: userData.stats
        });
        return { success: true };
      }
      return { success: false, message: 'Invalid server response structure' };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await API.post('/auth/register', { name, email, password });
      if (res.data && res.data.success) {
        const userData = res.data.data;
        localStorage.setItem('token', userData.token);
        setUser({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          stats: {
            totalChantCount: 0,
            currentStreak: 0,
            longestStreak: 0
          }
        });
        return { success: true };
      }
      return { success: false, message: 'Invalid registration response' };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please check details.';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await API.put('/users/profile', profileData);
      if (res.data && res.data.success) {
        setUser(res.data.data);
        return { success: true };
      }
      return { success: false, message: 'Invalid response' };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      return { success: false, message };
    }
  };

  const refreshStats = async () => {
    try {
      const res = await API.get('/users/profile');
      if (res.data && res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.error('Failed to sync updated stats', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, refreshStats }}>
      {children}
    </AuthContext.Provider>
  );
};
