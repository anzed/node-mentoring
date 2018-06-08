import dataOperations from '../helpers/data-operations';

const productRoute = (request, response, next) => {
    const productId = +request.params.id;
    const product = dataOperations.getProduct(productId);

    response.write(JSON.stringify(product));

    next();
};

export default productRoute;
