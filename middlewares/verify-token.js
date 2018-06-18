import jwt from 'jsonwebtoken';

const verifyToken = (request, response, next) => {
    if (request.path === '/auth' || request.path === '/favicon.ico') {
        next();
    } else {
        const token = request.headers.authorization.split(' ')[1];

        try {
            jwt.verify(token, 'secret');

            next();
        } catch (e) {
            const error = new Error('Unauthorized');
            error.statusCode = 403;

            next(error);
        }
    }
};

export default verifyToken;
