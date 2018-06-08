import dataOperations from '../helpers/data-operations';

const usersRoute = (request, response, next) => {
    const users = dataOperations.getUsers();

    response.write(users);

    next();
};

export default usersRoute;
