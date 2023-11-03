import { Router } from "express";
import ProductsManager from "../../dao/ProductsManager.js";

const Productsrouters = Router();

Productsrouters.get('/products', async (req, res)=> {
    const { query = {} } = req;
    const products = await ProductsManager.get(query);
    res.status(200).json(products);
});

Productsrouters.get('/products/:sid', async (req, res)=> {
    try {
        const { params:  { sid } } = req;
        const products = await ProductsManager.getById(sid);
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
});

Productsrouters.post('/products', async (req, res)=> {
    const { body } = req;
    const products = await ProductsManager.create(body);
    res.status(200).json(products);
});

Productsrouters.put('/products/:sid', async (req, res)=> {
    try {
        const { params:  { sid }, body } = req;
        await ProductsManager.updateById(sid, body);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
});

Productsrouters.delete('/products/:sid', async (req, res)=> {
    try {
        const { params:  { sid } } = req;
        await ProductsManager.deleteById(sid);
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
});

export default Productsrouters;
