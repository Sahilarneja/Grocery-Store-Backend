const loginModel = require('../Model/loginModel');
const encryptPassword = require('../utils/bcrypt');

const adminLogin=async (req,res)=>{
    try {
        const {email,password} = req.body;
        const admin=await loginModel.findOne({email});

        if(!admin || admin.userType !== 'Admin'){
            return res.status(400).json({message:"Invalid admin credentials"});
        }

        const isPasswordValid=encryptPassword.matchPwd(password, admin.password);
        if(isPasswordValid){
            return res.status(200).json({message:"Admin Login Successful"});
        }else{
            return res.status(400).json({message:"Invalid admin credentials"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await loginModel.findOne({email});

        if(!user || user.userType !== 'User'){
            return res.status(400).json({message:"Invalid user credentials"});
        }
        const isPasswordValid=encryptPassword.matchPwd(password,user.password);
        if(isPasswordValid){
            return res.status(200).json({message:"User login successful"});
        }else{
            return res.status(500).json({message:"Internal Server Error"});
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal error' });
    }
};

const loginController=async(req,res)=>{
    try {
        const{email,password,userType}=req.body;
        const login=await loginModel.findOne({email});

        if(!login){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordValid=encryptPassword.matchPwd(password,login.password);
        if(isPasswordValid){
            if(userType==="Admin"){
                console.log("request forwarded to admin login")
                return adminLogin({...req, body: {...req.body,userType}}, res);
            }else{
                console.log("request forwarded to user login");
                return userLogin({...req, body: {...req.body,userType}},res);
            }
        }else{
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}

const registerController = async (req, res) => {
    try {
        const { username, email, password, userType } = req.body;
        const hashedPwd=encryptPassword.hasPwd(password);
        console.log('Trying to insert user with email: ',email);
        const login = await loginModel.create({
            username: username,
            email: email,
            password: hashedPwd,
            userType: userType
        });

        if (login) {
            res.status(201).send({ message: "User Registered Successfully" });
        } else {
            res.status(500).send({ message: "Failed to register user" });
        }
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            res.status(400).json({ message: 'already exists' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal error' });
        }

    }
};

module.exports = { registerController, loginController };
