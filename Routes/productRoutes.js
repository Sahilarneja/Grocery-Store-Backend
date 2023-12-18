const express=require('express');
const productRoutes=express.Router(); //used for handling operations
const authenticateJWT = require('../Middleware/authentication'); 

const {GetProductsController,AddProductsController,UpdateProductsController,DeleteProductsController}=require('../Controllers/productController');


productRoutes.get('/getallProducts',authenticateJWT,GetProductsController);
productRoutes.post('/addProducts',authenticateJWT,AddProductsController);
productRoutes.put('/updateProduct/:id', authenticateJWT,UpdateProductsController);
productRoutes.delete('/deleteProduct/:id', authenticateJWT,DeleteProductsController);

module.exports=productRoutes;