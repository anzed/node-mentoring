import dataOperations from '../helpers/data-operations';

const getProductRoute = (request, response, next) => {
    const productId = +request.params.id;
    const product = dataOperations.getProduct(productId);

    if (product) {
        response.write(JSON.stringify(product));

        next();
    } else {
        next('Product was not found. Try another id.');
    }
};

export default getProductRoute;
