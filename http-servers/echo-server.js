import http from 'http';

const server = http.createServer();

server.on('request', (request, response) => {
    response.statusCode = 200;

    request.pipe(response);
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on http://localhost:3000');
});
