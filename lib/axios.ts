import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const encryptMessage = async (algorithm: string, message: string) => {
  const response = await api.post(`/${algorithm}/encrypt`, { message });
  return response.data;
};

export const signMessage = async (algorithm: string, message: string) => {
  const response = await api.post(`/${algorithm}/sign`, { message });
  return response.data;
};

export const verifyMessage = async (algorithm: string, message: string, signature: string) => {
  const response = await api.post(`/${algorithm}/verify_signature`, { message, signature });
  return response.data;
};

export const decryptMessage = async (algorithm: string, cipherText: string) => {
  const response = await api.post(`/${algorithm}/decrypt`, { cipherText });
  return response.data;
};

export default api;
