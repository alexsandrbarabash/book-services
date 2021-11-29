const joi = require('joi');

const configSchema = joi.object({
  PORT: joi.string().required(),
  sourceUrl: joi.string().required(),
  authUrl: joi.string().required(),
});

module.exports = configSchema;
