import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const loginApi = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/v1/auth/login`, payload);
  return response.data;
};

export const registerApi = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/v1/auth/register`, payload);
  return response.data;
};
