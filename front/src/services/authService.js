import axios from './api';

const API_URL = 'http://localhost:3000/api'; // ajuste se sua API tiver outro endereço

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // deve incluir o token e o user
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};