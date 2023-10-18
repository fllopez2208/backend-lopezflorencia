import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import ProductManager from './ProductManager.js';


const server = http.createServer(app);
const socketServer = new Server(server);
const PORT = 8080;
const productsPath = './products.json'; 

const productManager = new ProductManager(productsPath);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado 🎉', socket.id);

    socket.on('newProduct', async (data) => {
        try {
            const newProduct = await productManager.addProduct(data);
            const updatedProducts = await productManager.getProducts();
            socketServer.emit('productUpdate', updatedProducts);
        } catch (error) {
            console.error('Error al agregar un nuevo producto:', error);
        }
    });

    socket.on('deleteProduct', async (id) => {
        try {
            const updatedProducts = await productManager.deleteProduct(id);
            socketServer.emit('productUpdate', updatedProducts);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    });
});



server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}/`);
});