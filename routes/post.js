const { addPost, updatePost, deletePost, getSinglePost, getAllPost,Likes,unlikes } = require("../controllers/post");
const { verifyToken } = require("../jwt");


const router = require("express").Router();


// add post
router.post("/create",verifyToken,addPost);

// update 
router.put("/update/:postId", verifyToken, updatePost);
// delete post
router.delete("/delete/:id", verifyToken,deletePost);

//get single post 
router.get("/find/:id", verifyToken, getSinglePost);
// get all post 
router.get("/allpost", verifyToken, getAllPost);
// like post 
router.put("/like/:postId", verifyToken, Likes);
// unlikes 
router.put("/unlike/:postId", verifyToken, unlikes);








module.exports = router;



