export default (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        reviews: DataTypes.ARRAY(DataTypes.STRING),
    }, {
        timestamps: false,
    });

    return Product;
};
