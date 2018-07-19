export default (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        timestamps: false,
    });

    return User;
};
