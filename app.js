import express from 'express';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';

const app = express();
const router = express.Router();

router.all('*', cookieParser, queryParser, (request, response) => {
    response.status(200);
    response.end();
});

app.use('/', router);

export default app;
