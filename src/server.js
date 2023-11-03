import http from 'http';
import __dirname from './utils.js';
//import path from 'path';
//import { Server } from 'socket.io';
//import ProductManager from './ProductManager.js';
import app from './app.js';
import { init } from './db/mongodb.js'

await init();

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

export default server;

//const io = new Server(server);
//const productManager = new ProductManager(path.join(__dirname,'./products.json'));

// io.on('connection', (socket) => {
//   console.log('New client connected 🎉', socket.id);

//   socket.on('newProduct', async (data) => {
//     try {
//       const newProduct = await productManager.addProduct(data);
//       const updatedProducts = await productManager.getProducts();
//       io.emit('productUpdate', updatedProducts);
//     } catch (error) {
//       console.error('Error adding new product:', error);
//     }
//   });

//   socket.on('deleteProduct', async (id) => {
//     try {
//       let idParsed = parseInt(id);
//       const updatedProducts = await productManager.deleteProduct(idParsed);
//       console.log(updatedProducts, "updated")
//       socket.emit('productUpdate', updatedProducts);
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   });
// });


