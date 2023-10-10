import express from 'express';
import Productsrouters from './routers/Products.js';
import CartRouter from './routers/Cart.js';
import path from 'path';
import ProductManager from './ProductManager.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const app = express();

const productManager = new ProductManager(path.join(__dirname,'./products.json'));

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use('/api', Productsrouters, CartRouter);

app.get('/', (req, res) => {
  const welcome = `<h2 style='color: blue'> Bienvenidos </h2>`
  res.send(welcome)
});

app.listen (PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
})

