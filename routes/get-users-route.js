import dataOperations from '../helpers/data-operations';

const getUsersRoute = (request, response, next) => {
    const users = dataOperations.getUsers();

    if (users) {
        response.write(users);

        next();
    } else {
        const error = new Error('Users were not found');
        error.statusCode = 500;

        next(error);
    }
};

export default getUsersRoute;
