import express from 'express';
import { cookieParser, queryParser } from './middlewares';
import { allRoute, productRoute, productsRoute, userRoute, usersRoute } from './routes';

const app = express();
const router = express.Router();
const middlewares = [cookieParser, queryParser];

router.get('/api/products/:id', productRoute);
router.get('/api/products', productsRoute);
router.get('/api/users/:id', userRoute);
router.get('/api/users', usersRoute);
router.all('*', middlewares, allRoute);

app.use('/', router);

export default app;
