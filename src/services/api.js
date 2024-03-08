import axios from 'axios';

const api = axios.create({
  baseURL: `${'http://localhost:5173'}/`,
  headers: {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
    'Accept-Language': 'es',
  },
});

export default api;