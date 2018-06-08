import parser from '../helpers/parser';

const cookieParser = (request, response, next) => {
    const cookies = parser(request.headers.cookie);
    const responseObject = {
        parsedCookies: cookies,
    };

    response.write(JSON.stringify(responseObject));

    next();
};

export default cookieParser;
