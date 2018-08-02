import dataOperations from '../helpers/data-operations';

const getReviewsRoute = (request, response, next) => {
    const productId = +request.params.id;

    dataOperations.getProduct(productId)
        .then(data => data.rows)
        .then((product) => {
            const reviews = JSON.stringify(product[0].reviews);

            response.write(reviews);

            next();
        })
        .catch(() => {
            const error = new Error('Reviews were not found. Try another id.');
            error.statusCode = 404;

            next(error);
        });
};

export default getReviewsRoute;
