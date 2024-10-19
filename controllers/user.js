



const bcrypt = require("bcryptjs/dist/bcrypt");
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
const getUserById = async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"user not found", success:false})
        }
        return res.status(200).json({
            message:"user Details",
            success:true,
            user
                })

    }catch(err){
        next(err);
    } 
}
// search user

// update user

const updateUser = async(req, res, next)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
       
    
        if(!user){
            return res.status(404).json({message:"user not found", success:false})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        return res.status(200).json({
            message:"user updated",
            success:true,
            user
                });
    }catch(err){
        next(err);
    }
}

// updated password

const updatePassword = async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"user not found", success:false})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            message:"password updated",
            success:true,
            user
                })

    }catch(err){
        next(err);
    }
}
// updated profile picture

const updateProfilePicture = async(req, res, next)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, { profilePicture: req.body.profilePicture }, {new:true});
        if(!user){
            return res.status(404).json({message:"user not found", success:false})
        }
        return res.status(200).json({
            message:"profile picture updated",
            success:true,
            user
                })

    }catch(err){
        next(err);
    }
}
// update details 

// delete user

const deleteUser = async(req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"user deleted",
            success:true,
        })

    }catch(err){
        next(err);
    }
}

// Follow 

const Follow = async(req, res, next)=>{
    try{
        // const user = await User.findByIdAndUpdate(req.params.id, { $push: { followers: req.body.followerId } })
        // if(!user){
        //     return res.status(404).json({message:"user not found", success:false})
        // }
        // return res.status(200).json({
        //     message:"follower added",
        //     success:true,
        //     user
        //         })

    }catch(err){
        next(err);
    }
}

// UNFOLLOW
const unfollow = async (req, res, next) => {
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, { $push: { following: req.body.followingId } })
        // if (!user) {
        //     return res.status(404).json({ message: "user not found", success: false })
        // }
        // return res.status(200).json({
        //     message: "following added",
        //     success: true,
        //     user
        // })

    } catch (err) {
        next(err);
    }
}
// get my follower 

const getMyFollowers = async(req, res, next)=>{
    try{
        // const user = await User.findById(req.params.id);
        // if(!user){
        //     return res.status(404).json({message:"user not found", success:false})
        // }
        // return res.status(200).json({
        //     message:"followers list",
        //     success:true,
        //     followers:user.followers
        //         })

    }catch(err){
        next(err);
    }
}



// get my following
const getMyFollowing = async(req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:"user not found", success:false})
        }
        return res.status(200).json({
            message:"following list",
            success:true,
            following:user.following
                });
    }catch(err){
        next(err);
    }
}
 // get user posts
//  const getUserPosts = async(req, res, next)=>{
//     try{
//         const posts = await Post.find({ userId: req.params.id });
//         if(!posts){
//             return res.status(404).json({message:"posts not found", success:false})
//         }
//         return res.status(200).json({
//             message:"user posts",
//             success:true,
//             posts
//                 });
//     }catch(err){
//         next(err);
//     }
// }

// suggest friend
    


module.exports = { getUsers, getUserById, updateUser, deleteUser, updatePassword, Follow, getMyFollowers, unfollow, getMyFollowing, updateProfilePicture };