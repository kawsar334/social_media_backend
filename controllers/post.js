

const Post = require("../models/Post");
const User = require("../models/User");



// create post 
const createPost = async (req, res, next) => {
    console.log("req.body")
    // try {
    //     const user = await User.findById(req.user.id);
    //     const post = new Post({
    //         ...req.body,
    //         userId: req.user.id,
    //     });

    //     const newPost = await post.save();
    //     console.log(newPost)

        // if (newPost) {
        //     user.posts.push(newPost._id);
        //     await user.save();

        //     const followers = user.followers;


        //     await Promise.all(followers.map(async (follower) => {
        //         const followerUser = await User.findById(follower);
        //         if (followerUser) { // Check if follower exists
        //             followerUser.notifications.push({
        //                 message: `${user.username} created a new post`,
        //                 user: user.username,
        //                 post: newPost._id,
        //                 createdAt: newPost.createdAt,
        //             }); 
        //             await followerUser.save();
        //         }
        //     }));
    //     }
    //     return res.status(200).json({
    //         message: "Post created successfully",
    //         success: true,
    //         data: newPost,
    //     });
    // } catch (err) {
    //     next(err);
    // }
};


// updated post 
const updatePost = async (req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }
        res.json({
            message: "Post updated successfully",
            success: true,
            data: updatedPost,
        });

    } catch (err) {
        next(err);
    }
}
// delete a post 
const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.json({
            message: "Post deleted successfully",
            success: true,
        });
        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }
        const user = await User.findById(req.user.id);
        if (user) {
            user.posts.pull(req.params.id);
            await user.save();
        }
        res.json({
            message: "Post deleted successfully",
            success: true,
        });

    } catch (err) {
        next(err);
    }
}
// get all posts
const getAllPosts = async (req, res) => {
    const query = req.query.new;
    let posts = [];
    try {
        if (query) {
            posts = await Post.find({}).sort({ createdAt: -1 })
        } else {

            posts = await Post.find();
        }
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

// get all posts from friends for the news feed
const getNewsFeedPosts = async (req, res, next) => {
    // const query = req.query.new;
    try {
        const user = await User.findById(req.user.id).populate('followers');
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        const posts = await Post.find({
            userId: { $in: user.followers }
        }).sort({ createdAt: -1 });

        res.json({
            message: "Posts retrieved successfully",
            success: true,
            data: posts,
        });

    } catch (err) {
        next(err);
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

// search post
const searchPost = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;
        const posts = await Post.find({ title: { $regex: keyword, $options: 'i' } });
        res.json({
            message: "Posts retrieved successfully",
            success: true,
            data: posts,
        });

    } catch (err) {
        next(err);
    }
}

// like post


const Likes = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId)
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }
        if (!post.likes.includes(req.user.id)) {
            await Post.findByIdAndUpdate(req.params.postId, { $push: { likes: req.user.id } });
            res.json({
                message: "Post liked successfully",
                success: true,
            });
        } else {
            return res.json({
                message: "You already Liked this post",
                success: false,
            });
        }

    } catch (err) {
        next(err);
    }
}

// unlike post
const unLikes = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
            });
        }
        if (post.likes.includes(req.user.id)) {
            await Post.findByIdAndUpdate(req.params.postId, { $pull: { likes: req.user.id } });
            res.json({
                message: "Post liked successfully",
                success: true,
            });
        } else {
            await Post.findByIdAndUpdate(req.params.postId, { $push: { likes: req.user.id } });
            res.json({
                message: "Post liked successfully",
                success: true,
            });
        }

    } catch (err) {
        next(err);
    }
}


const timelinePosts = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const posts = await Post.find({
            userId: req.params.id
        }
        ).sort({ createdAt: -1 });
        return res.json({
            message: "user posts ",
            success: true,
            data: posts,

        });
    } catch (err) {
        console.log(err)
        next(err);
    }
}

module.exports = { createPost, updatePost, deletePost, getAllPosts, getNewsFeedPosts, timelinePosts, getSinglePost, searchPost, Likes, unLikes };
