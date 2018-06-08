import dataOperations from '../helpers/data-operations';

const productsRoute = (request, response, next) => {
    const products = dataOperations.getProducts();

    response.write(products);

    next();
};

export default productsRoute;
