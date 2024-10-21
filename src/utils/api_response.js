class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = "",
    ) {
        super(message);
        this.status_code = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}


export { ApiError, ApiResponse };