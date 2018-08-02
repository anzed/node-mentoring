import dataOperations from '../helpers/data-operations';

const getProductRoute = (request, response, next) => {
    const productId = +request.params.id;

    dataOperations.getProduct(productId)
        .then(data => data.rows)
        .then((product) => {
            const stringifyedProduct = JSON.stringify(product);

            response.write(stringifyedProduct);

            next();
        })
        .catch(() => {
            const error = new Error('Product was not found');
            error.statusCode = 404;

            next(error);
        });
};

export default getProductRoute;
