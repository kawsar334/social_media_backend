


const router = require("express").Router();
const { createStory, updateStory, deleteStory, getAllStories, getSingleStory, } = require("../controllers/story");

const { verifyToken } = require("../jsonwebToken")///------------req.user.id





// create story
router.post("/create", verifyToken, createStory);
// update story
router.put("/:id", verifyToken, updateStory);
// delete story
router.delete("/:id", verifyToken, deleteStory);
// get stories
router.get("/", verifyToken, getAllStories);

// get single story
router.get("/find/:id", verifyToken, getSingleStory);


module.exports = router;