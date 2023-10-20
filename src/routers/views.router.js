import { Router } from 'express';
import path from 'path';
import __dirname from '../utils.js';
import ProductManager from '../ProductManager.js';

const router = Router();

const productManager = new ProductManager(path.join(__dirname, '../products.json'));

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/home', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products: products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

router.post('/deleteProduct', async (req, res) => {
    const productId = req.body.id;
    try {
        await productManager.deleteProduct(productId);
        const products = await productManager.getProducts();
        res.io.emit('productUpdate', products);
        res.status(200).send('Producto eliminado correctamente');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
