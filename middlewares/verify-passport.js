const verifyPassport = (request, response, next) => {
    if (!request.isAuthenticated() && request.path !== '/auth' && request.path !== '/favicon.ico') {
        const error = new Error('Unauthorized');
        error.statusCode = 403;

        return next(error);
    }

    return next();
};

export default verifyPassport;
