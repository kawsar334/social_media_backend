
const Post = require("../models/Post");

// Add post
const addPost = async (req, res, next) => {
    try {
        const post = new Post({
            userId: req.user.id,
            ...req.body,
        });
        const savePost = await post.save();

        if (!savePost) {
            return res.status(200).json({
                message: "something went wrong !",
                success: false,

            })
        }
        return res.status(200).json({
            message: "post  created !",
            success: true,
            savePost,
        })

    } catch (err) {
        next(err);
    }
}
//update post
const updatePost = async (req, res, next) => {
    try {

        const post = await Post.findByIdAndUpdate(req.params.postId, { $set: req.body }, { new: true });
        if (!post) {
            return res.status(200).json({
                message: "Post Not found !",
                success: false,
            })
        }
        return res.status(200).json({
            message: "post  updated !",
            success: true,
            post,
        })

    } catch (err) {
        console.log(err);
        next(err);
    }
}

// DELETE POST
const deletePost = async (req, res, next) => {
    try {

        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "post hasbeen deleted ",
            success: true,
        });

    } catch (err) {
        next(err);
    }
}
// get single post
const getSinglePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(200).json({
                message: "post Not Found!  ",
                success: false,
            });
        }
        return res.status(200).json({
            message: "post details",
            success: true,
            post
        });

    } catch (err) {
        next(err);
    }
}
// get all posts
const getAllPost = async (req, res, next) => {
    const postQuery = req.query.new;
    try {
        let posts;
        if (postQuery) {
            posts = await Post.find({}).sort({createdAt:-1})
        }else{
            posts = await Post.find({});
            return res.status(200).json({
                message: "post list ",
                success: true,
                posts
            });
        }
    } catch (err) {
        next(err);
    }
}

// like post
const Likes = async (req, res, next) => {
    try {

        const post = await Post.findById(req.params.postId);
        if (!post.likes.includes(req.user.id)) {
            await Post.findByIdAndUpdate(req.params.postId, { $push: { likes: req.user.id } }, { new: true });
            return res.status(200).json({
                message: "post liked successfully",
                success: true
            })
        } else {
            return res.status(200).json({
                message: "user Already liked this post",
                success: true
            })
        }
    } catch (err) {
        next(err);
    }
}
//dislike post
const unlikes = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (post.likes.includes(req.user.id)) {
            await Post.findByIdAndUpdate(req.params.postId, { $pull: { likes: req.user.id } });
        }
        if (!post.unlikes.includes(req.user.id)) {
            await Post.findByIdAndUpdate(req.params.postId, { $push: { unlikes: req.user.id } })

        }
        return res.status(200).json({
            message: "disliked post",
            success: true
        });
    } catch (err) {
        console.log(err)
        next(err);

    }

}


module.exports = { addPost, updatePost, deletePost, getSinglePost, getAllPost, Likes, unlikes }



