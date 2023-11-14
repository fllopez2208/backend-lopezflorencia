import { Router } from "express";
import CartsManager from "../../dao/CartsManager.js";

const CartsViewsrouters = Router();

CartsViewsrouters.get('/carts', async (req, res) => {
    let carts = await CartsManager.getAllCarts();
    res.render('carts', { carts: carts.map(c => c.toJSON()) });
});


export default CartsViewsrouters;
