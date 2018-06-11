/* eslint no-param-reassign: 0 */
import fs from 'fs';

const productsPath = 'data/products.json';
const usersPath = 'data/users.json';

const dataOperations = {
    getProduct: id => JSON.parse(fs.readFileSync(productsPath, 'utf8')).data.find(product => product.id === +id),
    getProducts: () => fs.readFileSync(productsPath, 'utf8'),
    getUser: id => JSON.parse(fs.readFileSync(usersPath, 'utf8')).data.find(user => user.id === +id),
    getUsers: () => fs.readFileSync(usersPath, 'utf8'),
    addProduct: (newProduct) => {
        const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
        const lastProductIndex = products.data.length - 1;
        const nextId = products.data[lastProductIndex].id + 1;

        newProduct.id = nextId;
        products.data.push(newProduct);

        fs.writeFileSync(productsPath, JSON.stringify(products));
    },
};

export default dataOperations;
