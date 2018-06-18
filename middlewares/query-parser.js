import url from 'url';

const queryParser = (request, response, next) => {
    const parsedUrl = url.parse(request.url, true);
    const { query } = parsedUrl;
    const responseObject = {
        parsedQuery: query,
    };

    response.write(JSON.stringify(responseObject));

    next();
};

export default queryParser;
