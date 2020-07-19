import axios from 'axios';
require('dotenv').config();

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BASE_URL_DEPLOY
      : process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});
