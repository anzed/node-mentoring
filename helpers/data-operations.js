/* eslint no-param-reassign: 0 */
import { Pool } from 'pg';

const pool = new Pool({
    host: 'localhost',
    user: process.argv[2],
    password: process.argv[3],
    database: process.argv[4],
});

const dataOperations = {
    getProduct: id => pool.query(`SELECT * FROM products WHERE ID = ${id}`),
    getProducts: () => pool.query('SELECT * FROM products'),
    getUser: id => pool.query(`SELECT * FROM users WHERE ID = ${id}`),
    getUsers: () => pool.query('SELECT * FROM users'),
    addProduct: (newProduct) => {
        pool.query(`
            INSERT INTO products(brand, model, reviews)
            VALUES (${newProduct.brand}, ${newProduct.model}, ${newProduct.reviews})
        `);
    },
};

export default dataOperations;
