const fs = require('fs');

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: Sequelize.INTEGER,
            },
            brand: {
                type: Sequelize.STRING,
            },
            model: {
                type: Sequelize.STRING,
            },
            reviews: {
                type: Sequelize.ARRAY(Sequelize.STRING),
            },
        }).then(() => {
            queryInterface.bulkInsert('products', products.data);
        }),
    down: queryInterface => queryInterface.dropTable('products'),
};
