class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Sets the name of the error to the class name
        Error.captureStackTrace(this, this.constructor); // Captures the stack trace
    }
}

export default CustomError;