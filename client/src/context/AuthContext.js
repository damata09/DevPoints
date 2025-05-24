import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: null,
    loading: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (authState.token) {
      setAuthState(prev => ({ ...prev, loading: true }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
      
      try {
        const decoded = jwt_decode(authState.token);
        getUserData(decoded.user.id);
      } catch (err) {
        logout();
      }
    } else {
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: false,
        loading: false,
        user: null
      }));
    }
  }, [authState.token]);

  const getUserData = async (userId) => {
    try {
      const res = await axios.get(`/api/users/${userId}`);
      setAuthState({
        token: authState.token,
        user: res.data,
        isAuthenticated: true,
        loading: false
      });
    } catch (err) {
      logout();
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setAuthState(prev => ({
        ...prev,
        token: res.data.token
      }));
      navigate('/profile');
    } catch (err) {
      throw err.response.data;
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      setAuthState(prev => ({
        ...prev,
        token: res.data.token
      }));
      navigate('/profile');
    } catch (err) {
      throw err.response.data;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;