/* eslint no-unused-vars:0 */
import { Dirwatcher, Importer } from './modules';

const dirwatcher = new Dirwatcher();
const importer = new Importer();

const logger = (error, data) => {
    if (error) {
        console.error(error);
    }

    console.log(data);
};

const handleImport = async (paths) => {
    try {
        const data = await importer.import(paths);

        logger(null, data);
    } catch (e) {
        logger(e);
    }
};

const handleSyncImport = (paths) => {
    importer.importSync(paths, logger);
};

dirwatcher.watch('./data', 1000);
dirwatcher.on('changed', handleImport);
