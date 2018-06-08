import fs from 'fs';

const productsPath = 'data/products.json';
const usersPath = 'data/users.json';

const dataOperations = {
    getProduct: id => JSON.parse(fs.readFileSync(productsPath, 'utf8')).data.find(product => product.id === +id),
    getProducts: () => fs.readFileSync(productsPath, 'utf8'),
    getUser: id => JSON.parse(fs.readFileSync(usersPath, 'utf8')).data.find(user => user.id === +id),
    getUsers: () => fs.readFileSync(usersPath, 'utf8'),
};

export default dataOperations;
