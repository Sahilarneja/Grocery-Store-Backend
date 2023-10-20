const {default:mongoose}=require('mongoose');

const productSchema=new mongoose.Schema({
    productId: {type: String, unique:true, required:true},
    productName: {type:String, unique:false, required:true},
    productCategory: {type:String},
    productPrice: {type:String, required:true},
    productDesc: {type:String}
})

const productModel=mongoose.model('productData',productSchema);

module.exports=productModel;