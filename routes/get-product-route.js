import dataOperations from '../helpers/data-operations';

const getProductRoute = (request, response, next) => {
    const productId = +request.params.id;
    const product = dataOperations.getProduct(productId);

    if (product) {
        response.write(JSON.stringify(product));

        next();
    } else {
        const error = new Error('Product was not found. Try another id.');
        error.statusCode = 404;

        next(error);
    }
};

export default getProductRoute;
