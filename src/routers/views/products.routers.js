import { Router } from "express";
import ProductsManager from "../../dao/ProductsManager.js";

const ProductsViewsrouters = Router();

ProductsViewsrouters.get('/products', async (req, res) => {
    let products = await ProductsManager.get();
    res.render('products', { products: products.map(p => p.toJSON()) });
});


export default ProductsViewsrouters;