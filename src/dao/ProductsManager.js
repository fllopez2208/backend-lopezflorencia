import productsModels from "../models/products.models.js";
import { Exception } from '../utils.js';

class ProductsManager {
    static get (query = {}) {
        const criteria = {};
        if(query.code)  {
            criteria.code = query.code;
        }
        return productsModels.find(criteria);
    }

    static async getById(_id) {
        const product = await productsModels.findById(_id);
        if(!product) {
            throw new Exception('No existe el producto', 404);
        }
        return product;
    }

    static async create (data) {
        const product = await productsModels.create(data);
        console.log('Producto creado correctamente');
        return product;
    }   

    static async updateById(_id, data) {
        const product = await productsModels.findById(_id);
        if (!product) {
            throw new Exception('No existe el producto', 404);
        }
        const operation = { $set: data };
        await productsModels.updateOne({ _id: product._id }, operation);
        console.log('Producto actualizado con éxito');
    }
    
    static async deleteById(_id) {
        const product = await productsModels.findById(_id);
        if (!product) {
            throw new Exception('No existe el producto', 404);
        }
    
        await productsModels.deleteOne({ _id: product._id }); 
        console.log('Producto eliminado correctamente.');
    }
    
}

export default ProductsManager;
