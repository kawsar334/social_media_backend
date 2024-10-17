

const Post = require("../models/Post");


// create post 
const createPost= async()=>{
    try{
        const post = new Post({
          ...req.body ,
          userId:req.userId
        });
        const newPost = await post.save();

        res.status(200).json({
            message: "Post created successfully",
            success: true,
            data: newPost,
        });


    }catch(err){
        res.json({
            message: "Error creating post",
            success: false,
        })
        console.log(err);
    }
}
// updated post 
// delete a post 
// get all posts
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
// get single post 
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



module.exports = { createPost, getAllPosts, getSinglePost };  
   