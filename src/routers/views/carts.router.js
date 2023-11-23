import { Router } from "express";
import CartsManager from "../../dao/CartsManager.js";

const CartsViewsrouters = Router();

CartsViewsrouters.get('/carts', async (req, res) => {
    const carts = await CartsManager.get();
    res.render('carts', { carts: carts.map(c => c.toJSON()) });
});

export default CartsViewsrouters;