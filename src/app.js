import express from 'express';
import path from 'path';
import expressSession from 'express-session';
import FileStore from 'session-file-store';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';

import ProductsRouters from './routers/api/Products.router.js';
import ProductsViewsrouters from './routers/views/products.routers.js';
import CartsRouter from './routers/api/Carts.router.js';
import CartsViewsrouters from './routers/views/carts.router.js';

import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';
import indexRouter from './routers/index.router.js';
import sessionsRouter from './routers/sessions.router.js';

const app = express();

const sessionFileSystem = FileStore(expressSession);

const SESSION_SECRET = '03034569999999';

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser(SESSION_SECRET));


app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: URI,
        mongoOptions:{},  
        ttl:15,
    }),
    
}));
    
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//set-cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('ecommerce-cookie', 'Cookie de prueba', { maxAge: 10000, signed: true })
    res.send('Cookie configurada correctamente');
});
 
//get-cookie
app.get('/get-cookie', (req, res) => {
    const cookie = req.signedCookies;
    res.send(cookie);
});  

//delete-cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('ecommerce-cookie');
    res.send('Cookie eliminada con exito');
});

//Routers:




app.use('/api', ProductsRouters);
app.use('/', ProductsViewsrouters);
app.use('/api', CartsRouter);
app.use('/', CartsViewsrouters);
app.use('/', indexRouter);
app.use('/api', sessionsRouter);

app.use((error, req, res, next) => {
    const message = `Ha ocurrido un error inesperado: ${error.message}`
    console.error(message)
    res.status(500).json({message});
});

export default app;

