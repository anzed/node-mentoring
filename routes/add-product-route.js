import dataOperations from '../helpers/data-operations';

const addProductRoute = (request, response, next) => {
    const newProduct = request.body.product;

    if (newProduct) {
        dataOperations.addProduct(newProduct);
        response.write(JSON.stringify(newProduct));

        next();
    } else {
        const error = new Error('Please add valid product.');
        error.statusCode = 500;

        next(error);
    }
};

export default addProductRoute;
