const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err }; // Create a shallow copy of the error object
        error.message = err.message; // Ensure the message property is copied
        console.error(err); // Log the original error for debugging

        // Mongoose bad ObjectId
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message); // Extract validation error messages
            const message = `Invalid input data. ${messages.join('. ')}`; // Combine messages into a single string
            error = new Error(message);
            error.statusCode = 400;
        }

        // Handle other errors
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error'
        });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;