import dataOperations from '../helpers/data-operations';

const getUsersRoute = (request, response, next) => {
    dataOperations.getUsers()
        .then(data => data.rows)
        .then((users) => {
            const stringifyedUsers = JSON.stringify(users);

            response.write(stringifyedUsers);

            next();
        })
        .catch(() => {
            const error = new Error('Users were not found');
            error.statusCode = 500;

            next(error);
        });
};

export default getUsersRoute;
