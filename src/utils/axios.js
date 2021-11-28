const axios = require('axios');
const {
  config: { authUrl },
} = require('../config');

const authInstance = axios.create({
  baseURL: authUrl,
});
module.exports = { authInstance };
