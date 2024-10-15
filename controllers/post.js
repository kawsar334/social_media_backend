


const Post = require("../models/Post")

const getAllPosts = async (req, res) => {

    try {

        const post = await Post.find();
        res.json({
            message: "Hello World!",
            success: true,
            data: post,
        });
        console.log(post) 

    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }


}


const getSinglePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)
        res.json({
            message: "Hello World!",
            success: true,
            data: post,
        });
        console.log(post)

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }


}

module.exports = {getAllPosts , getSinglePost}