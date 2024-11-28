const TokenService = require("../services/authServices/tokenServices");

const tokenServices = new TokenService();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.auth_token;

        if (!token) {
            return res.status(401).json({ error: "Authentication token is missing. Please log in." });
        }

        const result = tokenServices.verify(token);

        if (result.error) {
            return res.status(result.statusCode).json({ error: result.error });
        }

        req.user = result.decoded;

        next();
    } catch (error) {

        return res.status(401).json({ error: "Authentication failed. Please try again." });
    }
};

module.exports = { authMiddleware };
