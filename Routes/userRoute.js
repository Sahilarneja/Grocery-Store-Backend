const express=require('express');
const userRoute=express.Router(); //used for handling operations

const {GetUserProductsController,AddUserProductsController,UpdateUserProductsController,DeleteUserProductsController}=require('../Controllers/userController');


userRoute.get('/getUserProducts',GetUserProductsController);
userRoute.post('/addUserProducts',AddUserProductsController);
userRoute.put('/updateUserProduct/:id', UpdateUserProductsController);
userRoute.delete('/deleteUserProduct/:id', DeleteUserProductsController);
module.exports=userRoute;