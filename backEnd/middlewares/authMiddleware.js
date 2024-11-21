const TokenService = require("../services/authServices/tokenServices");

const tokenServices = new TokenService();


const authMiddleware = (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;
      console.log("Authorization Header Received:", authHeader);

      if (!authHeader) {
          return res.status(401).json({ error: "Authorization header missing" });
      }

      const token = authHeader.split(" ")[1]; 
      console.log("Extracted Token:", token);

      if (!token) {
          return res.status(401).json({ error: "Token missing from Authorization header" });
      }

      const result = tokenServices.verify(`Bearer ${token}`); 
      console.log("Decoded Token:", result);

      req.user = result; 
      next();
  } catch (error) {
      console.error("Error in Token Verification:", error.message);
      return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = authMiddleware;

//ver tratamento de erros daqui pra modularizar no handle