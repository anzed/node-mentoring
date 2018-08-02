import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.argv[4], process.argv[2], process.argv[3], {
    host: '127.0.0.1',
    dialect: 'postgres',
});

const models = {
    User: sequelize.import('./user'),
    Product: sequelize.import('./product'),
};

Object.keys(models).forEach((model) => {
    if ('associate' in models[model]) {
        models[model].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
