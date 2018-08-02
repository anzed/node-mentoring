import dataOperations from '../helpers/data-operations';

const getUserRoute = (request, response, next) => {
    const userId = +request.params.id;

    dataOperations.getUser(userId)
        .then(data => data.rows)
        .then((user) => {
            const stringifyedUser = JSON.stringify(user);

            response.write(stringifyedUser);

            next();
        })
        .catch(() => {
            const error = new Error('User was not found');
            error.statusCode = 404;

            next(error);
        });
};

export default getUserRoute;
