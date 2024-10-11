


const { addComment, updateComment, deleteComment, getComments } = require("../controllers/comment");
const { verifyToken } = require("../jwt");

const router = require("express").Router();


router.post("/addcomment/:id",verifyToken, addComment );
router.put("/update/:id",verifyToken,updateComment );
router.delete("/:id",verifyToken,deleteComment);
router.get("/getcomments",verifyToken,getComments)


module.exports = router;



