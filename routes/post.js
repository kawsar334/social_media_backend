


const express = require("express");
const router = express.Router();
const { createPost, updatePost, deletePost, getAllPosts, getSinglePost, timelinePosts, searchPost, getNewsFeedPosts, Likes, unLikes } = require("../controllers/post.js")
const { verifyToken } = require("../jsonwebToken")///req.user.id

// create post
router.post("/createpost", verifyToken, createPost);
// update post
router.put("/updatepost/:id", verifyToken, updatePost);

// delete post
router.delete("/delete/:id", verifyToken , deletePost );

// get posts
router.get("/posts", getAllPosts);
// getNewsFeedPosts
router.get("/newsfeedpost", verifyToken, getNewsFeedPosts)
// get single post
router.get("/find/:id", getSinglePost);
// gettimeline posts

router.get("/timlineposts/:id", timelinePosts)
// search post
router.get("/search/",searchPost);

// Like post
router.put("/like/:postId", verifyToken, Likes);
router.put("/unlike/:postId", verifyToken, unLikes);




module.exports = router ; 