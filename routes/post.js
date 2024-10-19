


const express = require("express");
const router = express.Router();
const { createPost, updatePost, deletePost, getAllPosts, getSinglePost, searchPost, getNewsFeedPosts } = require("../controllers/post.js")
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
// search post
router.get("/search/",searchPost);



module.exports = router ; 