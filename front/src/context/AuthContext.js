import React, {
  createContext,
  useState,
  useEffect,  
  useCallback
} from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
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

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false
    });
    navigate('/login');
  }, [navigate]);

  const getUserData = useCallback(async (userId) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/users/${userId}`);
      setAuthState({
        token: authState.token,
        user: res.data,
        isAuthenticated: true,
        loading: false
      });
    } catch (err) {
      logout();
    }
  }, [authState.token, logout]);

  useEffect(() => {
    if (authState.token) {
      setAuthState(prev => ({ ...prev, loading: true }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
      try {
   const decoded = jwtDecode(authState.token);
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
  }, [authState.token, getUserData, logout]);

  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:3001/api/auth/register', formData);
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
      const res = await axios.post('http://localhost:3001/api/auth/login', formData);
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