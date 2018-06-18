/* eslint no-use-before-define:0, no-unused-vars:0 */
import http from 'http';
import fs from 'fs';
import stream from 'stream';

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

    // readable().pipe(transformData()).pipe(response);
});

server.listen(3000, 'localhost', () => {
    console.log('Server is listening on http://localhost:3000');
});

function getIndexHtml() {
    const html = fs.readFileSync('static/index.html', 'utf8');

    return html.replace('{message}', message);
}

// Second implementation
function readable() {
    const html = fs.readFileSync('static/index.html', 'utf8');
    const readStream = new stream.Readable();

    readStream.push(html);
    readStream.push(null);

    return readStream;
}

function transformData() {
    return new stream.Transform({
        objectMode: true,
        transform: (data, _, done) => {
            const transformedData = data.toString().replace('{message}', message);

            done(null, transformedData);
        },
    });
}
