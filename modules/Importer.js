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

        return Promise.all(imports);
    }

    importSync(paths) {
        paths.forEach((path) => {
            csv().fromFile(path)
                .on('end_parsed', jsonObj => console.log(jsonObj));
        });
    }

    /**
     * ToDo: implement this method
     */
    importAsync() {}
}
