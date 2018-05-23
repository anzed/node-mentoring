/* eslint indent:0 */
import stream from 'stream';
import fs from 'fs';
import csv from 'csvtojson';
import cli from './cli';

function reverse(str) {
    return str.split('').reverse().join('');
}

function transform(str) {
    return str.toUpperCase();
}

function outputFile(filePath) {
    const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    readableStream.pipe(writable());
}

function convertFromFile(filePath) {
    const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    csv()
        .fromStream(readableStream)
        .on('end_parsed', json => console.log(json));
}

function convertToFile(filePath) {
    const targetFilePath = `${filePath.split('.')[0]}.json`;
    const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    const writableStream = fs.createWriteStream(targetFilePath);

    csv()
        .fromStream(readableStream)
        .on('end_parsed', json => writableStream.write(JSON.stringify(json)));
}

function cssBundler(path) {
    const cssFiles = fs.readdirSync(path);
    const writer = fs.createWriteStream(`${path}/bundle.css`);

    cssFiles.forEach((file) => {
        const filePath = `${path}/${file}`;
        const buffer = readCssFile(filePath);

        writer.write(buffer);
    });

    addExternalFile(writer);
}

parseArgs(cli.input, cli.flags);

function parseArgs(input, flags) {
    const textString = input[0];
    const filePath = flags.file;
    const cssPath = flags.path;
    const hasAction = Object.keys(flags).includes('action');

    if (hasAction) {
        switch (flags.action) {
            case 'reverse':
                readable(textString).pipe(processData(reverse)).pipe(writable());
                break;
            case 'transform':
                readable(textString).pipe(processData(transform)).pipe(writable());
                break;
            case 'outputFile':
                outputFile(filePath);
                break;
            case 'convertFromFile':
                convertFromFile(filePath);
                break;
            case 'convertToFile':
                convertToFile(filePath);
                break;
            case 'cssBundler':
                cssBundler(cssPath);
                break;
            default:
                cli.showHelp();
        }
    }
}

function readable(str) {
    const readStream = new stream.Readable();

    readStream.push(str);
    readStream.push(null);

    return readStream;
}

function processData(cb) {
    return new stream.Transform({
        objectMode: true,
        transform: (data, _, done) => {
            const transformedData = cb(data.toString());

            done(null, transformedData);
        },
    });
}

function writable() {
    return new stream.Writable({
        objectMode: true,
        write: (data, _, done) => {
            console.log(data);
            done();
        },
    });
}

function readCssFile(filePath) {
    const fd = fs.openSync(filePath, 'r');
    const fileInfo = fs.fstatSync(fd);
    const buffer = Buffer.alloc(fileInfo.size);

    fs.readSync(fd, buffer, 0, fileInfo.size, 0);
    fs.closeSync(fd);

    return buffer;
}

function addExternalFile(writer) {
    const buffer = readCssFile('external_css/nodejs-homework3.css');

    writer.write(buffer);
}
