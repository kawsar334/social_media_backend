


const express = require("express");
const router = express.Router();
const { getAllPosts, getSinglePost } = require("../controllers/post.js")



// Add a simple GET request
router.get("/", getAllPosts);

// Add a simple GET request
router.get("/find/:id", getSinglePost);

module.exports = router ; 