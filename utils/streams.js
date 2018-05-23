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

    readableStream.pipe(process.stdout);
}

function convertFromFile(filePath) {
    if (!isFileExists(filePath)) {
        throw new Error(`File "${filePath}" doesn't exist`);
    }

    const readableStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    csv()
        .fromStream(readableStream)
        .on('end_parsed', json => console.log(json));
}

function convertToFile(filePath) {
    if (!isFileExists(filePath)) {
        throw new Error(`File "${filePath}" doesn't exist`);
    }

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

    if (hasAction && !helpIsNeeded()) {
        switch (flags.action) {
            case 'reverse':
                readable(textString).pipe(processData(reverse)).pipe(process.stdout);
                break;
            case 'transform':
                readable(textString).pipe(processData(transform)).pipe(process.stdout);
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
    } else {
        cli.showHelp();
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

function readCssFile(filePath) {
    const fd = fs.openSync(filePath, 'r');
    const fileInfo = fs.fstatSync(fd);
    const buffer = Buffer.alloc(fileInfo.size);
    const bufferStartOffset = 0;
    const fileStartPosition = 0;

    fs.readSync(fd, buffer, bufferStartOffset, fileInfo.size, fileStartPosition);
    fs.closeSync(fd);

    return buffer;
}

function addExternalFile(writer) {
    const buffer = readCssFile('external_css/nodejs-homework3.css');

    writer.write(buffer);
}

function helpIsNeeded() {
    const args = process.argv.slice(2);

    return args[0] === '--help' || args[0] === '-h';
}

function isFileExists(filePath) {
    return fs.existsSync(filePath);
}
