const mongoose = require('mongoose');
const userModel = require('../Model/userModel');
const { v4 } = require('uuid');

const GetUserProductsController = async (req, res) => {
  try {
    const userProduct = await userModel.find();

    if (userProduct.length === 0) {
      res.status(404).json({ message: "Products not found" });
    } else {
      res.status(200).json({ userProduct: userProduct });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const AddUserProductsController=async (request, response) => {
  const { productName, productQuantity } = request.body;
    console.log(request.body);
  try {
    const uuid=v4();
    const userproductResponse=await userModel.create({
      productId:uuid.slice(0,5),
      productName:productName,
      productQuantity:productQuantity,
      
    });
    if(userproductResponse && userproductResponse._id){
      response.status(201).json({message:"Product Created Successfully",data:userproductResponse});
    }else{
      response.status(404).json({message:"Product Not created"});
    }
  } 
  catch (error) {
    console.log("error creating product",error);
    response.status(500).json({message:"Internal server error"});
    
  }
};

const UpdateUserProductsController = async (req, res) => {
    const productId = req.params.id;
    const { productName, productQuantity } = req.body;
    try {
      const updateUserProduct = await userModel.findByIdAndUpdate(
        productId,
        {
          productName: productName,
          productQuantity: productQuantity
        },
        { new: true } // Return the updated product
      );
      if (!updateUserProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  const DeleteUserProductsController=async(req,res)=>{
    const productId = req.params.id;
  
    try {
      const userProduct=await userModel.findByIdAndDelete(new mongoose.Types.ObjectId(productId));
      if(!userProduct){
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
module.exports={GetUserProductsController,AddUserProductsController,UpdateUserProductsController,DeleteUserProductsController};