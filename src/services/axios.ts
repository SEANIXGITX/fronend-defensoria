import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1/', //process.env.VUE_APP_API_ROOT,
});

export { axiosClient };
