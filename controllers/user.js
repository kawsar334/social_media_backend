const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");

// UPDATE USER
const updateuser = async (req, res, next) => {
    try {
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        return res.status(200).json({ message: "user updated successfully", success: true, updatedUser });
    } catch (err) {
        console.log(err)
        next(err);
    }

}

// update password
const updatePassword = async(req, res,next)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const update = await User.findByIdAndUpdate(req.params.id, { $set: { password: hashedPassword } },{new:true});
        if (!update) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({
            message:"password updated",
            success:true,
            update
        })
    }catch(err){
        next(err);
    }
}

// DLETE USER
const deleteuser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "user deleted successfully", success: true,
        })

    } catch (err) {
        next(err);
    }

}

//   GET SINGLE  USER
const getSingleuser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const {pasword, ...others} = user._doc;
        return res.status(200).json({
            message:"user details",
            user:others,
            success:true,
        })

    } catch (err) {
        next(err);
    }

}
//   GET ALL  USER
const getalleuser = async (req, res, next) => {
    const newUsers = req.query.new ;
    const page =parseInt(req.query.page) || "0";
    const itemPerPage = 2;
    try {
        const total = await User.countDocuments({})
        let users;
        if (newUsers){
            users = await User.find().sort({createdAt:-1}).limit(itemPerPage).skip(itemPerPage*page)
        }
        else{
            users = await User.find().limit(itemPerPage).skip(itemPerPage*page) ;
        }
       
        return res.status(200).json({
            message:"user List ",
            success:true,
            users, 
            total:Math.ceil(total / itemPerPage)
          
        });
    } catch (err) {
        next(err);
    }
}

//  search  USER
const Searchuser = async (req, res, next) => {
    const query = req.query.search;
    try {
        let users;
        if(query){
            users = await User.find({username:{$regex:query, $options:"i"}})
        }else{
            users = await User.find();
        }

        return res.status(200).json({
            message:"users list ",
            success:true,
            users
                })

    } catch (err) {
        next(err);
    }
}

// readnotification

const readnotification = async(req, res,next)=>{
    try{


    }catch(err){
        next(err);
    }
}


module.exports = { updateuser, deleteuser, getSingleuser, getalleuser, Searchuser, updatePassword, readnotification }