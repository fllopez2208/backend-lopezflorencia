import { Router } from "express";
import ProductsManager from "../../dao/ProductsManager.js";
import productsModels from "../../models/products.models.js";


const Productsrouters = Router();

Productsrouters.get('/products', async (req, res)=> {
    const { query = {} } = req;
    const products = await ProductsManager.get(query)
    res.status(200).json(products);
});

Productsrouters.get('/api/products', async (req,  res) => {
    const { page = 1, limit = 2 } = req.query;
    const opts = { page, limit };
    const criteria = {};
    const result = await productsModels.paginate(criteria, opts);
    res.status(200).json(buildResponse(result));
});

const buildResponse = (data) => {
    return {
        status: 'success',
        payload: data.docs.map(product => product.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}` : '',
        nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}` : '',
    };
};



Productsrouters.get('/products/:_id', async (req, res)=> {
    try {
        const { params:  { _id } } = req;
        const products = await ProductsManager.getById(_id)
        res.status(200).json(products);
    } catch (error) {
        res.status(error.statusCode || 500).json({message: error.message});
    }
    
});

Productsrouters.post('/products', async (req, res)=> {
    const { body } = req;
    const product = await ProductsManager.create(body)
    res.status(200).json(product);
});


Productsrouters.put('/products/:_id', async (req, res) => {
    try {
        const { params: { _id }, body } = req;
        await ProductsManager.updateById(_id, body);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

Productsrouters.delete('/products/:_id', async (req, res) => {
    try {
        const { params: { _id } } = req;
        await ProductsManager.deleteById(_id);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});



// function generateUniqueId(products) {
//     let newId;
//     do {
//     newId = Math.floor(Math.random() * 1000000); 
//     } while (products.some((product) => product.id === newId));
//     return newId;
// }

// Productsrouters.get('/products', async (req, res) => {
   
//     const products = await productManager.getProducts();
//     const limit = req.query.limit;
//     if(limit){
//     res.send(products.slice (0,limit));
//     } else {
//     res.status(200).json(products)
//     }

// });

// Productsrouters.get('/products/:id', async (req, res) => {
//     const productId = parseInt(req.params.id);

//     if (isNaN(productId)) {
    
//     res.status(400).send('El parámetro id debe ser un número válido');
//     return;
//     }

//     const product = await productManager.getProductById(productId);
//     if (!product) {
//     res.status(404).send('Producto no encontrado');
//     } else {
//         res.status(200).json(product);
//     }
// })

// Productsrouters.post('/products', async (req, res) => {
//     try {
//       const products = await productManager.getProducts();
  
//       const { title, description, price, thumbnail, category, code, stock } = req.body;
  
//       if (!title || !description || !price || !category || !code || !stock) {
//         throw new Error('Todos los campos son obligatorios.');
//       }
  
//       const existingProduct = products.find((p) => p.code === code);
  
//       if (existingProduct) {
//         throw new Error(`Ya existe un producto con el código ${code}.`);
//       }
  
//       const id = generateUniqueId(products);
  
//       const newProduct = {
//         id,
//         title,
//         description,
//         price,
//         thumbnail: req.body.thumbnail,
//         category, 
//         code,
//         stock,
//         status: true, 
//       };
  
//       products.push(newProduct);
  
//       await productManager.saveProducts(products);
  
//       res.status(201).json(newProduct);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
// });

// Productsrouters.put('/products/:id', async (req, res) => {
//     const productId = parseInt(req.params.id);

//     if (isNaN(productId)) {
//         res.status(400).send('El parámetro id debe ser un número válido');
//         return;
//     }

//     try {
//         const products = await productManager.getProducts();
//         const productIndex = products.findIndex((product) => product.id === productId);

//         if (productIndex === -1) {
//             res.status(404).send('Producto no encontrado');
//             return;
//         }

//         const updatedProduct = {
//             ...products[productIndex],
//             ...req.body, 
//             id: productId, 
//         };

//         products[productIndex] = updatedProduct;

//         await productManager.saveProducts(products);

//         res.status(200).json(updatedProduct);

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }

//     });

// Productsrouters.delete('/products/:id', async (req, res) => {
//     const productId = parseInt(req.params.id);

//     if (isNaN(productId)) {
//         res.status(400).send('El parámetro id debe ser un número válido');
//         return;
//     }

//     try {
//         const products = await productManager.getProducts();
//         const productIndex = products.findIndex((product) => product.id === productId);

//         if (productIndex === -1) {
//             res.status(404).send('Producto no encontrado');
//             return;
//         }

//         products.splice(productIndex, 1);

//         await productManager.saveProducts(products);

//         res.status(204).send(); 
    
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });


  
export default Productsrouters;