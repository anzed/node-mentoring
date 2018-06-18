import jwt from 'jsonwebtoken';
import dataOperations from '../helpers/data-operations';

const doAuthRoute = (request, response, next) => {
    const { login, password } = request.body;
    const users = dataOperations.getUsers();
    const parsedUsers = JSON.parse(users).data;
    const requestedUser = parsedUsers.find(user => user.name.toLowerCase() === login.toLowerCase());

    if (requestedUser && requestedUser.password === password) {
        const token = jwt.sign(requestedUser, 'secret');
        const responseObject = {
            code: 200,
            message: 'OK',
            data: {
                id: requestedUser.id,
                username: requestedUser.name,
            },
            token,
        };

        response.write(JSON.stringify(responseObject));

        next();
    } else {
        const error = new Error('Not found');
        error.statusCode = 404;

        next(error);
    }
};

export default doAuthRoute;
