

const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
    
    try {
        const posts = await Post.find(); 
        res.json({
            message: "Posts retrieved successfully",
            success: true,
            data: posts,
        });
      
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server Error",
            success: false,
        }); 
    }
};

const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ 
                message: "Post not found",
                success: false,
            });
        }
        res.json({
            message: "Post retrieved successfully",
            success: true,
            data: post,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server Error",
            success: false,
        });   
    }
};

module.exports = { getAllPosts, getSinglePost };  
   