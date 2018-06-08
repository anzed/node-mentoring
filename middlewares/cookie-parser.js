import parseHelper from '../helpers/parse-helper';

const cookieParser = (request, response, next) => {
    const cookies = parseHelper(request.headers.cookie);
    const responseObject = {
        parsedCookies: cookies,
    };

    response.write(JSON.stringify(responseObject));

    next();
};

export default cookieParser;
