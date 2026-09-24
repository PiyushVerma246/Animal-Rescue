const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

async function setup() {
  try {
    console.log('Registering Demo User...');
    let userToken;
    try {
      const uRes = await axios.post(`${API_URL}/auth/register`, {
        name: 'Demo User',
        email: 'user@demo.com',
        phone: '1234567890',
        password: 'password123',
        role: 'user'
      });
      userToken = uRes.data.token;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        // Already exists, just login
        const uRes = await axios.post(`${API_URL}/auth/login`, {
          email: 'user@demo.com',
          password: 'password123'
        });
        userToken = uRes.data.token;
      } else throw e;
    }

    console.log('Registering Demo NGO...');
    let ngoToken;
    try {
      const nRes = await axios.post(`${API_URL}/auth/register`, {
        name: 'Demo NGO Rescue',
        email: 'ngo@demo.com',
        phone: '0987654321',
        password: 'password123',
        role: 'ngo',
        orgName: 'Demo Rescue Organization',
        address: '123 Rescue Lane'
      });
      ngoToken = nRes.data.token;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const nRes = await axios.post(`${API_URL}/auth/login`, {
          email: 'ngo@demo.com',
          password: 'password123'
        });
        ngoToken = nRes.data.token;
      } else throw e;
    }

    console.log('Generating dummy reports for NGO and User...');
    // Create a report from the user
    try {
      await axios.post(`${API_URL}/reports`, {
        animalType: 'dog',
        description: 'Found a dog with a broken leg near the station.',
        severity: 'high',
        address: 'Central Station',
        city: 'Metropolis',
        state: 'NY',
        coordinates: '[-74.006, 40.7128]'
      }, { headers: { Authorization: `Bearer ${userToken}` } });
      
      await axios.post(`${API_URL}/reports`, {
        animalType: 'cat',
        description: 'Cat stuck in a tree, looks malnourished.',
        severity: 'low',
        address: 'Main Park',
        city: 'Metropolis',
        state: 'NY',
        coordinates: '[-74.01, 40.715]'
      }, { headers: { Authorization: `Bearer ${userToken}` } });

      console.log('Dummy reports created successfully!');
    } catch (err) {
      console.log('Reports might already exist or failed:', err.response ? err.response.data : err.message);
    }

    console.log('\n=======================================');
    console.log('✅ Demo accounts setup complete!');
    console.log('User Login: user@demo.com / password123');
    console.log('NGO Login: ngo@demo.com / password123');
    console.log('=======================================');

  } catch (error) {
    console.error('Setup failed:', error.response ? error.response.data : error.message);
  }
}

setup();
