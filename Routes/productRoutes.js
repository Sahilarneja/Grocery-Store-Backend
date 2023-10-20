const express=require('express');
const productRoutes=express.Router(); //used for handling operations

const {GetProductsController,AddProductsController,UpdateProductsController,DeleteProductsController}=require('../Controllers/productController');


productRoutes.get('/getallProducts',GetProductsController);
productRoutes.post('/addProducts',AddProductsController);
productRoutes.put('/updateProduct/:id', UpdateProductsController);
productRoutes.delete('/deleteProduct/:id', DeleteProductsController);
module.exports=productRoutes;