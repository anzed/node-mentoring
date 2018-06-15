/* eslint no-unused-vars:0 */
const errorHandler = (error, request, response, next) => {
    response
        .status(error.statusCode)
        .send({
            code: error.statusCode,
            message: error.message,
        });
};

export default errorHandler;
