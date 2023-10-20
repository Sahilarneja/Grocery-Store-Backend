const express= require('express');
const app = express();
const connection=require('./connection');
const productRoutes = require('./Routes/productRoutes');
const loginRoute=require('./Routes/loginRoute')
const userRoutes = require('./Routes/userRoute');

app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', loginRoute);
app.use('/api',userRoutes);

connection();

app.listen(5000,(error)=>{
    if(error){
        console.log("error started at port 5000");
    }
    else{
        console.log("server started at port 5000..");
    }
});