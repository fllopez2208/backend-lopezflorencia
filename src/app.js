import express from 'express';

import ProductManager from './ProductManager.js';

const app = express();
const productManager = new ProductManager('./products.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
  const welcome = `<h2 style='color: blue'> Bienvenidos </h2>`
  res.send(welcome)
});

app.get('/products', async (req, res) => {
  const products = await productManager.getProducts();
  const limit = req.query.limit;
  if(limit){
    res.send(products.slice (0,limit));
  } else {
    res.send(products)
  }
});

app.get('/products/:id', async(req, res) => {
    const productId = await productManager.getProductById(req.params.id)
    res.send(productId)
})

app.listen (8080, () => {
  console.log(`Servidor Express escuchando en el puerto 8080`);
})

