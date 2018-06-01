/* eslint no-use-before-define:0 */
import http from 'http';
import fs from 'fs';

const message = 'Hello World';
const server = http.createServer();

server.on('request', (request, response) => {
    if (request.url === '/favicon.ico') {
        response.statusCode = 204;
        response.end();
        return;
    }

    const html = getIndexHtml();

    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    });

    response.end(html);
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on http://localhost:3000');
});

function getIndexHtml() {
    const html = fs.readFileSync('static/index.html', 'utf8');

    return html.replace('{message}', message);
}
