
import axios from './api';

const API_URL = 'http://localhost:3000/api/questions'; // ajuste conforme sua API

export const getAllQuestions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getQuestionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createQuestion = async (questionData, token) => {
  const response = await axios.post(API_URL, questionData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const submitAnswer = async (questionId, answerData, token) => {
  const response = await axios.post(`${API_URL}/${questionId}/answers`, answerData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const upvoteAnswer = async (questionId, answerId, token) => {
  const response = await axios.post(
    `${API_URL}/${questionId}/answers/${answerId}/upvote`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};