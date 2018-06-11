const errorHandler = (error, request, response) => {
    response.status(500).send(error);
};

export default errorHandler;
