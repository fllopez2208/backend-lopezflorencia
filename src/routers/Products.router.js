import { Router } from "express";
import path from 'path';
import __dirname from '../utils.js';
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager(path.join(__dirname, '../products.json'));

const Productsrouters = Router();


function generateUniqueId(products) {
    let newId;
    do {
    newId = Math.floor(Math.random() * 1000000); 
    } while (products.some((product) => product.id === newId));
    return newId;
}

Productsrouters.get('/products', async (req, res) => {
   
    const products = await productManager.getProducts();
    const limit = req.query.limit;
    if(limit){
    res.send(products.slice (0,limit));
    } else {
    res.status(200).json(products)
    }

});

Productsrouters.get('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
    
    res.status(400).send('El parámetro id debe ser un número válido');
    return;
    }

    const product = await productManager.getProductById(productId);
    if (!product) {
    res.status(404).send('Producto no encontrado');
    } else {
        res.status(200).json(product);
    }
})

Productsrouters.post('/products', async (req, res) => {
    try {
      const products = await productManager.getProducts();
  
      const { title, description, price, thumbnail, category, code, stock } = req.body;
  
      if (!title || !description || !price || !category || !code || !stock) {
        throw new Error('Todos los campos son obligatorios.');
      }
  
      const existingProduct = products.find((p) => p.code === code);
  
      if (existingProduct) {
        throw new Error(`Ya existe un producto con el código ${code}.`);
      }
  
      const id = generateUniqueId(products);
  
      const newProduct = {
        id,
        title,
        description,
        price,
        thumbnail: req.body.thumbnail,
        category, 
        code,
        stock,
        status: true, 
      };
  
      products.push(newProduct);
  
      await productManager.saveProducts(products);
  
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

Productsrouters.put('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
        res.status(400).send('El parámetro id debe ser un número válido');
        return;
    }

    try {
        const products = await productManager.getProducts();
        const productIndex = products.findIndex((product) => product.id === productId);

        if (productIndex === -1) {
            res.status(404).send('Producto no encontrado');
            return;
        }

        const updatedProduct = {
            ...products[productIndex],
            ...req.body, 
            id: productId, 
        };

        products[productIndex] = updatedProduct;

        await productManager.saveProducts(products);

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

    });

Productsrouters.delete('/products/:id', async (req, res) => {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
        res.status(400).send('El parámetro id debe ser un número válido');
        return;
    }

    try {
        const products = await productManager.getProducts();
        const productIndex = products.findIndex((product) => product.id === productId);

        if (productIndex === -1) {
            res.status(404).send('Producto no encontrado');
            return;
        }

        products.splice(productIndex, 1);

        await productManager.saveProducts(products);

        res.status(204).send(); 
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


  
export default Productsrouters;