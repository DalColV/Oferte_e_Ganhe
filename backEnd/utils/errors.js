class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isOperational = true; 
    }
}

const handleError = (res, error) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({ message, error: error.stack });
};

module.exports = { AppError, handleError };
