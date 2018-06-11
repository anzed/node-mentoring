import dataOperations from '../helpers/data-operations';

const getUserRoute = (request, response, next) => {
    const userId = +request.params.id;
    const user = dataOperations.getUser(userId);

    if (user) {
        response.write(JSON.stringify(user));

        next();
    } else {
        next('User was not found. Try another id.');
    }
};

export default getUserRoute;
