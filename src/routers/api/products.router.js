import { Router } from "express";
import ProductsManager from "../../dao/ProductsManager.js";
import productsModels from "../../models/products.models.js";


const Productsrouters = Router();

Productsrouters.get('/products', async (req, res)=> {
    const { query = {} } = req;
    const products = await ProductsManager.get(query)
    res.status(200).json(products);
});

Productsrouters.get('/api/products', async (req,  res) => {
    const { page = 1, limit = 2, sort } = req.query;
    const opts = { page, limit, sort: { price: sort || 'asc' } };
    const criteria = {};
    const result = await productsModels.paginate(criteria, opts);
    res.status(200).json(buildResponse(result));
});

const buildResponse = (data) => {
    return {
        status: 'success',
        payload: data.docs.map(product => product.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}` : '',
        nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}` : '',
    };
};



Productsrouters.get('/products/:_id', async (req, res)=> {
    try {
        const { params:  { _id } } = req;
        const products = await ProductsManager.getById(_id)
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
    
});

Productsrouters.post('/products', async (req, res)=> {
    const { body } = req;
    const product = await ProductsManager.create(body)
    res.status(200).json(product);
});


Productsrouters.put('/products/:_id', async (req, res) => {
    try {
        const { params: { _id }, body } = req;
        await ProductsManager.updateById(_id, body);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

Productsrouters.delete('/products/:_id', async (req, res) => {
    try {
        const { params: { _id } } = req;
        await ProductsManager.deleteById(_id);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

  
export default Productsrouters;

