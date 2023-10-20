const {default:mongoose}=require('mongoose');

const userSchema=new mongoose.Schema({
    productId: {type: String, unique:true, required:true},
    productName: {type:String, unique:false, required:true},
    productQuantity: {type:String, required:true},
    
})

const userModel=mongoose.model('userData',userSchema);

module.exports=userModel;