import CartModel from "../models/carts.models.js";
import { Exception } from '../utils.js';
import productsModels from "../models/products.models.js";

class CartsManager {

    static get (query = {}) {
        const criteria = {};
        if(query.code)  {
            criteria.code = query.code;
        }
        return CartModel.find(criteria);
    }
    
    
    static async addToCart(cartData) {
        const { _id } = cartData;
    
        try {
            const product = await productsModels.findById(_id);
    
            if (!product) {
                throw new Exception('No existe el producto', 404);
            }
    
            const newCart = await CartModel.create({ product: product._id, quantity: 1 });
    
            console.log('Producto agregado al carrito correctamente');
            return newCart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error.message);
            throw error;
        }
    }
    
     



    static async deleteProductFromCart(_id, productId) {
        const cart = await CartModel.findById(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        const productIndex = cart.product.findIndex(p => p.product.toString() === productId);
        if (productIndex === -1) {
            throw new Exception('No existe el producto en el carrito', 404);
        }

        cart.product.splice(productIndex, 1);
        await cart.save();

        console.log('Producto eliminado del carrito correctamente.');
    }

    static async updateCart(_id, product) {
        const cart = await CartModel.findById(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        cart.product = product._id;

        await cart.save();
        console.log('Carrito actualizado con éxito.');
        return cart;
    }

    static async updateProductQuantity(_id, productId, quantity) {
        const cart = await CartModel.findById(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }
    
        const productToUpdate = cart.product.find(p => p.product.toString() === productId);
    
        if (productToUpdate) {
            productToUpdate.quantity = quantity;
        }
    
        await cart.save();
        console.log('Cantidad de producto actualizada en el carrito.');
        return cart;
    }
    

    static async removeAllFromCart(_id) {
        const cart = await CartModel.findById(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        cart.product = [];
        await cart.save();

        console.log('Todos los productos eliminados del carrito correctamente.');
    }

    static async getCartDetail(_id) {
        try {
            const cartDetail = await CartModel.findById(_id);
            if (!cartDetail) {
                throw new Exception('No existe el carrito', 404);
            }
            return cartDetail;
        } catch (error) {
            console.error('Error al obtener el detalle del carrito:', error.message);
            throw error; 
    }

    }
}

export default CartsManager
