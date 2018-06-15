import dataOperations from '../helpers/data-operations';

const getReviewsRoute = (request, response, next) => {
    const productId = +request.params.id;
    const product = dataOperations.getProduct(productId);

    if (product && product.reviews) {
        response.write(JSON.stringify(product.reviews));

        next();
    } else {
        const error = new Error('Reviews were not found. Try another id.');
        error.statusCode = 404;

        next(error);
    }
};

export default getReviewsRoute;
