import CartModel from "../models/carts.models.js";
import { Exception } from '../utils.js';
import productsModels from "../models/products.models.js";

class CartsManager {

    static getAllCarts() {
        return CartModel.find(); 
    }
    
    
    static async addToCart(cartData) {
        const { _id } = cartData;
    
        try {
            const product = await productsModels.findById(_id);
    
            if (!product) {
                throw new Exception('No existe el producto', 404);
            }
    
            const newCart = await CartModel.create({
                products: [{ product: product._id, quantity: 1 }]
            });
    
            console.log('Producto agregado a un nuevo carrito correctamente');
            return newCart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error.message);
            throw error;
        }
    }
    
    
    



    



    static async deleteProductFromCart(cid, productId) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex === -1) {
            throw new Exception('No existe el producto en el carrito', 404);
        }

        cart.products.splice(productIndex, 1);
        await cart.save();

        console.log('Producto eliminado del carrito correctamente.');
    }

    static async updateCart(cid, products) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        cart.products = products;

        await cart.save();
        console.log('Carrito actualizado con éxito.');
        return cart;
    }

    static async updateProductQuantity(cid, productId, quantity) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        const product = cart.products.find(p => p.product.toString() === productId);

        if (product) {
            product.quantity = quantity;
        }

        await cart.save();
        console.log('Cantidad de producto actualizada en el carrito.');
        return cart;
    }

    static async removeAllFromCart(cid) {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        cart.products = [];
        await cart.save();

        console.log('Todos los productos eliminados del carrito correctamente.');
    }

    static async getCartDetail(cid) {
        try {
            const cartDetail = await CartModel.findById(cid).populate('products.product');
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
