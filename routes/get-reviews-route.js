import dataOperations from '../helpers/data-operations';

const getReviewsRoute = (request, response, next) => {
    const productId = +request.params.id;
    const product = dataOperations.getProduct(productId);

    if (product && product.reviews) {
        response.write(JSON.stringify(product.reviews));

        next();
    } else {
        next('Reviews were not found. Try another id.');
    }
};

export default getReviewsRoute;
