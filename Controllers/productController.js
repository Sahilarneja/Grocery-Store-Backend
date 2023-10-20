const mongoose = require('mongoose');
const productModel = require('../Model/productModel');
const { v4 } = require('uuid');

const GetProductsController = async (req, res) => {
  try {
    const products = await productModel.find();

    if (products.length === 0) {
      res.status(404).json({ message: "Products not found" });
    } else {
      res.status(200).json({ products: products });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const AddProductsController=async (request, response) => {
  const { productName, productCategory, productPrice, productDesc } = request.body;
    console.log(request.body);
  try {
    const uuid=v4();
    const productResponse=await productModel.create({
      productId:uuid,
      productName:productName,
      productCategory:productCategory,
      productPrice:productPrice,
      productDesc: productDesc
    });
    if(productResponse && productResponse._id){
      response.status(201).json({message:"Product Created Successfully",data:productResponse});
    }else{
      response.status(404).json({message:"Product Not created"});
    }
  } 
  catch (error) {
    console.log("error creating product",error);
    response.status(500).json({message:"Internal server error"});
    
  }
};
const UpdateProductsController = async (req, res) => {
  const productId = req.params.id;
  const { productName, productCategory, productPrice, productDesc } = req.body;
  try {
    const updateProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        productName: productName,
        productCategory: productCategory,
        productPrice: productPrice,
        productDesc: productDesc
      },
      { new: true } // Return the updated product
    );
    if (!updateProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteProductsController=async(req,res)=>{
  const productId = req.params.id;

  try {
    const product=await productModel.findByIdAndDelete(new mongoose.Types.ObjectId(productId));
    if(!product){
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {GetProductsController,AddProductsController,UpdateProductsController,DeleteProductsController};
