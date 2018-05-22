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

parseArgs(cli.input, cli.flags);

function parseArgs(input, flags) {
    const textString = input[0];
    const filePath = flags.file;
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
