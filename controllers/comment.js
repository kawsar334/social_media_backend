const Comment = require("../models/Comment");
const Post = require("../models/Post");


// ADD COMMENT 
const addComment = async (req, res, next) => {
    try {
        const comment = new Comment({
            ...req.body,
            userId: req.user.id,
            postId: req.params.id,
        });

        const saveComment = await comment.save();
        if (saveComment) {
            await Post.findByIdAndUpdate(req.params.id, { $push: { comments: saveComment._id } });
        }
        return res.status(200).json({
            message: "comment added successfully",
            success: true,
            saveComment
        })
    } catch (err) {
        next(err);
    }
}

// UPDATE COMMENT
const updateComment = async (req, res, next) => {
    try {
        const update = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!update) {
            return res.status(200).json({
                message: "comment Not found",
                success: false,

            })
        }
        return res.status(200).json({
            message: "comment updated successfully",
            success: true,
            update
        })


    } catch (err) {
        next(err);
    }
}
//DELETE COMMENT
const deleteComment = async (req, res, next) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "comment deleted successfully",
            success: false,

        })


    } catch (err) {
        next(err);
    }
}
//GET COMMENTS 
const getComments = async (req, res, next) => {
    try {

        const comments = await Comment.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "comment list",
            success: true,
            comments
        });

    } catch (err) {
        next(err);
    }
}


module.exports = { addComment, updateComment, deleteComment, getComments }
