const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined!"); 
}

class TokenService {
    verify(token) {
        try {
            if (!token.startsWith("Bearer ")) {
                return { error: "Invalid Token Format!", statusCode: 400 };
            }
            token = token.replace("Bearer ", "");

            const decoded = jwt.verify(token, SECRET_KEY);

            return {
                decoded,
                statusCode: 200
            };
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                return {
                    error: "Invalid Token",
                    statusCode: 401
                };
            }
            if (error instanceof jwt.TokenExpiredError) {
                return {
                    error: "Expired Token",
                    statusCode: 401
                };
            }
            return {
                error: "Something Went Wrong While Verifying Token",
                statusCode: 500
            };
        }
    }

    generate(payload) {
        return jwt.sign(payload, SECRET_KEY, {
            expiresIn: "1h" 
        });
    }
}

module.exports = TokenService;  
