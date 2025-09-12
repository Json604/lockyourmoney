const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err}
        console.error(err)
        error.message = err.message

        // Mongoose bad objectId
        if(err.name == 'CastError'){
            const message = 'Resource not found'
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose duplucate key
        if(err.name == 11000){
            const message = 'Duplicate key value entered'
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if(err.name == 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message)
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode||500).json({success: false, error: error.message || "Internal Sercer Error"})
    } catch (error) {
        console.error("Error in errorMiddleware", error)
        next(error)
    }
}

export default errorMiddleware;