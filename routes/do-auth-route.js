import jwt from 'jsonwebtoken';
import dataOperations from '../helpers/data-operations';

const doAuthRoute = (request, response, next) => {
    const { login, password } = request.body;

    dataOperations.getUsers()
        .then((data) => {
            const users = data.rows;

            return users.find(user => user.name.toLowerCase() === login.toLowerCase());
        })
        .then((requestedUser) => {
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
                const stringifyedObject = JSON.stringify(responseObject);

                response.write(stringifyedObject);

                next();
            }
        })
        .catch(() => {
            const error = new Error('Not found');
            error.statusCode = 404;

            next(error);
        });
};

export default doAuthRoute;
