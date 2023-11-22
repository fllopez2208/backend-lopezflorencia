import { Router } from "express";
import CartsManager from "../../dao/CartsManager.js";

const CartsViewsrouters = Router();

CartsViewsrouters.get('/carts', async (req, res) => {
    const carts = await CartsManager.getAllCarts();
    res.render('Cart', { carts });
});


export default CartsViewsrouters;