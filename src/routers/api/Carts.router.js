import { Router } from "express";
import CartsManager from "../../dao/CartsManager.js";

const CartsRouter = Router();

CartsRouter.post('/carts', async (req, res) => {
    const { body } = req;
    const cart = await CartsManager.addToCart(body);
    res.status(200).json(cart);
});

CartsRouter.put('/carts/:_id', async (req, res) => {
    try {
        const { params: { _id }, body } = req;
        await CartsManager.updateCartById(_id, body);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

CartsRouter.delete('/carts/:_id', async (req, res) => {
    try {
        const { params: { _id } } = req;
        await CartsManager.deleteFromCartById(_id);
        res.status(200).json({ message: 'Producto eliminado del carrito correctamente' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default CartsRouter;
