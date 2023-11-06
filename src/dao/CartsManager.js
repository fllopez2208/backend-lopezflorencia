import CartModel from "../models/carts.models.js";
import { Exception } from '../utils.js';

class CartsManager {
    static async addToCart(cartData) {
        const cart = await CartModel.create(cartData);
        console.log('Producto agregado al carrito correctamente');
        return cart;
    }

    static async updateCartById(_id, data) {
        const cart = await CartModel.findById(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }
        const operation = { $set: data };
        await CartModel.updateOne(_id, operation);
        console.log('Carrito actualizado con éxito');
    }

    static async deleteFromCartById(_id) {
        const cart = await CartModel.findById(_id);
        if (!cart) {
            throw new Exception('No existe el carrito', 404);
        }

        await CartModel.deleteOne(_id);
        console.log('Producto eliminado del carrito correctamente.');
    }
}

export default CartsManager;
