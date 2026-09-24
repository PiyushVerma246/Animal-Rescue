import api from './api';

export const donationService = {
  getNgos: async () => {
    const response = await api.get('/donations/ngos');
    return response.data;
  },
  
  createCheckoutSession: async (data) => {
    const response = await api.post('/donations/create-checkout-session', data);
    return response.data;
  },
  
  confirm: async (data) => {
    const response = await api.post('/donations/confirm', data);
    return response.data;
  },
  
  getMyDonations: async () => {
    const response = await api.get('/donations/my-donations');
    return response.data;
  }
};
