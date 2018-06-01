import http from 'http';

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' },
    ],
};

const server = http.createServer();

server.on('request', (request, response) => {
    if (request.url === '/favicon.ico') {
        response.statusCode = 204;
        response.end();
        return;
    }

    response.writeHead(200, {
        'Content-Type': 'application/json',
    });

    response.end(JSON.stringify(product));
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on http://localhost:3000');
});
