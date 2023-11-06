// import fs from 'fs';

// class ProductManager {
//   constructor(filePath) {
//     this.filePath = filePath;
//   }

//   static generateUniqueId(products) {
//     if (products.length === 0) {
//       return 1;
//     }
//     const ids = products.map((product) => product.id);
//     return Math.max(...ids) + 1;
//   }

//   async addProduct(product) {
//     const { title, description, price, thumbnail, code, stock } = product;

//     let products = await this.getProducts();

//     const existingProduct = products.find((p) => p.code === code);
//     if (existingProduct) {
//       throw new Error(`Ya existe un producto con el código ${code}.`);
//     }

//     const id = ProductManager.generateUniqueId(products);
//     const newProduct = { id, title, description, price, thumbnail, code, stock };
//     products.push(newProduct);
//     await this.saveProducts(products);
//     return newProduct;
//   }

//   async getProducts() {
//     const content = await this.readProductsFile();
//     return JSON.parse(content);
//   }

//   async getProductById(id) {
//     const products = await this.getProducts();
//     return products.find((product) => product.id === id);
//   }

//   async updateProduct(id, updatedProduct) {
//     const products = await this.getProducts();
//     const index = products.findIndex((product) => product.id === id);

//     if (index === -1) {
//       throw new Error(`Producto con ID ${id} no encontrado.`);
//     }

//     const isCodeUnique = products.every((product) => product.id === id || product.code !== updatedProduct.code);

//     if (!isCodeUnique) {
//       throw new Error(`El código ${updatedProduct.code} ya está en uso por otro producto.`);
//     }

//     updatedProduct.id = products[index].id;

//     for (const key in updatedProduct) {
//       if (key !== 'id' && key !== 'title' && key !== 'description' && key !== 'price' && key !== 'thumbnail' && key !== 'code' && key !== 'stock') {
//         throw new Error(`No se pueden agregar propiedades adicionales al producto: ${key}`);
//       }
//     }

//     products[index] = {
//       ...products[index],
//       title: updatedProduct.title || products[index].title,
//       description: updatedProduct.description || products[index].description,
//       price: updatedProduct.price || products[index].price,
//       thumbnail: updatedProduct.thumbnail || products[index].thumbnail,
//       code: updatedProduct.code || products[index].code,
//       stock: updatedProduct.stock || products[index].stock,
//     };

//     await this.saveProducts(products);
//   }

//   async deleteProduct(id) {
//     let products = await this.getProducts();
//     products = products.filter((product) => product.id !== id);
//     await this.saveProducts(products);
//     return products;
//   }

//   async readProductsFile() {
//     try {
//       return await fs.promises.readFile(this.filePath, 'utf-8');
//     } catch (error) {
//       throw new Error(`El archivo ${this.filePath} no pudo ser leído.`);
//     }
//   }

//   async saveProducts(products) {
//     const content = JSON.stringify(products, null, 2);
//     try {
//       await fs.promises.writeFile(this.filePath, content, 'utf-8');
//     } catch (error) {
//       throw new Error(`El archivo ${this.filePath} no pudo ser escrito.`);
//     }
//   }
// }

// export default ProductManager;
