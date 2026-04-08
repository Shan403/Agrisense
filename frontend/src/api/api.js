import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export const recommendCrop = (data) => api.post('/recommend', data);
export const predictYield = (data) => api.post('/yield', data);
export const calculateProfit = (data) => api.post('/profit', data);
export const assessRisk = (data) => api.post('/risk', data);
export const compareCrops = (data) => api.post('/compare', data);
export const getAIInsight = (prompt) => api.post('/insight', { prompt });

export default api;
