import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
});

export const livroService = {
  getAll: () => axiosInstance.get('/livros'),
  get: (id) => axiosInstance.get(`/livros/${id}`),
  create: (data) => axiosInstance.post('/livros', data),
  update: (id, data) => axiosInstance.put(`/livros/${id}`, data),
  delete: (id) => axiosInstance.delete(`/livros/${id}`),
};

export const usuarioService = {
  getAll: () => axios.get(`${API_URL}/usuarios`),
  get: (id) => axios.get(`${API_URL}/usuarios/${id}`),
  create: (data) => axios.post(`${API_URL}/usuarios`, data),
  update: (id, data) => axios.put(`${API_URL}/usuarios/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/usuarios/${id}`),
};

export const emprestimoService = {
  getAll: () => axios.get(`${API_URL}/emprestimos`),
  get: (id) => axios.get(`${API_URL}/emprestimos/${id}`),
  create: (data) => axios.post(`${API_URL}/emprestimos`, data),
  update: (id, data) => axios.put(`${API_URL}/emprestimos/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/emprestimos/${id}`),
};