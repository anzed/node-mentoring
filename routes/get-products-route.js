import dataOperations from '../helpers/data-operations';

const getProductsRoute = (request, response, next) => {
    const products = dataOperations.getProducts();

    if (products) {
        response.write(products);

        next();
    } else {
        const error = new Error('Products were not found');
        error.statusCode = 500;

        next(error);
    }
};

export default getProductsRoute;
