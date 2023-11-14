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

CartsRouter.get('/carts/:_id', async (req, res) => {
    try {
        const { params: { _id } } = req;
        const cart = await CartsManager.getCartProductDetails(_id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.delete('/carts/:_id/products/:productId', async (req, res) => {
    try {
        const { params: { _id, productId } } = req;
        const cart = await CartsManager.deleteProductFromCart(_id, productId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.put('/carts/:_id', async (req, res) => {
    try {
        const { params: { _id }, body } = req;
        const cart = await CartsManager.updateCart(_id, body.products);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.put('/carts/:_id/products/:productId', async (req, res) => {
    try {
        const { params: { _id, productId }, body } = req;
        const cart = await CartsManager.updateProductQuantity(_id, productId, body.quantity);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});



export default CartsRouter;