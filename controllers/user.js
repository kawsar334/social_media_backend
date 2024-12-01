



const bcrypt = require("bcryptjs/dist/bcrypt");
const User= require("../models/User")

// get users
const getUsers = async(req, res,next)=>{
    let newUser = req.query.new
    try{
        let users = []

        if(newUser){
            users = await User.find().sort({createdAt:-1});
            
        }else{
            users = await User.find();            
        }
        return res.status(200).json({
            message:"users list ",
            success:true,
            users
                })

    }catch(err){
        next(err);
    }
}

// search user 

const searchUser = async(req, res, next)=>{
    try{
        const query = req.query.username;
        let users;
        if(query){
            users = await User.find({username:{$regex:query, $options:"i"}})
        } else{
            users = await User.find();
        }

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

const Follow = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        if (!user.followers.includes(req.user.id)) {
            await User.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { followers: req.user.id } },
                { new: true } 
            );
        } else {
            return res.status(200).json({
                message: "You are already following this user",
                success: false,
            });
        }

        // Fetch the updated user after adding the follower
        const updatedUser = await User.findById(req.params.id);

        return res.status(200).json({
            message: "Follower added",
            success: true,
            user: updatedUser,
        });
    } catch (err) {
        next(err);
    }
};


// unfollow
const unfollow = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        if (user.followers.includes(req.user.id)) {
            await User.findByIdAndUpdate(
                req.params.id,
                { $pull: { followers: req.user.id } },
                { new: true } 
            );
        } else {
            return res.status(400).json({
                message: "You are not following this user",
                success: false,
            });
        }
        const updatedUser = await User.findById(req.params.id);

        return res.status(200).json({
            message: "Follow removed",
            success: true,
            user: updatedUser,
        });
    } catch (err) {
        next(err); 
    }
};


// get my follower 

const getMyFollowers = async(req, res, next)=>{
    try{

        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"user not found", success:false})
        }
        const followers = await User.find({
            _id: { $in: user.followers },
        })
       
        return res.status(200).json({
            message:"followers list",
            success:true,
            followers
                })

    }catch(err){
        console.log(err)
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
 const getUserPosts = async(req, res, next)=>{
    try{
        const posts = await Post.find({ userId: req.params.id });
        if(!posts){
            return res.status(404).json({message:"posts not found", success:false})
        }
        return res.status(200).json({
            message:"user posts",
            success:true,
            posts
                });
    }catch(err){
        next(err);
    }
}


// suggest friend
const suggestFriend = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.user.id);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const suggestedFriends = await User.aggregate([
            {
                $match: {
                    _id: { $ne: currentUser._id },
                    _id: { $nin: currentUser.followers } 
                }
            },
            { $sample: { size: 5 } } 
        ]);

        // const suggestedFriends = await User.find({
        //     _id: { $ne: currentUser._id }, 
        //     _id: { $nin: currentUser.followers }
        // }).limit(5);

        return res.status(200).json({
            message: "Suggested friends retrieved successfully",
            success: true,
            suggestedFriends,
        });
    } catch (err) {
        next(err);
    }
};




module.exports = { getUsers, getUserById, updateUser, deleteUser, updatePassword, Follow, getMyFollowers, unfollow, getMyFollowing, updateProfilePicture, searchUser, suggestFriend };