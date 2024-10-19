

const router = require("express").Router();
const { addComment, updateComment, deleteComment, getComments } = require("../controllers/comments");

const { verifyToken } = require("../jsonwebToken")///------------req.user.id

// create comment
router.post("/addcomment/:postId", verifyToken,addComment)
// update comment
router.put("/:id", verifyToken, updateComment);

// delete comment
router.delete("/:id", verifyToken, deleteComment);

// get comments
router.get("/:postId", getComments);



module.exports = router;
