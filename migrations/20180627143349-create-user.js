const fs = require('fs');

const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
        }).then(() => {
            queryInterface.bulkInsert('users', users.data);
        }),
    down: queryInterface => queryInterface.dropTable('users'),
};
