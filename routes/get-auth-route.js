import fs from 'fs';

const getAuthRoute = (request, response, next) => {
    const html = fs.readFileSync('static/auth.html', 'utf8');

    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    });
    response.write(html);

    next();
};

export default getAuthRoute;
