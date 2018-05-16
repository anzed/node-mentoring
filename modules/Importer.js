/* eslint arrow-body-style:0 */
import csv from 'csvtojson';

export default class Importer {
    import(paths) {
        const imports = paths.map(path => this.processFile(path));

        return Promise.all(imports);
    }

    importSync(paths, callback) {
        const files = [];
        let processedFiles = 0;

        paths.forEach((path) => {
            csv().fromFile(path)
                .on('end_parsed', (jsonObj) => {
                    files.push(jsonObj);
                    processedFiles++;

                    if (processedFiles === paths.length) {
                        callback(null, files);
                    }
                });
        });
    }

    processFile(path) {
        return new Promise((resolve, reject) => {
            csv().fromFile(path)
                .on('end_parsed', jsonObj => resolve(jsonObj))
                .on('done', error => reject(error));
        });
    }
}
