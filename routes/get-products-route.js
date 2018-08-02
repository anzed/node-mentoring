import dataOperations from '../helpers/data-operations';

const getProductsRoute = (request, response, next) => {
    dataOperations.getProducts()
        .then(data => data.rows)
        .then((products) => {
            const stringifyedProducts = JSON.stringify(products);

            response.write(stringifyedProducts);

            next();
        })
        .catch(() => {
            const error = new Error('Products were not found');
            error.statusCode = 500;

            next(error);
        });
};

export default getProductsRoute;
