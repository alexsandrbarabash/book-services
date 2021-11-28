const configSchema = require('./configSchema');
const { ERROR_MESSAGE } = require('../enums');

require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  sourceUrl: process.env.SOURCE_URL,
  authUrl: process.env.AUTH_URL,
};

const checkConfig = () => {
  const { error } = configSchema.validate(config);
  if (error) {
    throw new Error(`${ERROR_MESSAGE.CONFIG_ERROR}  ${error.message}`);
  }
};

module.exports = { config, checkConfig };
