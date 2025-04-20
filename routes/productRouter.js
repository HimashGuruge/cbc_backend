import express from 'express';
import { getProducts,   getProductByName, deleteProductByname } from '../contollers/product_C.js'; // productController එක import කරනවා.

// Create a new router instance using express.Router()
const productRouter = express.Router();


// Define routes for the productRouter
productRouter.get('/', getProducts);

productRouter.post('/',); // POST request to create a new product.

//productRouter.delete('/', deleteProduct); 

// DELETE request to delete a product by name. The name is expected to be in the request body.
productRouter.delete('/:name', deleteProductByname); // DELETE request to delete a product by name.

productRouter.get('/:name', getProductByName); // GET request to retrieve a product by name.









export default productRouter; // Export the router to be used in other parts of the application.