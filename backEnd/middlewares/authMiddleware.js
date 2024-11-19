const TokenService = require("../services/authServices/tokenServices");

const tokenServices = new TokenService();


const authMiddleware = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
      }
      
      const result = tokenServices.verify(authHeader);

    if (result.error) {
      return res.status(result.statusCode).json({ error: result.error });
    }

    if (requiredRole && result.decoded.role !== requiredRole) {
        return res.status(403).json({ error: "Access forbidden" });
      }

    req.user = result.decoded;

    next();
  } catch (error) {
    return res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = authMiddleware;
