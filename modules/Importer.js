/* eslint arrow-body-style:0 */
import csv from 'csvtojson';

export default class Importer {
    import(paths) {
        const imports = paths.map((path) => {
            return new Promise((resolve, reject) => {
                csv().fromFile(path)
                    .on('end_parsed', jsonObj => resolve(jsonObj))
                    .on('done', error => reject(error));
            });
        });

        return Promise.all(imports)
            .then(data => console.log(data))
            .catch(err => console.error(err));
    }

    importSync(paths) {
        paths.forEach((path) => {
            csv().fromFile(path)
                .on('end_parsed', jsonObj => console.log(jsonObj));
        });
    }
}
