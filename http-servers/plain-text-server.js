import http from 'http';

const server = http.createServer();

server.on('request', (request, response) => {
    if (request.url === '/favicon.ico') {
        response.statusCode = 204;
        response.end();
        return;
    }

    response.writeHead(200, {
        'Content-Type': 'text/plain',
    });

    response.end('Hello World');
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on http://localhost:3000');
});
