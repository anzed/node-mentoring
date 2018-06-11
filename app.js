import express from 'express';
import { cookieParser, queryParser, errorHandler } from './middlewares';
import routes from './routes';

const app = express();
const router = express.Router();
const middlewares = [cookieParser, queryParser];

// GET requests
router.get('/api/products', routes.getProductsRoute);
router.get('/api/products/:id', routes.getProductRoute);
router.get('/api/products/:id/reviews', routes.getReviewsRoute);
router.get('/api/users', routes.getUsersRoute);
router.get('/api/users/:id', routes.getUserRoute);

// POST requests
router.post('/api/products', routes.addProductRoute);

// All requests
router.all('*', middlewares, routes.allRoute);

app.use(express.json());
app.use('/', router);
app.use(errorHandler);

export default app;
