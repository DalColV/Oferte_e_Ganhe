const TokenService = require("../services/authServices/tokenServices");

const tokenServices = new TokenService();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({ error: "Token missing from cookies" });
        }

        const result = tokenServices.verify(token);

        req.user = result;

        next();
    } catch (error) {
        console.error("Error in Token Verification:", error.message);
        return res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = { authMiddleware };
