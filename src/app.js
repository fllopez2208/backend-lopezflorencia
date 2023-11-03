import express from 'express';
import path from 'path';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import ProductsRouters from './routers/api/products.router.js';
import ProductsViewsrouters from './routers/views/products.routers.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//Routers:

app.get('/', (req, res) => {
    res.send('Hello from backend');
});

app.use('/api', ProductsRouters);
app.use('/', ProductsViewsrouters);

app.use((error, req, res, next) => {
    const message = `Ha ocurrido un error inesperado: ${error.message}`
    console.error(message)
    res.status(500).json({message});
});

export default app;

