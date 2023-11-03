import { Router } from "express";
import ProductsManager from "../../dao/ProductsManager.js";

const ProductsViewsrouters = Router();

ProductsViewsrouters.get('/products', async (req, res) => {
    const products = await ProductsManager.get();
    res.render('products', { products });
})

export default ProductsViewsrouters;