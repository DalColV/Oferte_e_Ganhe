
class ErrorHandler {
    static handleError(res, statusCode, message) {
        res.status(statusCode).json({ error: message });
    }

    static handleValidationError(res, message) {
        this.handleError(res, 400, message);  
    }

    static handleUnauthorizedError(res, message = "Unauthorized") {
        this.handleError(res, 401, message);  
    }

    static handleInternalServerError(res, message = "Internal Server Error") {
        this.handleError(res, 500, message);  
}
}

module.exports = ErrorHandler;
