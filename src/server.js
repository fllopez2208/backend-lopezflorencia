import http from 'http';
import __dirname from './utils.js';
import path from 'path';
import { Server } from 'socket.io';
import app from './app.js';
import ProductManager from './ProductManager.js';

const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

const productManager = new ProductManager(path.join(__dirname,'../products.json'));

io.on('connection', (socket) => {
  console.log('New client connected 🎉', socket.id);

  socket.on('newProduct', async (data) => {
    try {
      const newProduct = await productManager.addProduct(data);
      const updatedProducts = await productManager.getProducts();
      io.emit('productUpdate', updatedProducts);
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  });

  socket.on('deleteProduct', async (id) => {
    try {
      await productManager.deleteProduct(id);
      const updatedProducts = await productManager.getProducts();
      io.emit('productUpdate', updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

export default server;
