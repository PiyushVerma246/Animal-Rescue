import api from './api';

export const reportService = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/reports?${params.toString()}`);
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/reports/stats');
    return response.data;
  },
  
  getMyReports: async () => {
    const response = await api.get('/reports/my-reports');
    return response.data;
  },
  
  getNearby: async (lat, lng, radius) => {
    const response = await api.get(`/reports/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    return response.data;
  },
  
  create: async (formData) => {
    const response = await api.post('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  updateStatus: async (id, status) => {
    const response = await api.put(`/reports/${id}/status`, { status });
    return response.data;
  }
};
