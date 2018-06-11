import dataOperations from '../helpers/data-operations';

const addProductRoute = (request, response, next) => {
    const newProduct = request.body.product;

    if (newProduct) {
        dataOperations.addProduct(newProduct);
        response.write(JSON.stringify(newProduct));

        next();
    } else {
        next('Please add valid product.');
    }
};

export default addProductRoute;
