import express from 'express';
import { cookieParser, errorHandler, queryParser, verifyToken } from './middlewares';
import routes from './routes';

const app = express();
const router = express.Router();
const middlewares = [cookieParser, queryParser];

app.use(verifyToken);

// GET requests
router.get('/auth', routes.getAuthRoute);
router.get('/api/products', routes.getProductsRoute);
router.get('/api/products/:id', routes.getProductRoute);
router.get('/api/products/:id/reviews', routes.getReviewsRoute);
router.get('/api/users', routes.getUsersRoute);
router.get('/api/users/:id', routes.getUserRoute);

// POST requests
router.post('/auth', routes.doAuthRoute);
router.post('/api/products', routes.addProductRoute);

// All requests
router.all('*', middlewares, routes.allRoute);

app.use(express.urlencoded());
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

export default app;
