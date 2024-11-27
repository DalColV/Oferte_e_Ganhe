class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

const handleError = (res, error) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    const response = {
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    };

    res.status(statusCode).json(response);
};

module.exports = { AppError, handleError };
