import express from 'express';
import path from 'path';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import router from './routers/views.router.js';
import Productsrouters from './routers/Products.router.js';
import CartRouter from './routers/cart.router.js';


const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', router);

app.use('/api', Productsrouters, CartRouter);



export default app;

