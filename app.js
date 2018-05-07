/* eslint no-unused-vars:0 */
import { Dirwatcher, Importer } from './modules';

const dirwatcher = new Dirwatcher('./data', 3000);
const importer = new Importer();

dirwatcher.watch();
dirwatcher.on('changed', importer.import);
