import { Router } from "express";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const CartRouter = Router();

const cartsFilePath = path.join(__dirname, '../carts.json');

function generateUniqueId() {
    return (Math.random() + 1).toString(36).substring(7);
}

function getCartsFromFile() {
    try {
        const data = fs.readFileSync(cartsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
}

function saveCartsToFile(carts) {
    fs.writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
}

CartRouter.post('/carts', (req, res) => {
    const carts = getCartsFromFile();
    const cartId = generateUniqueId();

    
    carts[cartId] = {
        id: cartId,
        products: []
    };

    saveCartsToFile(carts);

    res.status(201).json(carts[cartId]);
});

CartRouter.get('/carts/:cid', (req, res) => {
    const cartId = req.params.cid;
    const carts = getCartsFromFile();
    const cart = carts[cartId];

    if (cart) {
        res.status(200).json(cart.products);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

CartRouter.post('/carts/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = 1;
    const carts = getCartsFromFile();

    if (!carts[cartId]) {
        res.status(404).send('Carrito no encontrado');
        return;
    }

    const cart = carts[cartId];
    const existingProduct = cart.products.find(product => product.product === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ product: productId, quantity });
    }

    
    saveCartsToFile(carts);

    res.status(200).json(cart.products);
});

export default CartRouter;
