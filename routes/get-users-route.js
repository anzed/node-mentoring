import dataOperations from '../helpers/data-operations';

const getUsersRoute = (request, response, next) => {
    const users = dataOperations.getUsers();

    if (users) {
        response.write(users);

        next();
    } else {
        next('Users were not found');
    }
};

export default getUsersRoute;
