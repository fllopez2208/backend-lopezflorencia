import fs from 'fs';


class ProductManager {
  constructor(path) {
    this.path = path;
  }


  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;

    let products = await this.getProducts()

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('Todos los campos son obligatorios.');
    }
    
    const existingProduct = products.find((p) => p.code === code);
    if (existingProduct) {
    throw new Error(`Ya existe un producto con el código ${code}.`);
    }

    const id = this.generateUniqueId(products);
    const newProduct = { id, title, description, price, thumbnail, code, stock };
    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  }

  async getProducts() {
    const content = await this.readProductsFile();
    return JSON.parse(content);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);

  }

  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === id);
  
    if (index === -1) {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
  
   
    const isCodeUnique = products.every((product) => product.id === id || product.code !== updatedProduct.code);
  
    if (!isCodeUnique) {
      throw new Error(`El código ${updatedProduct.code} ya está en uso por otro producto.`);
    }
  
    updatedProduct.id = products[index].id;
  
    for (const key in updatedProduct) {
      if (key !== 'id' && key !== 'title' && key !== 'description' && key !== 'price' && key !== 'thumbnail' && key !== 'code' && key !== 'stock') {
        throw new Error(`No se pueden agregar propiedades adicionales al producto: ${key}`);
      }
    }
  
    products[index] = {
      ...products[index],
      title: updatedProduct.title || products[index].title,
      description: updatedProduct.description || products[index].description,
      price: updatedProduct.price || products[index].price,
      thumbnail: updatedProduct.thumbnail || products[index].thumbnail,
      code: updatedProduct.code || products[index].code,
      stock: updatedProduct.stock || products[index].stock,
    };
  
    await this.saveProducts(products);
  }
  
  

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    await this.saveProducts(updatedProducts);
  }

  async readProductsFile() {
    if (!await this.existFile(this.path)) {
      return '[]';
    }

    try {
      return await fs.promises.readFile(this.path, 'utf-8');
    } catch (error) {
      throw new Error(`El archivo ${this.path} no pudo ser leído.`);
    }
  }

  async saveProducts(products) {
    const content = JSON.stringify(products, null, '\t');
    try {
      await fs.promises.writeFile(this.path, content, 'utf-8');
    } catch (error) {
      throw new Error(`El archivo ${this.path} no pudo ser escrito.`);
    }
  }

  async existFile(path) {
    try {
      await fs.promises.access(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  generateUniqueId(products) {
    if (products.length === 0) {
      return 1;
    }
    const ids = products.map((product) => product.id);
    return Math.max(...ids) + 1;
  }

  
}




export default ProductManager;
