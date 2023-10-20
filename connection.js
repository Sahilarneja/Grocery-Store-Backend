const {default:mongoose}=require('mongoose');

const url="mongodb+srv://sahilarneja2003:123@cluster0.cupmucf.mongodb.net/Grocery?retryWrites=true&w=majority";

const connection=()=>{
    mongoose.connect(url).then(()=>{
        console.log("connected to database");
    }).catch((error)=>{
        console.log("error connecting to database",error);
    })
}

module.exports=connection;