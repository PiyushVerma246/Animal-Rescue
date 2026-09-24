import api from './api';

export const adoptionService = {
  getAll: async () => {
    const response = await api.get('/adoption');
    return response.data;
  },
  
  getOne: async (id) => {
    const response = await api.get(`/adoption/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/adoption', data);
    return response.data;
  },
  
  requestAdoption: async (id, requestData) => {
    const response = await api.post(`/adoption/${id}/request`, requestData);
    return response.data;
  },
  
  updateRequestStatus: async (id, reqId, status) => {
    const response = await api.put(`/adoption/${id}/request/${reqId}`, { status });
    return response.data;
  }
};
