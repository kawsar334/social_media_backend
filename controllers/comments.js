

const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

// create comment
const addComment = async (req, res, next) => {
    try {
        const comment = new Comment({
            userId: req.user.id,
            postId: req.params.postId,
            ...req.body,
        });

        const saveComment = await comment.save();

        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            { $push: { comments: comment._id } },
            { new: true } 
        );

        if (!saveComment) {
            return res.status(200).json({
                success: false,
                message: "Failed to add comment",
            });
        }

        // Send notifications to followers
        const user = await User.findById(req.user.id);
        const followers = user.followers;

        await Promise.all(
            followers.map(async (follower) => {
                const followerUser = await User.findById(follower);
                if (followerUser) {
                    followerUser.notifications.push({
                        message: `${user.username} commented on a post`,
                        user: user.username,
                        post: post._id,
                        createdAt: saveComment.createdAt,
                    });
                    await followerUser.save();
                }
            })
        );

        // Respond with success and the saved comment
        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            comment: saveComment,
        });

    } catch (err) {
        next(err);
    }
};

// update comment
const updateComment = async (req, res, next) => {
    try {

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }
    res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        comment,
    })

    } catch (err) {
        next(err);
    }
}
// delete comment
const deleteComment = async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        })  

    } catch (err) {
        next(err);
    }
}
// get comments

const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Comment list",
            comments,
        })

    } catch (err) {
        next(err);
    }
}


module.exports = { addComment, updateComment, deleteComment, getComments };