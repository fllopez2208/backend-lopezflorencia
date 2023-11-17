import { Router } from "express";
import CartsManager from "../../dao/CartsManager.js";

const CartsRouter = Router();

CartsRouter.get('/carts', async (req, res) => {
    try {
        const carts = await CartsManager.getAllCarts(); 
        res.status(200).json(carts);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.post('/carts', async (req, res) => {
    try {
        const { body } = req;
        const cart = await CartsManager.addToCart(body);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.get('/carts/:cid', async (req, res) => {
    try {
        const { params: { cid } } = req;
        const cart = await CartsManager.getCartDetail(cid);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.delete('/carts/:cid/products/:productId', async (req, res) => {
    try {
        const { params: { cid, productId } } = req;
        const cart = await CartsManager.deleteProductFromCart(cid, productId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.put('/carts/:cid', async (req, res) => {
    try {
        const { params: { cid }, body } = req;
        const cart = await CartsManager.updateCart(cid, body.products);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.put('/carts/:cid/products/:pid', async (req, res) => {
    try {
        const { params: { cid, productId }, body } = req;
        const cart = await CartsManager.updateProductQuantity(cid, productId, body.quantity);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});



export default CartsRouter;