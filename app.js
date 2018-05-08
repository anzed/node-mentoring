/* eslint no-unused-vars:0 */
import { Dirwatcher, Importer } from './modules';

const dirwatcher = new Dirwatcher();
const importer = new Importer();

const handleImport = (paths) => {
    importer.import(paths)
        .then(data => console.log(data))
        .catch(error => console.error(error));
};

dirwatcher.watch('./data', 1000);
dirwatcher.on('changed', handleImport);
