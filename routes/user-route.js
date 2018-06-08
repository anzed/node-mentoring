import dataOperations from '../helpers/data-operations';

const userRoute = (request, response, next) => {
    const userId = +request.params.id;
    const user = dataOperations.getUser(userId);

    response.write(JSON.stringify(user));

    next();
};

export default userRoute;
