const { authInstance } = require('../utils');
const { endpoint, methods } = require('../enums');

const AuthMiddleware = (key) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      // console.log(Authorization);
      // console.log(req.headers);
      const { data } = await authInstance.request({
        method: methods.get,
        url: endpoint.auth,
        headers: { Authorization: authorization },
      });
      req[key] = { ...req[key], token: data.userId };
      next();
    } catch (error) {
      const status = error?.response?.data?.status || 500;
      res.status(status).json({ message: error.message });
    }
  };
};

module.exports = { AuthMiddleware };
