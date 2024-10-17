


const express = require("express");
const router = express.Router();
const { getAllPosts, getSinglePost } = require("../controllers/post.js")





// create post
// update post
// delete post
// get posts
// gettimeline posts
router.get("/posts", getAllPosts);
// get single post
router.get("/find/:id", getSinglePost);

module.exports = router ; 