import dataOperations from '../helpers/data-operations';

const getProductsRoute = (request, response, next) => {
    const products = dataOperations.getProducts();

    if (products) {
        response.write(products);

        next();
    } else {
        next('Products were not found');
    }
};

export default getProductsRoute;
