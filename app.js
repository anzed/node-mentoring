/* eslint no-unused-vars:0 */
import config from './config';
import { User, Product } from './models';

console.log(config.appName);

const user = new User();
const product = new Product();
