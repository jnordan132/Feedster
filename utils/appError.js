// appError is a custom errorclass whilst Error is a javascript class
class AppError extends Error {
    // constructor receives 2 variables 
    constructor(message, statusCode) {
        // message variable is being passed to super class constructor
        super(message);
        // assigning the status code received in the constructor
        this.statusCode = statusCode;
        // optional parameter determines if the error is custom or not
        this.isOperational = true;
// provides the stack/location of the error in the file/line
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;