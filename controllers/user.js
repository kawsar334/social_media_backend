



const User= require("../models/User")

// get users

const getUsers = async(req, res,next)=>{
    try{
        const users = await User.find();
        return res.status(200).json({
            message:"users list ",
            success:true,
            users
                })

    }catch(err){
        next(err);
    }
}
// get single user by id 
// update user
// delete user
// add follower 
// get my follower 
// add following



module.exports = {getUsers}