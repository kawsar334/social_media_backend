


const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")


// register user 
const Register = async(req, res,next)=>{
    try{
        const userExist = await User.findOne({email:req.body.email});
        if(userExist){
            return res.status(200).json({message:"User already Exist", success:false});
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10); 
            const user = new User({
                ...req.body, 
                password: hashedPassword,
            });

            await user.save();
            res.status(200).json({message:"User Registered Successfully", success:true});
        }
    }catch(err){
        next(err);
    }
}

// login user
const Login = async(req, res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(200).json({message:"User not found", success:false});
        }
        const hashedPassword = await bcrypt.compare(req.body.password, user.password);
        if(!hashedPassword){
            return res.status(200).json({message:"Invalid password", success:false});
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRETE, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true, 
            maxAge: 24 * 60 * 60 * 1000 
        });
        res.status(200).json({message:"User logged in successfully", success:true, token});
    }catch(err){
        next(err);
    }
}

module.exports = { Register, Login };  