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

    static async getById(sid) {
        const product = await productsModels.findById(sid);
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

    static async updateById(sid, data) {
        const product = await productsModels.findById(sid);
        if(!product) {
            throw new Exception('No existe el producto', 404);
        }
        const criteria = { _id: sid };
        const operation = { $set: data };
        await productsModels.updateOne(criteria, operation);
        console.log('Producto actualizado con éxito');
    }

    static async deleteById(sid) {
        const product = await productsModels.findById(sid);
        if(!product) {
            throw new Exception('No existe el producto', 404);
        }
        const criteria = { _id: sid };
        await productsModels.deleteOne(criteria);
        console.log('Producto eliminado correctamente.');
    }
}

export default ProductsManager;
