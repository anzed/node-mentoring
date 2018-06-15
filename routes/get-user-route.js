import dataOperations from '../helpers/data-operations';

const getUserRoute = (request, response, next) => {
    const userId = +request.params.id;
    const user = dataOperations.getUser(userId);

    if (user) {
        response.write(JSON.stringify(user));

        next();
    } else {
        const error = new Error();
        error.statusCode = 404;

        next(error);
    }
};

export default getUserRoute;
