import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.POSTGRES_DB || process.argv[4],
    process.env.POSTGRES_USER || process.argv[2],
    process.env.POSTGRES_PASSWORD || process.argv[3], {
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
);

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
