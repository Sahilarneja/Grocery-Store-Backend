const mongoose = require('mongoose');

const loginSchema=new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    userType:{type:String,required:true}
})

const loginModel=mongoose.model('loginData',loginSchema);

module.exports=loginModel;