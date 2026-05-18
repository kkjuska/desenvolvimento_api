export const successResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        sucess: true,
        message,
        data
    })
};

export const errorResponse = (res, statusCode, message, details) => {
    res.status(statusCode).json({
        sucess: false,
        message,
        details
    })
};