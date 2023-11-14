import CartModel from "../models/carts.models.js";
import { Exception } from '../utils.js';

class CartsManager {

    static async getAllCarts() {
        const carts = await CartModel.find().populate('products.product');
        return carts.map(cart => ({
            _id: cart._id,
            products: cart.products.map(productInCart => ({
                productId: productInCart.product._id,
                title: productInCart.product.title,
                description: productInCart.product.description,
                price: productInCart.product.price,
                code: productInCart.product.code,
                stock: productInCart.product.stock,
                quantity: productInCart.quantity,
            })),
        }));
    }
    
    


    static async addToCart(cartData) {
        const cart = await CartModel.create(cartData);
        console.log('Producto agregado al carrito correctamente');
        return cart;
    }

    static async deleteProductFromCart(_id, productId) {
        const cart = await CartModel.findById(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        cart.products = cart.products.filter(productInCart => productInCart.toString() !== productId);

        await cart.save();
        console.log('Producto eliminado del carrito correctamente.');
        return cart;
    }

    static async updateCart(_id, products) {
        const cart = await CartModel.findById(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        cart.products = products;

        await cart.save();
        console.log('Carrito actualizado con éxito.');
        return cart;
    }

    static async updateProductQuantity(_id, productId, quantity) {
        const cart = await CartModel.findById(_id);
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

    static async deleteCart(_id) {
        console.log('Deleting cart with _id:', _id);
        const cart = await CartModel.findByIdAndDelete(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }
        console.log('Carrito eliminado correctamente.');
        return cart;
    }

    

    

    static async getCartProductDetails(_id) {
            const cart = await CartModel.findById(_id).populate({
                path: 'products.product',
                model: 'products',
            });
            if (!cart) {
                throw new Exception('No existe el carrito', 404);
            }

            const cartDetails = {
                _id: cart._id,
                products: cart.products.map(productInCart => ({
                    productId: productInCart.product._id,
                    title: productInCart.product.title,
                    description: productInCart.product.description,
                    price: productInCart.product.price,
                    code: productInCart.product.code,
                    stock: productInCart.product.stock,
                    quantity: productInCart.quantity,
                })),
            };

            return cartDetails;
    }



}

export default CartsManager;
