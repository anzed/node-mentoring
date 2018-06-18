/* eslint max-len:0 */
/* eslint no-unused-expressions:0 */
/* eslint consistent-return:0 */
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { cookieParser, errorHandler, queryParser, verifyPassport, verifyToken } from './middlewares';
import routes from './routes';
import dataOperations from './helpers/data-operations';

const BY_TOKEN = true; // 'false' value will enable passport authentication

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
}, (username, password, done) => {
    const users = JSON.parse(dataOperations.getUsers()).data;
    const requestedUser = users.find(user => user.name.toLowerCase() === username.toLowerCase());

    if (requestedUser && requestedUser.password !== password) {
        done(null, false, 'ololo:(');
    } else {
        done(null, requestedUser);
    }
}));

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => {
    const users = JSON.parse(dataOperations.getUsers()).data;
    const requestedUser = users.find(user => user.id === id);

    if (requestedUser) {
        return cb(null, requestedUser);
    }
});

const app = express();
const router = express.Router();
const middlewares = [cookieParser, queryParser];

app.use(express.urlencoded());
app.use(express.json());
BY_TOKEN ? app.use(verifyToken) : app.use(verifyPassport);
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);
app.use(errorHandler);

// GET requests
router.get('/auth', routes.getAuthRoute);
router.get('/api/products', routes.getProductsRoute);
router.get('/api/products/:id', routes.getProductRoute);
router.get('/api/products/:id/reviews', routes.getReviewsRoute);
router.get('/api/users', routes.getUsersRoute);
router.get('/api/users/:id', routes.getUserRoute);

// POST requests
if (BY_TOKEN) {
    router.post('/auth', routes.doAuthRoute);
} else {
    router.post('/auth', passport.authenticate('local', { failureRedirect: '/auth' }), (req, res) => {
        res.send('Success');
    });
}

router.post('/api/products', routes.addProductRoute);

// All requests
router.all('*', middlewares, routes.allRoute);

export default app;
